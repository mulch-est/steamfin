var list = [];

/* called by search button to add searched item to list */
function attemptPush(){
  //get data from searchAuto
  let data = document.getElementById("searchAuto").value;
  //check if data represents valid item
  if(isValidItem(data)){
    //push valid item to list
    list.push(data);
    //add div to page
    document.getElementById("itemsDiv").innerHTML += "<p>"+data+"</p>"
    //remove text from search
    document.getElementById("searchAuto").value = "";
  }
}

//checks whether an element in items (items.js) is equal to <data> and not in list
function isValidItem(data){
  for(let i=0; i<items.length; i++){
    if(data === items[i]){
      for(let j=0; j<list.length; j++){
        if(data === list[j])return false;
      }
      return true;
    }
  }
  return false;
}
