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
    var itemList = document.getElementById("itemsDiv");
    itemList.innerHTML += "<div class='cell item-bar' style='width:300px;'><a>"+data+"</a></div>";
    itemList.innerHTML += "<div class='cell tar'><input type='button' onclick='' value='&#10005;' /></div><br>";
    //onclick="unlist("+data+")"
    //itemList.parentNode.appendChild(a);
    
    //itemList.innerHTML += "<p>"+data+"</p>"
    //remove text from search
    document.getElementById("searchAuto").value = "";
  }
}

function unlist(item){
  //stub
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
