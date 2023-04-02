import {requestData} from '/scripts/injectScript.js';

window.count = 0; //stores how many investments are being kept track of

//#portfolio, check local storage for things
function loadInvestment(num){
  //stored <name>,<quantity>,<total>
  let myItem = localStorage.getItem("investment0"); //stored <name>,<quantity>,<total>
  let mySrc = localStorage.getItem("investment0_image");
  while(myItem !== null){
	let arr = myItem.split(",");
	appendInvestment(arr[0], parseInt(arr[1]), parseInt(arr[2]), mySrc);
	count ++;
	myItem = localStorage.getItem("investment" + count);
	mySrc = localStorage.getItem("investment" + count + "_image");
  }
  let investmentsObj = {}; //{<name>: [<nameid> or 'invalid', <src> or 'invalid']}
  //<name>,<qty>,<invested>,<nameid>
  for(let i=0; i<window.count; i++){
    let arr = localStorage.getItem("investment" + i).split(",");
	let src = localStorage.getItem("investment" + i + "_image");
	let getImage = false;
	if(src === "invalid"){
		getImage = true;
	}
    investmentsObj[arr[0]] = [arr[3], getImage];
  }
  requestData(investmentsObj);
}

function addInvestment(){
  if(document.getElementById("portfolio-entry").classList.toggle("hide")){
    clearEntry();
  }
  document.getElementById("searchAuto").focus();
}

function beautifyCurrency(invested){
  let cents = invested % 100;
  let dollars = (invested - cents) / 100;
  return dollars + "." + cents + " USD";
}

function appendInvestment(name, qty, invested, src){
  let myInvestment = document.createElement("div");
  myInvestment.setAttribute("class", "investment");
  myInvestment.setAttribute("id", "investment" + count);
  myInvestment.setAttribute("data-name", name);
  let myImage = document.createElement("img");
  myImage.setAttribute("class", "investment-image");
  if(src === "invalid"){
	  myImage.setAttribute("src", "/icons/unknown.png");
  } else {
	  myImage.setAttribute("src", src);
  }
  myInvestment.appendChild(myImage);
  let myLabel = document.createElement("div");
  myLabel.setAttribute("class", "investment-label");
  myLabel.innerHTML = "<span class='investment-title'>" + name + "</span>";
  myLabel.innerHTML += "<span class='investment-qty'>&emsp;x" + qty 
    + " for " + beautifyCurrency(invested / qty) + " each</span>";
  myInvestment.appendChild(myLabel);
  //will change dynamically
  let myData = document.createElement("div");
  myData.setAttribute("class", "investment-stats");
  myData.innerHTML = "<span class='investment-data'>--%</span><br>";
  myData.innerHTML += "<span class='investment-data'>-- USD</span>";
  let myInfo = document.createElement("div");
  myInfo.setAttribute("class", "investment-info loading");
  myInfo.appendChild(myData);
  myInfo.innerHTML += "<span class='investment-arrow'>-</span>";
  myInvestment.appendChild(myInfo);
  portfolio.appendChild(myInvestment);
}

function submitEntry(override){
  if(event.key === 'Enter' || override){
    fulfillSubmission();
  } else if(event.key === 'Escape') {
    submitCancel();
  }
}

function fulfillSubmission(){
	let entryName = document.getElementById('searchAuto');
    let entryQty = document.getElementById('entry-qty');
    let entryDollars = document.getElementById('entry-dollars');
    let entryCents = document.getElementById('entry-cents');
    if(isValidItem(entryName.value) && 
       entryQty.value > 0 && 
       (entryCents.value > 0 || entryDollars.value > 0)){
      let inputName = entryName.value;
      let inputQty = parseInt(entryQty.value);
      let inputValue = parseInt(entryDollars.value) * 100 + parseInt(entryCents.value);
	  let inputType = document.getElementById('entry-type').selectedIndex;
	  let investedValue = 0;
	  if(inputType === 0){ //each
		  investedValue = inputValue * inputQty;
	  } else { //total
		  investedValue = inputValue;
	  }
	  //check merge so we don't overwrite data and have to re-request it
      localStorage.setItem("investment" + count, inputName + "," + inputQty + "," + investedValue + ",invalid");
	  localStorage.setItem("investment" + count + "_image", "invalid");
      clearEntry();
      appendInvestment(inputName, inputQty, investedValue, "invalid");
      entryName.focus();
      count ++;
	  let requestObj = {};
	  requestObj[inputName] = ['invalid', true];
	  requestData(requestObj);
    } else { //warning strobe
      document.getElementById("portfolio-entry").style.backgroundColor="indianred";
      setTimeout(function(){
        document.getElementById("portfolio-entry").style.backgroundColor="lightgrey";
      }, 300);
	  chrome.notifications.create('', {
		  title: 'Just wanted to notify you',
		  message: 'How great it is!',
		  iconUrl: '/icons/icon-32.png',
		  type: 'basic'
	  });
    }
}

function submitEntryAuto(){
	if(event.key === 'Enter'){
		if(topMatch === "invalid"){ //no matches, assume there is data ready for submission
			fulfillSubmission();
		} else { //select top autocomplete option
			document.getElementById("first-match").click();
		}
	} else if(event.key === 'Escape') {
		submitCancel();
    }
}

function submitCancel(){
  clearEntry();
  document.getElementById("portfolio-entry").classList.toggle("hide");
}

function clearEntry(){
  document.getElementById('searchAuto').value = "";
  document.getElementById('entry-qty').value = 0;
  document.getElementById('entry-dollars').value = 0;
  document.getElementById('entry-cents').value = 0;
}

loadInvestment(0);

export {addInvestment, beautifyCurrency, submitEntry, submitEntryAuto};