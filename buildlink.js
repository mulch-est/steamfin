//called on Go clicked, gets multisell link and redirects
function getLink(){
  var link = "https://steamcommunity.com/market/multisell?appid=730&contextid=2";
  for(let i=0; i<list.length; i++){
    link += "&items%5B%5D=";
    link += linkVersionOf(list[i]);
  }
  location.href = link;
}

//given normal item name, get steam link version
function linkVersionOf(item){
  var fin = "";
  for(let i=0; i<item.length; i++){
    if(item.charAt(i) == " "){
      fin += "%20";
    }else if(item.charAt(i) == ":"){
      fin += "%3A";
    }else if(item.charAt(i) == "|"){
      fin += "%7C";
    }else if(item.charAt(i) == "("){
      fin += "%28";
    }else if(item.charAt(i) == ")"){
      fin += "%29";
    }else if(item.charAt(i) == "&"){
      fin += "%26";
    }else {
      fin += item.charAt(i);
    }
  }
  return fin;
}
