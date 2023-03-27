//#portfolio, check local storage for things
function loadInvestments(){
  let portfolio = document.getElementById("portfolio");
  let count = 0;
  let myItem = localStorage.getItem("investment0"); //stored <name>,<quantity>,<total>
  while(myItem !== null){
    let arr = myItem.split(",");
    let myInvestment = document.createElement("div");
    myInvestment.setAttribute("class", "investment");
    
    portfolio.appendChild(myInvestment);
    count ++;
    myItem = localStorage.getItem("investment" + count);
  }
}

function addInvestment(){
  //called by button
  //bring up dialogues to enter data
  //basically an investment panel to fill in, X to cancel, enter to submit & continue adding
}

loadInvestments();