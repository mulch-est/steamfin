/* this file will contain the items that can be used with steam's multisell system,
including their different potential spellings, etc. and categorized by collection */

/*An array containing (hopefully) all multi-sellable CSGO items:*/
var items = [];

pushToItems(cases); //add all items from cases.js
pushToItems(antwerp22); //add all items from antwerp-2022.js
pushToItems(comm21);
pushToItems(stockholm21);
pushToItems(rmr20);
pushToItems(berlin19);

function pushToItems(arr){
  for(let i=0; i<arr.length; i++){
    items.push(arr[i]);
  }
}
