var tokenHeader = document.getElementsByName("token")[0];
var body = document.getElementsByTagName("body");
var jwt = document.getElementsByName("jwt")[0];
var apistatus = document.getElementById("status");
var input = document.getElementById("input");
var output = document.getElementById("output");
var webSocket = null;

function socket(){
  webSocket = new WebSocket("wss://mobitracker.co:2599");
  webSocket.onopen = function(){
    webSocket.send(JSON.stringify({
      type:"orgs",
      token:""
    }));

    apistatus.innerText = "Ready";
    input.addEventListener('keypress', function (e){
      if(e.key === 'Enter'){
        orgs(input.value);
      }
    });
    heartbeat();
  }
  webSocket.onmessage = function(event){
  }
  webSocket.onerror = function(err){
    apistatus.innerText = "Error, Reconnecting";
    setTimeout(socket, 3000);
  }
  webSocket.onclose = function(){
    apistatus.innerText = "Connection Closed, Reconnecting";
    setTimeout(socket, 3000);
  };
}
socket();

function heartbeat() {
  if (!webSocket) return;
  if (webSocket.readyState !== 1) return;
  webSocket.send(JSON.stringify({type:"ping"}));
  setTimeout(heartbeat, 3000);
}

function orgs(name){
  apistatus.innerText = "Job Sent";
  if(name.indexOf(' ') >= 0){
    name = JSON.stringify(name.split(" "));
  }
  webSocket.send(JSON.stringify({
    type:"job",
    token:name
  }));
}
