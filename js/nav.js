var openBtn = document.getElementById("navBtnContainer");
var closeBtn = document.getElementById("closeNavBtn");
var eleCount = document.getElementsByClassName("navEle");
var navMenu = document.getElementById("navMenu");
var tokenHeader = document.getElementsByName("token")[0];

var miniPlayer = document.getElementById("miniPlayer");
var miniRep = document.getElementById("miniRep");

var query = new XMLHttpRequest();
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
var user;

// USER

function requestUser(){
  query.open("GET", "https://mobitracker.co/beta/src/user.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.setRequestHeader(tokenHeader.name,tokenHeader.content);
  query.responseType = "json";
  query.async = false;
  query.send();
  query.onload = function(){
    user = query.response;
    showUser();
  }
}

requestUser();

function xp(rep){
  if(rep < 0){
    if(rep > -5){
      return "Dangerous";
    }else if (rep <= -5) {
      return "Sketchy";
    }
  }else{
    if(rep == 0){
      return "Newbie";
    }else if (rep <= 30) {
      return "Experienced";
    }else if (rep <= 100) {
      return "Reliable";
    }
  }
}

function showUser(){
  var avatar = document.createElement("img");
  avatar.src = user.avatar;
  avatar.onerror = function(){
    this.src = "src/avatars/avatar_default.jpg";
  }
  avatar.className = "avatar circleBorder";
  miniPlayer.appendChild(avatar);

  var nameContainer = document.createElement("div");
  nameContainer.className = "loginNameContainer";
  if(user.verified){
    var verifiedImg = document.createElement("img");
    verifiedImg.src = "../src/verified.png";
    verifiedImg.className = "verified";
    nameContainer.appendChild(verifiedImg);
  }
  var name = document.createElement("p");
  name.className = "loginName";
  name.innerText = user.sessionUser;
  nameContainer.appendChild(name);

  miniPlayer.appendChild(nameContainer);

  var settingsContainer = document.createElement("div");
  settingsContainer.className = "settingsContainer";
  var settingsBtn = document.createElement("a");
  settingsBtn.className = "rButton highlight settings";
  settingsBtn.href = "";
  settingsBtn.innerText = "Settings";
  settingsBtn.style.marginRight = "auto";
  var signoutBtn = document.createElement("a");
  signoutBtn.className = "rButton highlight-red settings";
  signoutBtn.href = "https://mobitracker.co/beta/signout";
  signoutBtn.innerText = "Sign out";
  signoutBtn.style.marginLeft = "auto";
  settingsContainer.appendChild(settingsBtn);
  settingsContainer.appendChild(signoutBtn);




  var experience = document.createElement("p");
  experience.className = "rBold";
  experience.innerText = xp(user.vouchers);
  var vouches = document.createElement("p");
  vouches.innerText = "Vouches: "+user.vouchers;
  //var unique = document.createElement("p");
  //unique.innerText = "Unique Vouches: 54";
  var contracts = document.createElement("p");
  contracts.innerText = "Completed Contracts: "+user.completed;

  miniRep.appendChild(experience);
  miniRep.appendChild(vouches);
  //miniRep.appendChild(unique);
  miniRep.appendChild(contracts);

  miniRep.appendChild(settingsContainer);
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
