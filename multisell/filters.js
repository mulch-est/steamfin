/* check if arr can pass depending on checkbox filters */
function passesFilter(arr){
  switch(arr){
    case cases:
      var c = document.getElementById('casesCheckbox');
      if (c.checked) return true;
      return false;
    case capsules:
      var c = document.getElementById('capsulesCheckbox');
      if (c.checked) return true;
      return false;
    case passes:
      var c = document.getElementById('passesCheckbox');
      if (c.checked) return true;
      return false;
    default:
      /* not case or capsule array, must be sticker array (keys not implemented) */
      var c = document.getElementById('stickersCheckbox');
      if (c.checked){
        /* check dropdown to see which stickers pass filter */
        var d = document.getElementById('stickerCollectionsDropdown');
        if (d.value === "0") return true;
        if (isValidArrVal(arr, d.value))return true;
        return false;
      }
      return false;
  }
}