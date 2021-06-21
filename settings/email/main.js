'use strict';
var eBtn = document.getElementById("email");
var tokenHeader = document.getElementsByName("token")[0];
var input = document.getElementById("emailInput");
var status = document.getElementById("responseStatus");
eBtn.onclick = function(){
  /*
  var verifyEmail = new XMLHttpRequest();
  verifyEmail.open("POST", "sendEmail.php");
  verifyEmail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  verifyEmail.setRequestHeader(tokenHeader.name,tokenHeader.content);
  //verifyEmail.responseType = "json";
  verifyEmail.send("email=jamesdusky@dustytavern.com");
  verifyEmail.onload = function() {
    var userResponse = verifyEmail.response;
  }
  */
  if(status.classList.contains("hidden")){
    status.classList.toggle("hidden");
    status.innerText = "test";
  }
}
