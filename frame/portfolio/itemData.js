function submitItem(elem){
  document.getElementById("entry-qty").focus();
}

autocomplete(document.getElementById("searchAuto"), items, submitItem);

/* handle item name ids */