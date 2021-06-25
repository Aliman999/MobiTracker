var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var query = new XMLHttpRequest();
var webSocket = null;
var user;

function requestUser(){
  query.open("GET", "https://mobitracker.co/src/user.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.setRequestHeader(tokenHeader.name,tokenHeader.content);
  query.responseType = "json";
  query.async = false;
  query.send();
  query.onload = function(){
    user = query.response;
    socket();
  }
}

requestUser();

function socket(){
  webSocket = new WebSocket("wss://mobitracker.co:2599");
  webSocket.onopen = function(){
    message = {
      type:"auth",
      token:jwt.content
    };
    webSocket.send(JSON.stringify(message));
    console.log("Authentication Sent");
    heartbeat();
  }
  webSocket.onmessage = function(event){
    console.log("Authentication Response");
    var data = JSON.parse(event.data);
    if(data.data == "Authenticated"){
      api(user.sessionUser);
    }
  }
  webSocket.onerror = function(err){
    console.log("Error");
    setTimeout(socket, 3000);
  }
  webSocket.onclose = function(){
    console.log("Connection Closed");
    setTimeout(socket, 3000);
  };
}

function heartbeat() {
  if (!webSocket) return;
  if (webSocket.readyState !== 1) return;
  webSocket.send(JSON.stringify({type:"ping"}));
  setTimeout(heartbeat, 3000);
}

function api(name){
  console.log("Job Sent");
  webSocket.send(JSON.stringify({
    type:"job",
    token:name
  }));
}
