class Collection{
  constructor(name, arr){
    this.name = name;
    this.arr = arr;
    items.push(this);
  }

  getFormalName(){
    return this.name[0].toUpperCase() + this.name.substring(1);
  }
}

class StickerCollection extends Collection{
  constructor(name, arr){
    super(name, arr);
    sticker_collections.push(this);
  }

  buildOption(passedValue){
    var option = document.createElement("OPTION");
    option.setAttribute("value", passedValue);
    option.innerHTML = this.name;
    return option;
  }
}

class Group extends Collection{
  constructor(name, arr){
    super(name, arr);
  }

  buildCheckbox(){
    var cb = document.createElement("INPUT");
    cb.setAttribute("type", "checkbox");
    cb.setAttribute("id", this.name + "Checkbox");
    var lb = document.createElement("LABEL");
    lb.setAttribute("class", "check-label");
    lb.innerHTML = this.getFormalName();
    var filter = document.createElement("DIV");
    filter.appendChild(cb);
    filter.appendChild(lb);
    return filter;
  }

  buildDropdown(passedId){
    var dd = document.createElement("SELECT");
    dd.setAttribute("id", passedId);
    var op = document.createElement("OPTION");
    op.setAttribute("value", "0");
    op.setAttribute("selected", "selected");
    op.innerHTML = "All " + this.getFormalName();
    dd.appendChild(op);
    return dd;
  }
}
