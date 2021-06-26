var tokenHeader = document.getElementsByName("token")[0];
var body = document.getElementsByTagName("body");
var jwt = document.getElementsByName("jwt")[0];
var apistatus = document.getElementById("status");
var input = document.getElementById("input");
var output = document.getElementById("output");
var error = document.getElementById("error");
var enable = true;
var webSocket = null;

function socket(){
  webSocket = new WebSocket("wss://mobitracker.co:2599");
  webSocket.onopen = function(){
    webSocket.send(JSON.stringify({
      type:"orgs",
      token:""
    }));
    enable = true;
    input.addEventListener('keypress', function (e){
      if(e.key === 'Enter' && enable == true){
        orgs(input.value);
      }
    });
    heartbeat();
  }
  webSocket.onmessage = function(event){
    var response = JSON.parse(event.data);
    if(response.type === "response"){
      apistatus.innerText = response.data;
    }else if (response.type === "status") {
      apistatus.innerText = response.data;
    }else if (response.type === "finished") {
      enable = true;
      apistatus.innerText = response.message;
      output.value = "!search "+response.data.join(" ");
    }else if (response.type === "error") {
      enable = true;
      error.value = response.message;
    }
  }
  webSocket.onerror = function(err){
    apistatus.innerText = "Error, Reconnecting";
  }
  webSocket.onclose = async function(){
    apistatus.innerText = "Connection Closed, Reconnecting";
    await setTimeout(socket, 3000);
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
  enable = false;
  apistatus.innerText = "Job Sent";
  if(name.indexOf(' ') >= 0){
    name = JSON.stringify(name.split(" "));
  }
  webSocket.send(JSON.stringify({
    type:"job",
    token:name
  }));
}
