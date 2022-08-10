//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete
/*
  the autocomplete function takes two arguments:
    the text field element (str)
    and an array of possible autocompleted values (str[])
*/
function autocomplete(inp, arr) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      let val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      let a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array in the array...*/
      for(let db = 0; db < arr.length; db++){
        if(passesFilter(arr[db])){
          for (let i = 0; i < arr[db].length; i++) {
            if(!inList(arr[db][i])){
              var checkArr = autocompleteCheck(val, arr[db][i]);
              if (checkArr[0]) {
                /*create a DIV element for each matching element:*/
                let b = document.createElement("DIV");
                b.innerHTML = "<p>";
                /*make the matching letters bold:*/
                for(let j=0; j<arr[db][i].length; j++){
                  var wrote = -1;
                  for(let k=0; k<checkArr[1].length; k++){
                    //character must be bolded
                    if(arr[db][i][j] === checkArr[1][k]){
                      b.innerHTML += "<b>" + arr[db][i][j] + "</b>";
                      wrote = k;
                      break;
                    }
                  }
                  if(wrote === -1){
                    b.innerHTML += arr[db][i][j];
                  }else checkArr[1].splice(wrote, 1);
                }
                b.innerHTML += "</p>";
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[db][i] + "'>";
                /*execute when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
          }
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        //e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  function autocompleteCheck(entry, item){
    /* check if every character in entry is in item */
    var itemChars = item.split("");
    var highlightChars = [];
    //console.log("ac:"+item);
    for(let i=0; i<entry.length; i++){
      var wrote = false;
      for(let j=0; j<itemChars.length; j++){
        if(entry[i].toUpperCase() === itemChars[j].toUpperCase()){
          highlightChars.push(itemChars[j]);
          itemChars.splice(j, 1);
          //console.log(j);
          wrote = true;
          break;
        }
      }
      if(!wrote)return [false, []];
    }
    if(itemChars.length === item.length - entry.length){
      //console.log(item + " passed given entry " + entry + ", ("+highlightChars+")");
      return [true, highlightChars];
    }
    return [false, []];
  }
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
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "searchAuto" element, and pass along the items array as possible autocomplete values:*/
autocomplete(document.getElementById("searchAuto"), items);
