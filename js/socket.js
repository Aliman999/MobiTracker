
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
function socket(){
  webSocket = new WebSocket("wss://mobitracker.co:8000");
  webSocket.onopen = function(){
    message = {
      type:"authenticate",
      token:jwt.content
    };
    webSocket.send(JSON.stringify(message));
    heartbeat();
  }
  webSocket.onmessage = function(event){
    data = JSON.parse(event.data);
    if(data.noti){
      //sub(data);
    }
  }
  webSocket.onclose = function(){
    socket();
  };
}

function heartbeat() {
  if (!webSocket) return;
  if (webSocket.readyState !== 1) return;
  webSocket.send(JSON.stringify({type:"ping"}));
  setTimeout(heartbeat, 3000);
}

//Need to convert to a notification area
/*
var contracts;
if(contracts = document.getElementsByClassName("verify_btn home_btn")[0]){
  var tokenHeader = document.getElementsByName("token")[0];
  var contractAlert = new XMLHttpRequest();
  var subContainer = document.createElement("div");
  subContainer.classList.add("subContainer");
  var subNumber = document.createElement("p");
  subNumber.classList.add("subNotification");
  subContainer.classList.add("hidden");
  subContainer.appendChild(subNumber);
  contracts.appendChild(subContainer);
  function sub(data){
    if(subNumber.innerText != data.noti){
      subNumber.innerText = data.noti;
    }
    if(data.noti > 0){
      subContainer.classList.remove("hidden");
    }else{
      subContainer.classList.add("hidden");
    }
  }
}
*/
if(jwt){
  //socket();
}
