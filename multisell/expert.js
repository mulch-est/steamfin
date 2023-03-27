var expertOn = false;

function onExpertClick(){
  var c = document.getElementById('expertCheckbox');
  expertOn = c.checked;
  if (c.checked){
    //remove filters by setting filter table body html to empty string
    var d = document.getElementById('filterDisplay');
    d.innerHTML = "";
  }else {
    //re-build filter table body
    var d = document.getElementById('filterDisplay');
    d.innerHTML = "<tr><td><input type=\"checkbox\" id=\"casesCheckbox\" checked=\"checked\"><label class=\"check-label\">Cases</label></td><td><input type=\"checkbox\" id=\"passesCheckbox\"><label class=\"check-label\">Passes</label></td></tr><tr><td><input type=\"checkbox\" id=\"capsulesCheckbox\"><label class=\"check-label\">Capsules</label></td><td><input type=\"checkbox\" id=\"stickersCheckbox\"><label for=\"sticker-collections\" class=\"check-label\">Stickers</label><select name=\"sticker-collections\" id=\"stickerCollectionsDropdown\"><option value=\"0\" selected=\"selected\">All Stickers</option></select></td></tr>";
    generateStickerCollectionsDropdown();
  }
}
