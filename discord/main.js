const tokenHeader = document.getElementsByName("token")[0];
const formGroup = document.getElementsByClassName("form-group")[0];
const genAuth = new XMLHttpRequest();
const genBtn = document.getElementsByClassName("btn-primary")[0];
const c = document.getElementsByClassName("checkbox")[0];
const a = document.getElementsByClassName("checkbox")[1];
const r = document.getElementsByClassName("checkbox")[2];
const err = document.getElementsByClassName("v-Error")[0];
const authContainer = document.createElement("div");
const bufferString = document.createElement("p");
const bufferString2 = document.createElement("p");
const copyUrlTT = document.createElement("span");
const copyCont = document.createElement("div");
const copyUrl = document.createElement("img");
const bufferTimer = document.createElement("span");
const timer = document.createElement("p");
const authString = document.createElement("p");
var timeout;
var x = false;

function startTimer() {
  var presentTime = bufferTimer.innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<1){
    bufferTimer.classList.add("highlight-red");
  }
  if(m<0){
    bufferTimer.innerText = "";
    timer.classList.add("highlight-red");
    timer.innerText = "This token has expired.";
  }

  bufferTimer.innerText = m + ":" + s;
  console.log(m)
  timeout = setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

genBtn.onclick = function(){
  if(!c.checked && !r.checked && !a.checked ){
    err.innerText = "You have to select atleast one.";
  }else{
    err.innerText = "";
    genAuth.open("GET", "../src/jwt/generate_auth.php?c="+c.checked+"&a="+a.checked+"&r="+r.checked);
    genAuth.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    genAuth.setRequestHeader(tokenHeader.name,tokenHeader.content);
    genAuth.send();
    genAuth.onload = function() {
      const response = genAuth.response;
      copyCont.className = "refresh";
      copyUrlTT.className = "copyToolTip hidden";
      copyUrlTT.innerHTML = "Token Copied!";
      copyUrl.src = "../src/copy.png";
      copyUrl.className = "copyBtn";
      copyCont.appendChild(copyUrl);
      copyCont.appendChild(copyUrlTT);
      copyUrl.onclick = function(){
        copyUrlTT.classList.remove("hidden");
        var copy = document.createElement("input");
        copy.value = authString.innerText;
        document.body.appendChild(copy);
        copy.select();
        document.execCommand("copy");
        document.body.removeChild(copy);
        setTimeout(function () {
          copyUrlTT.classList.add("hidden");
        }, 1000);
      };
      bufferString.innerText = "To keep getting alerts, Make sure to stay in a discord with the bot. Paste this string below to the bot privately for your security!";
      bufferString2.innerText = "Send this to the bot on Discord.";
      bufferString2.className = "highlight-green";
      timer.innerText = "This token expires in ";
      bufferTimer.innerText = 005 + ":" + 00;
      timer.appendChild(bufferTimer);
      clearTimeout(timeout);
      startTimer();
      authString.className = "authString";
      if(authString.innerText == ""){
        authString.innerText = "!auth "+response;
        authContainer.appendChild(authString);
        formGroup.appendChild(bufferString);
        formGroup.appendChild(bufferString2);
        formGroup.appendChild(timer);
        formGroup.appendChild(copyCont);
        formGroup.appendChild(authContainer);
      }else{
        authString.innerText = "!auth "+response;
      }
    }
  }
}
