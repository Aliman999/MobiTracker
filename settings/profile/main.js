var display = setInterval(()=>{
  if(user){
    init();
    clearInterval(display);
  }
}, 1000);

function init(){
  var field = document.getElementsByClassName("setting")[0];
  var faded = document.getElementsByClassName("faded")[0];
  faded.style.opacity = 1;
}
