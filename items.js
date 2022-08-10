/* this file will contain the items that can be used with steam's multisell system,
including their different potential spellings, etc. and categorized by collection */

/*A 2d array containing (hopefully) all multi-sellable CSGO items:*/
var items = [];
/*A 2d array containing (hopefully) all CSGO sticker collection arrays:*/
var sticker_collections = [];

items.push(cases); //add all items from cases.js
items.push(capsules);
items.push(passes);

/*items.push(antwerp22);
items.push(comm21);
items.push(stockholm21);
items.push(rmr20);
items.push(berlin19);*/

pushStickerCollectionToItems(OPbrfa);
pushStickerCollectionToItems(recoil);
pushStickerCollectionToItems(comm21);

//use itemDB arrays to filter

function pushStickerCollectionToItems(arr){
  items.push(arr);
  sticker_collections.push(arr);
}

/* called from autocomplete to check if int value represents sticker collection arr */
function isValidArrVal(arr, val){
  if(arr === sticker_collections[parseInt(val-1)])return true;
  return false;
}

/* called on page run to dynamically add all sticker collections from itemDB */
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
  switch(arr) {
    case OPbrfa:
      return "Broken Fang Sticker Collection";
    case recoil:
      return "Recoil Sticker Collection";
    case comm21:
      return "2021 Community Sticker Capsule";
    default:
      return "ERROR!";
  }
}

generateStickerCollectionsDropdown();
