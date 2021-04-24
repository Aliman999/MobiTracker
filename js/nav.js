var openBtn = document.getElementById("navBtnContainer");
var closeBtn = document.getElementById("closeNavBtn");
var eleCount = document.getElementsByClassName("navEle");
var navMenu = document.getElementById("navMenu");
var iContainer = document.getElementById("iContainer");
iContainer.sibling = document.getElementById("sPContainer");
iContainer.navLeft = document.getElementById("mtLogo");
iContainer.navRight = document.getElementById("navBtnContainer");
openBtn.active = false;


openBtn.onclick = function(){
  if(this.active){
    closeNav();
  }else{
    openNav();
  }
}

closeBtn.onclick = function(){
  closeNav();
}

function checkClick() {
  var isClickInside = navMenu.contains(event.target);
  var isClickOpen = openBtn.contains(event.target);
  if(!isClickInside && !isClickOpen){
    closeNav();
  }
}
var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const cr = entry.contentRect;
    if(cr.width < 800){
      entry.target.style.margin = "0 8px";
      entry.target.sibling.style.margin = "0 8px";

      entry.target.navLeft.style.margin = "0 0 0 8px";
      entry.target.navRight.style.margin = "auto 0 auto 8px";
      entry.target.navRight.parentElement.style.justifyContent = "space-between";
    }else{
      entry.target.style.margin = "";
      entry.target.sibling.style.margin = "";

      entry.target.navLeft.style.margin = "";
      entry.target.navRight.style.margin = "";
      entry.target.navRight.parentElement.style.justifyContent = "";
    }
  }
});
ro.observe(iContainer);
/*
  if(this.clientWidth < 800){
    this.style.margin = "0 8px";
    sPContainer.style.margin = "0 8px";
  }else{
    this.style.margin = ""
    sPContainer.style.margin = "";
  }
*/
/* Set the width of the side navigation to 250px */
function openNav() {
  openBtn.active = true;
  if(screen.width <= 820){
    document.addEventListener("click", checkClick);
  }else{
    document.removeEventListener("click", checkClick);
  }
  if(screen.width <= 820){
    document.body.style.overflowY = "hidden";
    document.getElementById("navMenu").style.width = screen.width-(screen.width*0.20)+"px";
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
