var list = [];

/* called by search button to add searched item to list */
function attemptPush(){
  //get data from searchAuto
  let data = document.getElementById("searchAuto").value;
  //check if data represents valid item
  if(isValidItem(data)){
    //push item to list
    list.push(data);
    pushToList(data);
    //remove text from search
    document.getElementById("searchAuto").value = "";
  }
}

function pushToList(data){
  //add div to page
  var itemList = document.getElementById("itemDisplay");
  itemList.innerHTML += "<tr><td class='item-bar'><div style='width:300px;'><b>"+data+"</b></div></td><td><div><input type='button' onclick='unlist(\""+data+"\")' value='&#10005;' /></div></td></tr><br>";
}

/* called by x button, passed string item name */
function unlist(item){
  //console.log("xed "+item);
  var itemLoc = -1;
  for(let i=0; i<list.length; i++){
    if(list[i] === item){
      itemLoc = i;
      break;
    }
  }
  if(itemLoc !== -1)list.splice(itemLoc, 1);
  refreshList();
}

//refreshes item list ui to display contents in list
function refreshList(){
  //reset item list div
  var itemList = document.getElementById("itemDisplay");
  itemList.innerHTML = "";
  //push each element in list
  for(let i=0; i<list.length; i++){
    pushToList(list[i]);
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

function inList(data){
  for(let i=0; i<list.length; i++){
    if(data === list[i])return true;
  }
  return false;
}
