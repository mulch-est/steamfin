//#portfolio, check local storage for things
function loadInvestments(){
  let count = 0;
  let myItem = localStorage.getItem("investment0"); //stored <name>,<quantity>,<total>
  while(myItem !== null){
    let arr = myItem.split(",");
    appendInvestment(arr[0], parseInt(arr[1]), parseInt(arr[2]));
    count ++;
    myItem = localStorage.getItem("investment" + count);
  }
}

function addInvestment(){
  //called by button
  //bring up dialogues to enter data
  //basically an investment panel to fill in, X to cancel, enter to submit & continue adding
}

function appendInvestment(name, qty, invested){
  let myInvestment = document.createElement("div");
  myInvestment.setAttribute("class", "investment");
  
  let myLabel = document.createElement("div");
  myLabel.setAttribute("class", "investment-label");
  myLabel.innerHTML = "<span class='investment-title'>" + name + "</span>";
  myLabel.innerHTML += "<span class='investment-qty'>&emsp;x" + qty + "</span>";
  myInvestment.appendChild(myLabel);
  let percentChange = "20%";
  let calculatedProfit = "+ $5.20";
  let arrowIndicator = "&#x1f845;"; //down is &#x1f847;
  let investStatus = "profit"; //loss -- determines classes
  let myInfo = document.createElement("center");
  myInfo.setAttribute("class", "investment-info " + investStatus);
  myInfo.innerHTML = "<span class='investment-arrow'>" + arrowIndicator + "</span>";
  myInfo.innerHTML += "<span class='investment-data'>" + percentChange + "</span>";
  myInfo.innerHTML += "<span class='investment-data'>" + calculatedProfit + "</span>";
  myInvestment.appendChild(myInfo);
  
  portfolio.appendChild(myInvestment);
}

loadInvestments();