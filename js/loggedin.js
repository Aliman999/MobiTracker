var openBtn = document.getElementById("navBtnContainer");
var closeBtn = document.getElementById("closeNavBtn");
var eleCount = document.getElementsByClassName("navEle");
var navMenu = document.getElementById("navMenu");
var iContainer = document.getElementById("iContainer");
var query = new XMLHttpRequest();
iContainer.sibling = document.getElementById("sPContainer");
openBtn.active = false;


var getUser = new XMLHttpRequest();
var session,
    sessionUser,
    comcount,
    search,
    limited,
    verified,
    flagged,
    faction;
getUser.open("GET", "https://mobitracker.co/src/user.php");
getUser.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
getUser.setRequestHeader(tokenHeader.name,tokenHeader.content);
getUser.responseType = "json";
getUser.async = false;
getUser.send();
getUser.onload = function(){
  var userResponse = getUser.response;
  session = userResponse["session"];
  sessionUser = userResponse["sessionUser"];
  comcount = userResponse["comcount"];
  search = userResponse["search"];
  limited = userResponse["limited"];
  verified = userResponse["verified"];
  flagged = userResponse["flagged"];
  faction = userResponse["faction"];
  avatar = userResponse["avatar"];
}


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
  request.send("username="+username+"&email="+email+"&password="+password);
  request.onload = function(){
    var response = JSON.parse(request.response);
    if(response.username){
      form.pUsernameErr.classList.remove("hidden");
      form.pUsernameErr.innerText = response.username;
    }else if(response.email){
      form.pEmailErr.classList.remove("hidden");
      form.pEmailErr.innerText = response.email;
    }else if(response.password){
      form.pPasswordErr.classList.remove("hidden");
      form.pPasswordErr.innerText = response.password;
    }else{
      form.pUsernameErr.classList.add("hidden");
      form.pEmailErr.classList.add("hidden");
      form.pPasswordErr.classList.add("hidden");
      form.pSuccess.classList.remove("hidden");
      form.pSuccess.innerText = "Successfully Registered!";
      setTimeout(function(){
        showForm(false);
      }, 2000);
    }
  }
}

function login(username, password){
  request.open("POST", "src/login.php");
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send("username="+username+"&password="+password);
  request.onload = function(){
    var response = JSON.parse(request.response);
    if(response.username){
      form.pUsernameErr.classList.remove("hidden");
      form.pUsernameErr.innerText = response.username;
    }else if(response.password){
      form.pPasswordErr.classList.remove("hidden");
      form.pPasswordErr.innerText = response.password;
    }else{
      form.pUsernameErr.classList.add("hidden");
      form.pPasswordErr.classList.add("hidden");
      form.pSuccess.classList.remove("hidden");
      form.pSuccess.innerText = "Logged in!";
      setTimeout(function(){
        location.reload();
      }, 2000);
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
    form.pTitle.innerText = "Register";
  }else{
    form.pTitle.innerText = "Login";
  }
  container.appendChild(form.pTitle);

  form.pUsername.innerText = "Username";
  form.pUsername.className = "inputHeader";
  form.iUsername.className = "form-control";
  form.pUsernameErr.className = "highlight-red hidden";
  form.iUsername.type = "text";
  form.iUsername.autocomplete = "username";
  form.iUsername.maxLength = "50";
  container.appendChild(form.pUsername);
  container.appendChild(form.iUsername);
  container.appendChild(form.pUsernameErr);

  if(register){
    form.pEmail.innerText = "Email";
    form.pEmail.className = "inputHeader";
    form.pEmailErr.className = "highlight-red hidden";
    form.iEmail.className = "form-control";
    form.iEmail.type = "email";
    form.iEmail.autocomplete = "email";
    container.appendChild(form.pEmail);
    container.appendChild(form.iEmail);
    container.appendChild(form.pEmailErr);
  }

  form.pPassword.innerText = "Password";
  form.pPassword.className = "inputHeader";
  form.pPasswordErr.className = "highlight-red hidden";
  form.iPassword.className = "form-control form-control-last";
  form.iPassword.type = "password";
  form.iPassword.autocomplete = "current-password";
  container.appendChild(form.pPassword);
  container.appendChild(form.iPassword);
  container.appendChild(form.pPasswordErr);

  form.pSuccess.className = "highlight-green hidden";
  form.bMain.className = "rButton highlight-green";

  form.pAlt.className = "form-alt";
  form.iAlt.className = "highlight-green";

  if(register){
    form.bMain.id = "signUp";
    form.bMain.innerText = "Sign Up";
    form.bMain.onclick = function(){
      register(form.iUsername.value, form.iEmail.value, form.iPassword.value);
    }

    form.pAlt.innerHTML = "Already have an account? ";
    form.iAlt.innerText = "Login";
    form.iAlt.onclick = function(){
      showForm(false);
    }
  }else{
    form.bMain.id = "login";
    form.bMain.innerText = "Login";
    form.bMain.onclick = function(){
      login(form.iUsername.value, form.iPassword.value);
    }

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
