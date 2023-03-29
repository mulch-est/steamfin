let count = 0; //stores how many investments are being kept track of
//#portfolio, check local storage for things
function loadInvestments(){
  let myItem = localStorage.getItem("investment0"); //stored <name>,<quantity>,<total>
  while(myItem !== null){
    let arr = myItem.split(",");
    appendInvestment(arr[0], parseInt(arr[1]), parseInt(arr[2]));
    count ++;
    myItem = localStorage.getItem("investment" + count);
  }
}

function addInvestment(){
  document.getElementById("portfolio-entry").classList.toggle("hide");
  document.getElementById("searchAuto").focus();
}

function appendInvestment(name, qty, invested){
  let myInvestment = document.createElement("div");
  myInvestment.setAttribute("class", "investment");
  
  let myLabel = document.createElement("div");
  myLabel.setAttribute("class", "investment-label");
  myLabel.innerHTML = "<span class='investment-title'>" + name + "</span>";
  myLabel.innerHTML += "<span class='investment-qty'>&emsp;x" + qty 
    + " for a total " + invested + "</span>";
  myInvestment.appendChild(myLabel);
  let percentChange = "+20%";
  let calculatedProfit = "+5.20 USD";
  let arrowIndicator = "&#x1f845;"; //down is &#x1f847;
  let investStatus = "profit"; //loss -- determines classes
  let myData = document.createElement("div");
  myData.setAttribute("class", "investment-stats");
  myData.innerHTML = "<span class='investment-data'>" + percentChange + "</span><br>";
  myData.innerHTML += "<span class='investment-data'>" + calculatedProfit + "</span>";
  let myInfo = document.createElement("div");
  myInfo.setAttribute("class", "investment-info " + investStatus);
  myInfo.appendChild(myData);
  myInfo.innerHTML += "<span class='investment-arrow'>" + arrowIndicator + "</span>";
  myInvestment.appendChild(myInfo);
  portfolio.appendChild(myInvestment);
}

function submitEntry(override){
  if(event.key === 'Enter' || override){
    let entryName = document.getElementById('searchAuto');
    let entryQty = document.getElementById('entry-qty');
    let entryDollars = document.getElementById('entry-dollars');
    let entryCents = document.getElementById('entry-cents');
    if(isValidItem(entryName.value) && 
       entryQty.value > 0 && 
       (entryCents.value > 0 || entryDollars.value > 0)){
      let inputName = entryName.value;
      let inputQty = entryQty.value;
      let inputValue = parseInt(entryDollars.value) * 100 + parseInt(entryCents.value);
      localStorage.setItem("investment" + count, inputName + "," + inputQty + "," + inputValue);
      clearEntry();
      appendInvestment(inputName, inputQty, inputValue);
      entryName.focus();
    } else {
      document.getElementById("portfolio-entry").style.backgroundColor="indianred";
      setTimeout(function(){
        document.getElementById("portfolio-entry").style.backgroundColor="lightgrey";
      }, 300);
    }
  } else if(event.key === 'Escape') {
    submitCancel();
  }
}

function submitCancel(){
  clearEntry();
  document.getElementById("portfolio-entry").classList.toggle("hide");
}

function submitItem(elem){
  document.getElementById("entry-qty").focus();
}

function clearEntry(){
  document.getElementById('searchAuto').value = "";
  document.getElementById('entry-qty').value = 0;
  document.getElementById('entry-dollars').value = 0;
  document.getElementById('entry-cents').value = 0;
}

loadInvestments();