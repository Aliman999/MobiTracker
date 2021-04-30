var openBtn = document.getElementById("navBtnContainer");
var closeBtn = document.getElementById("closeNavBtn");
var eleCount = document.getElementsByClassName("navEle");
var navMenu = document.getElementById("navMenu");
var query = new XMLHttpRequest();
openBtn.active = false;

openBtn.onclick = function(){
  if(this.active){
    closeNav();
  }else{
    openNav();
    showForm(false);
  }
}

closeBtn.onclick = function(){
  closeNav();
}

var user = {
}

function showUser(){
}

function checkClick() {
  var isClickInside = navMenu.contains(event.target);
  var isClickOpen = openBtn.contains(event.target);
  if(!isClickInside && !isClickOpen){
    closeNav();
  }
}

/* Set the width of the side navigation to 250px */
function openNav() {
  openBtn.active = true;
  if(screen.width <= 1282){
    document.addEventListener("click", checkClick);
  }else{
    document.removeEventListener("click", checkClick);
  }
  if(screen.width <= 1282){
    document.body.style.overflowY = "hidden";
    if(screen.width-(screen.width*0.20) > 460){
      document.getElementById("navMenu").style.width = "460px";
    }else{
      document.getElementById("navMenu").style.width = screen.width-(screen.width*0.20)+"px";
    }
    document.getElementById("navBackDrop").style.zIndex = "9";
    document.getElementById("navBackDrop").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  }else{
    document.getElementById("navMenu").style.width = "460px";
    document.getElementById("canvas").style.marginRight = "460px";
    document.getElementById("navMenu").style.borderLeft = "2px solid rgb(57, 206, 216)";
    document.getElementById("navMenu").style.boxShadow = "0px 0px 15px rgb(57 206 216 / 50%)";
  }
  closeBtn.style.visibility = "";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  openBtn.active = false;
  document.body.style.overflowY = "";
  document.getElementById("navMenu").style.width = "0";
  document.getElementById("navMenu").style.borderLeft = "";
  document.getElementById("navBackDrop").style.zIndex = "-1";
  document.getElementById("navBackDrop").style.backgroundColor = "rgba(0, 0, 0, 0)";
  document.getElementById("navMenu").style.boxShadow = "";
  document.getElementById("canvas").style.marginRight = "";
  closeBtn.style.visibility = "hidden";
}
