function hasValue(e){
  if(e.value){
    e.style.border = "2px solid rgb(57, 206, 216)";
    e.style.boxShadow = "0px 0px 15px rgba(57, 206, 216, 0.5)";
  }else{
    e.style.border = null;
    e.style.boxShadow = null;
  }
}

var input = document.getElementsByClassName("form-control");
for (var i = 0; i < input.length; i++) {
  input[i].oninput = function(){hasValue(this)};
}
