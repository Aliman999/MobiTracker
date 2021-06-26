var tokenHeader = document.getElementsByName("token")[0];
var body = document.getElementsByTagName("body");
var jwt = document.getElementsByName("jwt")[0];
var status = document.getElementById("status");
var input = document.getElementById("input");
var output = document.getElementById("output");
var webSocket = null;

function socket(){
  webSocket = new WebSocket("wss://mobitracker.co:2599");
  webSocket.onopen = function(){
    heartbeat();
  }
  webSocket.onmessage = function(event){
    status.innerText = "Ready";
    input.addEventListener('keypress', function (e){
      if(e.key === 'Enter'){
        verify(input.value);
      }
    });
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

function orgs(name){
  console.log("Job Sent");
  webSocket.send(JSON.stringify({
    type:"orgs",
    token:name
  }));
}
