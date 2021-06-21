'use strict';
var eBtn = document.getElementById("email");
eBtn.onclick = function(){
  var verifyEmail = new XMLHttpRequest();
  verifyEmail.open("POST", "sendEmail.php");
  verifyEmail.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  verifyEmail.setRequestHeader(tokenHeader.name,tokenHeader.content);
  verifyEmail.responseType = "json";
  verifyEmail.send("email=jamesdusky@dustytavern.com");
  verifyEmail.onload = function() {
    var userResponse = verifyEmail.response;
  }
}
