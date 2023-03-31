import {addInvestment, submitEntry} from '/frame/portfolio/investments.js';

document.getElementById("invest-button").addEventListener("click", addInvestment);
let myInputs = ["searchAuto", "entry-qty", "entry-dollars", "entry-cents"];
for(let i=0; i<myInputs.length; i++){
  document.getElementById(myInputs[i]).addEventListener("keydown", function(){
    submitEntry(false);
  });
}
let myNumbers = ["entry-qty", "entry-dollars", "entry-cents"];
for(let i=0; i<myNumbers.length; i++){
  document.getElementById(myNumbers[i]).addEventListener("focus", function(){
    this.select();
  });
}