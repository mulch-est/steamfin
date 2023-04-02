/*
  requires boolean var expertOn,
  boolean func passesFilter(arr),
*/
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete
/*
  the autocomplete function takes three arguments:
    the text field HTMLelement
    a 2d array of possible autocompleted values (str[])
    a callback function for when an autocomplete element is clicked
*/
let topMatch = "invalid";
function autocomplete(inp, arr, myCallback) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    if(!expertOn){
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
	  topMatch = "invalid";
      /*for each item in the array in the array...*/
      for(let db = 0; db < arr.length; db++){
        if(passesFilter(arr[db])){
          for (let i = 0; i < arr[db].length; i++) {
			  var checkArr = autocompletePass(val.toUpperCase(), arr[db][i].toUpperCase());
			  if (checkArr[0]) {
				/*create a DIV element for each matching element:*/
				let b = document.createElement("DIV");
				if(topMatch === "invalid"){
					b.setAttribute("id", "first-match");
					topMatch = arr[db][i];
				}
				let boldArr = checkArr[1];
				for(let j=0; j<boldArr.length; j++){
				  if(boldArr[j]){
					b.innerHTML += "<b>" + arr[db][i][j] + "</b>";
				  } else {
					b.innerHTML += arr[db][i][j];
				  }
				}
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[db][i] + "'>";
				/*execute when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					closeAllLists();
					myCallback(b.innerText);
					topMatch = "invalid";
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
  //returns <bool:passed, bool[]: which chars in item should be bolded>
  function autocompletePass(entry, item){
    let tempItem = item;
    let entryArr = entry.split(" ");
    let boldArr = [];
    for(let i=0; i<item.length; i++){
      boldArr.push(false);
    }
    for(let i=0; i<entryArr.length; i++){
      let index = autocompleteCheck(entryArr[i], tempItem);
      if(index === -1){
        return [false, []];
      } else {
        for(let j=index; j<index + entryArr[i].length; j++){
          boldArr[j] = true;
          tempItem[j] = " ";
        }
      }
    }
    return [true, boldArr];
  }
  
  //returns index at item where entry is located, -1 if dne
  function autocompleteCheck(entry, item){
    /* check if item contains entry */
    if(entry.length < item.length){
      for(let i=0; i<=item.length - entry.length; i++){
        if(item.startsWith(entry, i)){
          return i;
        }
      }
    }
    return -1;
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}