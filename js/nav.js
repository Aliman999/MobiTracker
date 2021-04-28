var openBtn = document.getElementById("navBtnContainer");
var openLoginBtn = document.getElementById("lmLBtn");
var openSignUpBtn = document.getElementById("lmSBtn");
var closeBtn = document.getElementById("closeNavBtn");
var eleCount = document.getElementsByClassName("navEle");
var navMenu = document.getElementById("navMenu");
var iContainer = document.getElementById("iContainer");
var query = new XMLHttpRequest();
iContainer.sibling = document.getElementById("sPContainer");
openBtn.active = false;


openBtn.onclick = function(){
  if(this.active){
    closeNav();
  }else{
    openNav();
    showForm(false);
  }
}

openLoginBtn.onclick = function(){
  openNav();
  showForm(false);
}

openSignUpBtn.onclick = function(){
  openNav();
  showForm(true);
}

closeBtn.onclick = function(){
  closeNav();
}

function register(username, email, password){
  request.open("POST", "src/register.php");
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.responseType = "json";
  request.send("username="+username+"&email="+email+"&password="+password);
  request.onload = function(){
    var response = request.response;
    if(response.username || response.email || response.password){
      form.pUsernameErr.innerText = response.username;
      form.pEmailErr.innerText = response.email;
      form.pPasswordErr.innerText = response.password;
    }else{
      console.log("Registered");
    }
  }
}

var form = {
  pTitle: document.createElement("h2"),

  pUsername: document.createElement("p"),
  iUsername: document.createElement("input"),
  pUsernameErr: document.createElement("p"),

  pPassword: document.createElement("p"),
  iPassword: document.createElement("input"),
  pPasswordErr: document.createElement("p"),

  pEmail: document.createElement("p"),
  iEmail: document.createElement("input"),
  pEmailErr: document.createElement("p"),

  lContainer: document.createElement("div"),
  pSuccess: document.createElement("p"),
  bMain: document.createElement("a"),
  pAlt: document.createElement("p"),
  iAlt: document.createElement("a")
}

function showForm(register){
  var container = document.getElementById("mpLoginContainer");
  container.innerHTML = "";

  if(register){
    pTitle.innerText = "Register";
  }else{
    pTitle.innerText = "Login";
  }
  container.appendChild(form.pTitle);

  form.pUsername.innerText = "Username";
  form.iUsername.className = "form-control";
  form.pUsernameErr.className = "highlight-red";
  form.iUsername.type = "text";
  form.iUsername.autocomplete = "username";
  form.iUsername.maxLength = "50";
  container.appendChild(form.pUsername);
  container.appendChild(form.iUsername);
  container.appendChild(form.pUsernameErr);

  if(register){
    form.pEmail.innerText = "Email";
    form.pEmailErr.className = "highlight-red";
    form.iEmail.className = "form-control";
    form.iEmail.type = "email";
    form.iEmail.autocomplete = "email";
    container.appendChild(form.pEmail);
    container.appendChild(form.iEmail);
    container.appendChild(form.pEmailErr);
  }

  form.pPassword.innerText = "Password";
  form.pPasswordErr.className = "highlight-red";
  form.iPassword.className = "form-control";
  form.iPassword.type = "password";
  form.iPassword.autocomplete = "current-password";
  container.appendChild(form.pPassword);
  container.appendChild(form.iPassword);
  container.appendChild(form.pPasswordErr);

  form.pSuccess.className = "highlight-green";
  form.bMain.className = "rButton highlight-green";
  form.iAlt.className = "highlight-green";

  if(register){
    form.bMain.id = "signUp";
    form.bMain.innerText = "Sign Up";

    form.pAlt.innerHTML = "Already have an account? ";
    form.iAlt.innerText = "Login";
    form.iAlt.onclick = function(){
      showForm(false);
    }
  }else{
    form.bMain.id = "login";
    form.bMain.innerText = "Login";

    form.pAlt.innerHTML = "Dont have an account? ";
    form.iAlt.innerText = "Sign Up";
    form.iAlt.onclick = function(){
      showForm(true);
    }
  }
  form.pAlt.appendChild(form.iAlt);

  form.lContainer.appendChild(form.pSuccess);
  form.lContainer.appendChild(form.bMain);
  form.lContainer.appendChild(form.pAlt);
  container.appendChild(form.lContainer);
}

function checkClick() {
  var isClickInside = navMenu.contains(event.target);
  var isClickOpen = openBtn.contains(event.target);
  var isClickBtn0 = openLoginBtn.contains(event.target);
  var isClickBtn1 = openSignUpBtn.contains(event.target);
  if(!isClickInside && !isClickOpen && !isClickBtn0 && !isClickBtn1){
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
