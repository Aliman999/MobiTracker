'use strict';
var eBtn = document.getElementById("changeBtn");
var tokenHeader = document.getElementsByName("token")[0];
var eContainer = document.getElementById("passInput");
var eInput = eContainer.children[0].children[0];
var eRequirements = document.getElementById("preReq");
var eEncrypt = document.getElementById("encrypt");
var rStatus = document.getElementById("status");
var input = document.getElementsByClassName("userInput")[0];

eBtn.onclick = function(){
  if(!eContainer.classList.contains("hidden")){
    verify(eInput.value);
  }else{
    eRequirements.classList.remove("hidden");
    eContainer.classList.remove("hidden");
    eEncrypt.classList.remove("hidden");
    eInput.focus();
    eContainer.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        verify(eInput.value);
      }
    });
    input.oninput = function(e){
      if(strongPw(e.target.value)){
        eContainer.verified = true;
      }else{
        eContainer.verified = false;
      }
    }
  }
}

function strongPw(password) {
  var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  var validPassword = regExp.test(password);
  return validPassword;
}

function verify(password){
  if(eContainer.verified){
    eContainer.classList.add("hidden");
    var verifyPassword = new XMLHttpRequest();
    verifyPassword.open("POST", "newPassword.php");
    verifyPassword.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    verifyPassword.setRequestHeader(tokenHeader.name,tokenHeader.content);
    //verifyPassword.responseType = "json";
    verifyPassword.send("password="+password+"&encrypt="+eEncrypt.children[0].checked.toString());
    verifyPassword.onload = function() {
      var userResponse = verifyPassword.response;
      if(userResponse.status){
        if(rStatus.classList.contains("hidden")){
          rStatus.classList.toggle("hidden");
          rStatus.innerText = userResponse.data;
        }
        setTimeout(()=>{
          rStatus.classList.add("hidden");
        }, 5000);
      }
    }
  }else{
    if(rStatus.classList.contains("hidden")){
      rStatus.classList.remove("hidden");
      rStatus.classList.add("highlight-red");
      rStatus.innerText = "Please make sure your password completes all of the requirements .";

      rStatus.reset = setTimeout(()=>{
        rStatus.classList.add("hidden");
        rStatus.classList.remove("highlight-red");
      }, 5000);
    }
  }
}
