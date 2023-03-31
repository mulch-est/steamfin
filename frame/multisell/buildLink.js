//called on Go clicked, gets multisell link and redirects
function getLink(arr){
  var link = "https://steamcommunity.com/market/multisell?appid=730&contextid=2";
  for(let i=0; i<arr.length; i++){
    link += "&items%5B%5D=";
    link += linkVersionOf(arr[i]);
  }
  return link;
}

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

export {linkVersionOf};