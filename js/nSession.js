var openBtn = document.getElementById("navBtnContainer");
var openLoginBtn = document.getElementById("lmLBtn");
var openSignUpBtn = document.getElementById("lmSBtn");
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

//EVEMTS

function hasValue(e){
  if(e.value){
    e.style.border = "2px solid rgb(57, 206, 216)";
    e.style.boxShadow = "0px 0px 15px rgba(57, 206, 216, 0.5)";
  }else{
    e.style.border = null;
    e.style.boxShadow = null;
  }
}

//Experience

function xp(rep){
  rep = parseInt(rep);
  if(rep < 0){
    if(rep < -5){
      return "Dangerous";
    }else if (rep < 0) {
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

//FORM CTRL

function registerUser(username, email, password){
  query.open("POST", "https://mobitracker.co/beta/src/register.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.send("username="+username+"&email="+email+"&password="+password);
  query.onload = function(){
    var response = JSON.parse(query.response);
    if(response.username || response.email || response.password){
      if(response.username){
        form.pUsernameErr.classList.remove("hidden");
        form.pUsernameErr.innerText = response.username;
      }else{
        form.pUsernameErr.classList.add("hidden");
        form.pUsernameErr.innerText = response.username;
      }
      if(response.email){
        form.pEmailErr.classList.remove("hidden");
        form.pEmailErr.innerText = response.email;
      }else{
        form.pEmailErr.classList.add("hidden");
        form.pEmailErr.innerText = response.email;
      }
      if(response.password){
        form.pPasswordErr.classList.remove("hidden");
        form.pPasswordErr.innerText = response.password;
      }else{
        form.pPasswordErr.classList.add("hidden");
        form.pPasswordErr.innerText = response.password;
      }
    }else{
      form.pUsernameErr.classList.add("hidden");
      form.pEmailErr.classList.add("hidden");
      form.pPasswordErr.classList.add("hidden");
      form.pSuccess.classList.remove("hidden");
      form.pSuccess.innerText = "Successfully Registered!";
      setTimeout(function(){
        showForm(false);
      }, 1000);
    }
  }
}

function login(username, password){
  query.open("POST", "https://mobitracker.co/beta/src/login.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.send("username="+username+"&password="+password);
  query.onload = function(){
    var response = JSON.parse(query.response);
    if(response.username || response.password){
      if(response.username){
        form.pUsernameErr.classList.remove("hidden");
        form.pUsernameErr.innerText = response.username;
      }else{
        form.pUsernameErr.classList.add("hidden");
        form.pUsernameErr.innerText = response.username;
      }
      if(response.password){
        form.pPasswordErr.classList.remove("hidden");
        form.pPasswordErr.innerText = response.password;
      }else{
        form.pPasswordErr.classList.add("hidden");
        form.pPasswordErr.innerText = response.password;
      }
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

  form.iUsername.oninput = function(){hasValue(this)};
  form.iUsername.onchange = function(){hasValue(this)};

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

    form.iEmail.oninput = function(){hasValue(this)};
    form.iEmail.onchange = function(){hasValue(this)};

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

  form.iPassword.oninput = function(){hasValue(this)};
  form.iPassword.onchange = function(){hasValue(this)};

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
      registerUser(form.iUsername.value, form.iEmail.value, form.iPassword.value);
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

  form.lContainer.appendChild(form.bMain);
  form.lContainer.appendChild(form.pSuccess);
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
    document.getElementById("navBackDrop").style.zIndex = "998";
    document.getElementById("navBackDrop").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  }else{
    document.getElementById("navMenu").style.width = "460px";
    if(headerNav.classList.contains("sticky")){
      headerNav.style.width = (headerNav.clientWidth-460)+"px";
    }
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
  headerNav.style.width = "100%";
  document.getElementById("canvas").style.marginRight = "";
  closeBtn.style.visibility = "hidden";
}

//Fixed header control
var headerNav = document.getElementsByClassName("headerContainer")[0];
var stick = headerNav.offsetTop;
stickHeader();
window.onscroll = function() {
  stickHeader();
};
function stickHeader(){
  if (window.pageYOffset > stick) {
    if(openBtn.active == true &&  !headerNav.classList.contains("sticky")){
      headerNav.style.transition = "none";
      headerNav.style.width = (headerNav.clientWidth)+"px";
      headerNav.style.transition = "";
    }
    headerNav.classList.add("sticky");
  } else {
    headerNav.classList.remove("sticky");
  }
}
