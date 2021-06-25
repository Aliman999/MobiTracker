'use strict';
var eBtn = document.getElementById("email");
var tokenHeader = document.getElementsByName("token")[0];
var eContainer = document.getElementById("emailInput");
var rStatus = document.getElementById("status");
var input = document.getElementsByClassName("userInput")[0];
var sContainer = document.getElementById("subContainer");
var submit = document.getElementById("submit");

eBtn.onclick = function(){
  if(!eContainer.classList.contains("hidden")){
    eContainer.classList.add("hidden");
    sContainer.classList.add("hidden");
  }else{
    sContainer.classList.remove("hidden");
    eContainer.classList.remove("hidden");
    eContainer.focus();
    eContainer.addEventListener('keypress', function (e){
      if(e.key === 'Enter'){
        verify(eContainer.value);
      }
    });
    input.oninput = function(e){
      if(e.target.value.includes("@")){
        eContainer.verified = true;
      }else{
        eContainer.verified = false;
      }
    }
    submit.onclick = function(){
      verify(eContainer.value);
    }
  }
}

function verify(email){
  if(eContainer.verified){
    eContainer.classList.add("hidden");
    var verifyEmail = new XMLHttpRequest();
    verifyEmail.open("POST", "sendEmail.php");
    verifyEmail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    verifyEmail.setRequestHeader(tokenHeader.name,tokenHeader.content);
    verifyEmail.responseType = "json";
    verifyEmail.send("email="+email);
    verifyEmail.onload = function() {
      var userResponse = verifyEmail.response;
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
      rStatus.innerText = "Please enter a valid email.";

      rStatus.reset = setTimeout(()=>{
        rStatus.classList.add("hidden");
        rStatus.classList.remove("highlight-red");
      }, 5000);
    }
  }
}
