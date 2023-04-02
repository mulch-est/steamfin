let expertOn = false;
function passesFilter(arr){return true;}

let items = [];
let keys = ["cases", "capsules", "packages", "passes"];

for(let i=0; i<keys.length; i++){
  fetch('/itemDB/' + keys[i] + '.json')
    .then((response) => response.json())
    .then((json) => loadToItems(json, keys[i]));
}

function loadToItems(json, key){
  items.push(json[key]);
}

function isValidItem(item){
	let type = getItemType(item);
	switch(type){
		case "invalid":
			return false;
		case "case":
			return items[0].includes(item);
		case "capsule":
			return items[1].includes(item);
		case "package":
			return items[2].includes(item);
		case "pass":
			return items[3].includes(item);
	}
	return false; //not any of the types, error?
}

/*
 * case -> contains "Case" & !"Case Key" & !"Case Hardened"
 * capsule -> contains "Legends" & ! "Legends Patch Pack" | "Challengers"!PatchPack | "Contenders"!PatchPack | "Champions" | "Finalists" | "Autograph Capsule" | "Sticker Capsule" & !"Key"
 * package -> contains "Souvenir Package"
 * pass -> contains "Pass"
 * sticker
 * (patch)
 * ===
 * skin
 * (agent)
 */
function getItemType(item){
	if(item.includes("Case") && !item.includes("Case Key") && !item.includes("Case Hardened")){
		return "case";
	} else if (item.includes("Souvenir Package")) {
		return "package";
	} else if (item.includes("Pass")) {
		return "pass";
	} else if( (item.includes("Legends") && !item.includes("Legends Patch Pack")) ||
				(item.includes("Challengers") && !item.includes("Challengers Patch Pack")) ||
				(item.includes("Contenders") && !item.includes("Contenders Patch Pack")) ||
				item.includes("Champions") || item.includes("Finalists") || item.includes("Autograph Capsule") ||
				(item.includes("Sticker Capsule") && !item.includes("Key")) ){
		return "capsule";
	}
	return "invalid";
}