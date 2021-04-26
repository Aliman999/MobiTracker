var openBtn = document.getElementById("navBtnContainer");
var openLoginBtn = document.getElementById("lmLBtn");
var openSignUpBtn = document.getElementById("lmSBtn");
var closeBtn = document.getElementById("closeNavBtn");
var eleCount = document.getElementsByClassName("navEle");
var navMenu = document.getElementById("navMenu");
var iContainer = document.getElementById("iContainer");
iContainer.sibling = document.getElementById("sPContainer");
openBtn.active = false;


openBtn.onclick = function(){
  if(this.active){
    closeNav();
  }else{
    openNav();
  }
}

openLoginBtn.onclick = function(){
  openNav();
  showLogin();
}

openSignUpBtn.onclick = function(){
  openNav();
  showRegister();
}

closeBtn.onclick = function(){
  closeNav();
}


var form = {
  pUsername: document.createElement("p"),
  iUsername: document.createElement("input"),
  pPassword: document.createElement("p"),
  iPassword: document.createElement("input"),
  pEmail: document.createElement("p"),
  iEmail: document.createElement("input"),
  lContainer: document.createElement("div"),
  bMain: document.createElement("a"),
  pAlt: document.createElement("p")
}

function showLogin(){
  var container = document.getElementById("mpLoginContainer");
  container.innerHTML = "";

  form.pUsername.innerText = "Username";
  form.iUsername.className = "form-control";
  form.iUsername.type = "text";
  form.iUsername.autocomplete = "username";
  form.iUsername.maxLength = "50";
  container.appendChild(form.pUsername);
  container.appendChild(form.iUsername);

  form.pPassword.innerText = "Password";
  form.iPassword.className = "form-control";
  form.iPassword.type = "password";
  form.iPassword.autocomplete = "current-password";
  container.appendChild(form.pPassword);
  container.appendChild(form.iPassword);

  form.bMain.className = "rButton highlight-green";
  form.bMain.id = "login";
  form.bMain.innerText = "Login";
  form.pAlt.innerHTML = "Dont have an account? <a class='highlight-green'>Sign Up</a>";

  form.lContainer.appendChild(form.bMain);
  form.lContainer.appendChild(form.pAlt);
  container.appendChild(form.lContainer);
}

function showRegister(){
  var container = document.getElementById("mpLoginContainer");
  container.innerHTML = "";

  form.pUsername.innerText = "Username";
  form.iUsername.className = "form-control";
  form.iUsername.type = "text";
  form.iUsername.autocomplete = "username";
  form.iUsername.maxLength = "50";
  container.appendChild(form.pUsername);
  container.appendChild(form.iUsername);

  form.pEmail.innerText = "";
  form.iEmail.className = "form-control";
  form.iEmail.type = "email";
  form.iEmail.autocomplete = "email";
  container.appendChild(form.pEmail);
  container.appendChild(form.iEmail);

  form.pPassword.innerText = "Password";
  form.iPassword.className = "form-control";
  form.iPassword.type = "password";
  form.iPassword.autocomplete = "current-password";
  container.appendChild(form.pPassword);
  container.appendChild(form.iPassword);

  form.bMain.className = "rButton highlight-green";
  form.bMain.id = "login";
  form.bMain.innerText = "Login";
  form.pAlt.innerHTML = "Dont have an account? <a class='highlight-green'>Sign Up</a>";

  form.lContainer.appendChild(form.bMain);
  form.lContainer.appendChild(form.pAlt);
  container.appendChild(form.lContainer);
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
    }else{
      entry.target.style.margin = "";
      entry.target.sibling.style.margin = "";
    }
  }
});
ro.observe(iContainer);

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
