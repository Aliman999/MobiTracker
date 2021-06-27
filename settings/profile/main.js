var display = setInterval(()=>{
  if(user){
    init();
    clearInterval(display);
  }
}, 1000);

function init(){
  var loading = document.getElementById("loadingContainer");
  loading.style.opacity = 0;
  loading.remove();
  var field = document.getElementsByClassName("setting")[0].children[1];
  var faded = document.getElementsByClassName("faded")[0];
  faded.style.opacity = 1;
}
