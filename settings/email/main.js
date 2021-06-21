'use strict';
var eBtn = document.getElementById("email");
var tokenHeader = document.getElementsByName("token")[0];
var input = document.getElementById("emailInput");
var rStatus = document.getElementById("status");

eBtn.onclick = function(){
  if(!input.classList.contains("hidden")){
    verify(input.value);
  }else{
    input.classList.remove("hidden");
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        verify(input.value);
      }
    });
  }
}

function verify(email){
  input.classList.add("hidden");
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
        rStatus.innerText = "test";
      }
      setTimeout(()=>{
        rStatus.classList.add("hidden");
      }, 2000);
    }
  }
}
