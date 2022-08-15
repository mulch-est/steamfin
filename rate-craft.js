function attemptRate(){
  //get data from gencodeInput
  let data = document.getElementById("gencodeInput").value;
  //check if data represents valid gencode
  if(isValidGencode(data)){
    //rate craft
    rateCraft();
    //remove text from search
    //document.getElementById("gencodeInput").value = "";
  }else {
    printBar("Invalid gen-code!");
  }
}

function printBar(val){
  let bar = document.getElementById("ratingBar");
  bar.innerHTML = val;
}

function rateCraft(){
  printBar("Your rating is 0.0");
}

var NUM_GEN_PARAMS = 13;
//passed string <code>, determine if valid gencode
function isValidGencode(code){
  var arr = code.split(" ");
  if(arr.length === NUM_GEN_PARAMS && 
     arr[0] === "!gen" &&
     isValidWeaponId(arr[1]) &&
     isValidSkinId(arr[2]) &&
     isValidPatternId(arr[3]) &&
     isValidFloatId(arr[4]) &&
     isValidStickerPair(arr[5], arr[6]) &&
     isValidStickerPair(arr[7], arr[8]) &&
     isValidStickerPair(arr[9], arr[10]) &&
     isValidStickerPair(arr[11], arr[12])){
    return true;
  }
  return false;
}

function isValidWeaponId(id){
  //passed string id, convert to int and check against csgo weapons
  return true;
}

function isValidSkinId(id){
  //passed string id, convert to int and check against csgo skins
  return true;
}

function isValidPatternId(id){
  //parse int, check if number 0-999
  return true;
}

function isValidFloatId(id){
  //parse float, check if valid
  return true;
}

function isValidStickerPair(id, float){
  //parse string id and string sticker float (0-1)
  return true;
}
