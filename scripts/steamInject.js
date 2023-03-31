import {linkVersionOf} from '/frame/multisell/buildLink.js';

//gets object {<name>: <nameid> or 'invalid',}
export default function injectFunc(itemData){
	//given normal item name, get steam link version
	function linkVersionOf(item){
	  var fin = "";
	  for(let i=0; i<item.length; i++){
		switch(item.charAt(i)){
		  case " ":
			fin += "%20";
			break;
		  case "|":
			fin += "%7C";
			break;
		  case "(":
			fin += "%28";
			break;
		  case ")":
			fin += "%29";
			break;
		  case "/":
			fin += "-";
			break;
		  case ":":
			fin += "%3A";
			break;
		  case "+":
			fin += "%2B";
			break;
		  case "&":
			fin += "%26";
			break;
		  case ",":
			fin += "%2C";
			break;
		  default:
			fin += item.charAt(i);
		}
	  }
	  return fin;
	}

	function getItemData(itemName, itemId){
		//get histogram and send important info
		fetch('https://steamcommunity.com/market/itemordershistogram?country=US&language=english&currency=1&item_nameid=' + itemId)
		.then((response) => response.json())
		.then((json) => chrome.runtime.sendMessage({'itemData' : [itemName, json["highest_buy_order"]]})); //buy_order_graph
	}

	for(var key in itemData){
		if(itemData[key] === 'invalid'){ //get item_nameid, then retrieve data
			let myKey = key; //prevent var override without function
			fetch('https://steamcommunity.com/market/listings/730/' + linkVersionOf(key))
			.then(function (response) {
				switch (response.status) {
					// status "OK"
					case 200:
						return response.text();
					// status "Not Found"
					case 404:
						throw response;
				}
			})
			.then(function (template) {
				let myRegex = new RegExp("Market_LoadOrderSpread\\(([0-9]| )+\\);");
				let target = myRegex.exec(template)[0];
				let item_nameid = "";
				for(let i=24; target[i] !== " "; i++){
					item_nameid += target[i];
				}
				chrome.runtime.sendMessage({'newItemId' : [myKey, item_nameid]});
				getItemData(myKey, item_nameid);
			})
			.catch(function (response) {
				console.error(response.statusText); //promise resolves with error text
			});
		} else {
			getItemData(key, itemData[key]);
		}
	}
}

