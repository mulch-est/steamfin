import steamInject from '/scripts/steamInject.js';
import {beautifyCurrency} from '/frame/portfolio/investments.js';

let validSites = {
	'https://steamcommunity.com/market' : steamInject
};

//execute script on the active tab if we are on a valid site
function requestData(myData){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  var currTab = tabs[0];
	  let currScript = getSiteScript(currTab);
	  if(currScript === null){
		//write data as null
		for(let i=0; i<window.count; i++){
		  let myInvestment = document.getElementById("investment" + i);
		  let myInfo = myInvestment.getElementsByClassName("investment-info")[0];
		  myInfo.setAttribute("class", "investment-info error");
		  myInfo.getElementsByClassName("investment-arrow")[0].innerHTML = "?";
		  let dataArr = myInfo.getElementsByClassName("investment-data");
		  dataArr[0].innerHTML = "?? %";
		  dataArr[1].innerHTML = "?? USD";
		}
	  } else {
		chrome.scripting.executeScript({
		  target: {
			tabId: currTab.id,
			allFrames: true,
		  },
		  func: currScript,
		  args: [myData]
		});
	  }
	});
}

//newItemId : [<name>, <nameid>]
//itemData : [<name>, <price per unit>]
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
  for(var key in response){
	  if(key === "itemData"){
		  let highestOrder = parseInt(response[key][1]);
		  let investElem = document.querySelectorAll("[data-name='" + response[key][0] + "']")[0];
		  let arr = localStorage.getItem(investElem.id).split(",");
		  let currQty = parseInt(arr[1]);
		  let oldInvestmentValue = parseInt(arr[2]);
		  let currentInvestmentValue = highestOrder * currQty; //can replace with incremental add-up of buy orders
		  let investStatus = "profit";
		  let arrowIndicator = "&#x1f845;";
		  if(currentInvestmentValue < oldInvestmentValue){
			  investStatus = "loss";
			  arrowIndicator = "&#x1f847;";
		  }
		  let profitLabel = "";
		  let percentLabel = "";
		  let dv = currentInvestmentValue - oldInvestmentValue;
		  if(dv >= 0){
			  profitLabel += "+";
			  profitLabel += beautifyCurrency(dv);
			  percentLabel += "+";
		  } else {
			  profitLabel += "-";
			  profitLabel += beautifyCurrency(oldInvestmentValue - currentInvestmentValue);
		  }
		  let percentChange = (dv / oldInvestmentValue * 100) + "";
		  if(percentChange.includes(".")){
			  let percArr = percentChange.split(".");
			  percentLabel += percArr[0] + ".";
			  percentLabel += percArr[1].substring(0, 2);
		  } else {
			  percentLabel += percentChange;
		  }
		  percentLabel += "%";
		  let investInfo = investElem.getElementsByClassName("investment-info")[0];
		  investInfo.setAttribute("class", "investment-info " + investStatus);
		  investInfo.getElementsByClassName("investment-arrow")[0].innerHTML = arrowIndicator;
		  let investData = investInfo.getElementsByClassName("investment-data");
		  investData[0].innerHTML = percentLabel;
		  investData[1].innerHTML = profitLabel;
		  console.log("retrieved price " + response[key][1] + " for " + response[key][0]);
	  } else if(key === "newItemId"){
		  for(let i=0; i<window.count; i++){
			  let arr = localStorage.getItem("investment" + i).split(",");
			  if(arr[0] === response[key][0]){
				  localStorage.setItem("investment" + i, arr[0] + "," + arr[1] + "," + arr[2] + "," + response[key][1]);
			  }
		  }
		  console.log("retrieved id " + response[key][1] + " for " + response[key][0]);
	  } else {
		  console.warn("received unknown message: " + key);
	  }
  }
});


function getSiteScript(currTab){
	for(var key in validSites){
		if(currTab.url.startsWith(key)){
			return validSites[key];
		}
	}
	return null;
}

export {requestData};