let expertOn = false;
function passesFilter(arr){return true;}
function inList(item){return false;}
function isValidItem(item){return item !== "";}

let items = [];
let keys = ["cases"];

for(let i=0; i<keys.length; i++){
  fetch('/itemDB/' + keys[i] + '.json')
    .then((response) => response.json())
    .then((json) => loadToItems(json, keys[i]));
}

function loadToItems(json, key){
  items.push(json[key]);
}