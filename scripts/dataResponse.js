const extensionId = 'imebpcabbcpbpeimckcnehoggoeeegaj';
/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  doSomethingWith(request).then(sendResponse);
  return true; // return true to indicate you want to send a response asynchronously
});
*/

chrome.runtime.sendMessage(extensionId, { ready : 1 },
    response => {
        
    }
);

async function doSomethingWith(request) {
	let nameids = [];
	await (async function loop(){
		for(let i=0; i<data.length; i++){
			const nameid = await getNameId(data[i]);
			console.log(nameid);
			nameids.push(nameid);
		}
	})();
	console.log(nameids);
	return nameids;
}

function getNameId(itemName){
	return new Promise(function(myResolve, myReject) {
		fetch('https://steamcommunity.com/market/listings/730/' + linkVersionOf(itemName))
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
			myResolve(parseInt(item_nameid)); //promise resolves with the value of the nameid
		})
		.catch(function (response) {
			myReject(response.statusText); //promise resolves with error text
		});
	});
}

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