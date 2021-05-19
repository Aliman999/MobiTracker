function hasValue(e){
  if(e.value){
    e.style.border = "2px solid rgb(57, 206, 216)";
    e.style.boxShadow = "0px 0px 15px rgba(57, 206, 216, 0.5)";
  }else{
    e.style.border = null;
    e.style.boxShadow = null;
  }
}

function highlight(){
  var text = document.getElementsByClassName('form-control');
  for(var i=0;i<text.length;i++){
    if(text[i].value){
      text[i].style.border = "2px solid rgb(57, 206, 216)";
      text[i].style.boxShadow = "0px 0px 15px rgba(57, 206, 216, 0.5)";
    }else{
      text[i].style.border = null;
      text[i].style.boxShadow = null;
    }
  }
}

var input = document.getElementsByClassName("form-control");
for (var i = 0; i < input.length; i++) {
  input[i].onchange = function(){highlight()};
  input[i].oninput = function(){hasValue(this)};
}
