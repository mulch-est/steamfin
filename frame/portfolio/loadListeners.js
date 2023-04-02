import {addInvestment, submitEntry, submitEntryAuto} from '/frame/portfolio/investments.js';

document.getElementById("invest-button").addEventListener("click", addInvestment);
document.getElementById("searchAuto").addEventListener("keydown", submitEntryAuto);

let myNumbers = ["entry-qty", "entry-dollars", "entry-cents"];
for(let i=0; i<myNumbers.length; i++){
  document.getElementById(myNumbers[i]).addEventListener("keydown", function(){
    submitEntry(false);
  });
  document.getElementById(myNumbers[i]).addEventListener("focus", function(){
    this.select();
  });
}