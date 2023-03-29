let myData = [];
for(let i=0; i<count; i++){
  myData.push(localStorage.getItem("investment" + i));
}
//execute script on the active tab if it is steam market
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var currTab = tabs[0];
  if (currTab.url.startsWith('https://steamcommunity.com/market')) {
    chrome.scripting.executeScript({
      target: {
        tabId: currTab.id,
        allFrames: true,
      },
      func: myFunc,
      args: [myData]
    }, parseResults);
  } else {
    //write data as null
    for(let i=0; i<count; i++){
      let myInvestment = document.getElementById("investment" + i);
      let myInfo = myInvestment.getElementsByClassName("investment-info")[0];
      myInfo.setAttribute("class", "investment-info error");
      myInfo.getElementsByClassName("investment-arrow")[0].innerHTML = "?";
      let dataArr = myInfo.getElementsByClassName("investment-data");
      dataArr[0].innerHTML = "?? %";
      dataArr[1].innerHTML = "?? USD";
    }
  }
});

function parseResults(resultsArray){
  console.log(resultsArray[0].result);
}

function myFunc(data){
  console.log(data);
  return 4;
}
