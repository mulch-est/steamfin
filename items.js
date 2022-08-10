/* this file will contain the items that can be used with steam's multisell system,
including their different potential spellings, etc. and categorized by collection */

/*An array containing (hopefully) all multi-sellable CSGO items:*/
var items = [];

items.push(cases); //add all items from cases.js
items.push(capsules);
items.push(antwerp22); //add all items from antwerp-2022.js
items.push(comm21);
items.push(stockholm21);
items.push(rmr20);
items.push(berlin19);

items.push(OPbrfa);
items.push(recoil);

//use itemDB arrays to filter

function pushToItems(arr){
  for(let i=0; i<arr.length; i++){
    items.push(arr[i]);
  }
}

/* called from autocomplete to check if int value represents sticker collection arr */
function isValidArrVal(arr, val){
  if(arr === sticker_collections[parseInt(val-1)])return true;
  return false;
}

var sticker_collections = [];

sticker_collections.push(OPbrfa);
sticker_collections.push(recoil);

function generateStickerCollectionsDropdown(){
  var d = document.getElementById('stickerCollectionsDropdown');
  for(let i = 1; i <= sticker_collections.length; i++){
    var option = document.createElement("OPTION");
    option.value = i;
    option.text = getCollectionTitle(sticker_collections[i-1]);
    d.appendChild(option);
  }
}

function getCollectionTitle(arr){
  if(arr === OPbrfa){
    return "Broken Fang Sticker Collection";
  }else if(arr === recoil){
    return "Recoil Sticker Collection";
  }else {
    return "ERROR!";
  }
}

generateStickerCollectionsDropdown();
