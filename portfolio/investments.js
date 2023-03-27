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

function submitEntry(override){
  if(event.key === 'Enter' || override){
    let entryName = document.getElementById('searchAuto');
    let entryQty = document.getElementById('entry-qty');
    let entryDollars = document.getElementById('entry-dollars');
    let entryCents = document.getElementById('entry-cents');
    if(entryName.value !== "" && 
       entryQty.value > 0 && 
       (entryCents.value > 0 || entryDollars.value > 0)){
      let inputName = entryName.value;
      let inputQty = entryQty.value;
      let inputValue = entryDollars.value * 100 + entryCents.value;
      localStorage.setItem("investment" + count, inputName + "," + inputQty + "," + inputValue);
      clearEntry();
      appendInvestment(inputName, inputQty, inputValue);
      entryName.focus();
    } else {
      //flash red background to indicate invalid input?
    }
  }
}

function submitCancel(){
  clearEntry();
  document.getElementById("portfolio-entry").classList.toggle("hide");
}

function clearEntry(){
  document.getElementById('searchAuto').value = "";
  document.getElementById('entry-qty').value = 0;
  document.getElementById('entry-dollars').value = 0;
  document.getElementById('entry-cents').value = 0;
}

loadInvestments();