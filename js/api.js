var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;

var load = setInterval(()=>{
  if(user){
    console.log(user);
    //socket();
    clearInterval(load);
  }
}, 1000);

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
    var response = JSON.parse(event.data);
    if(response.type == "authentication"){
      api(user.sessionUser);
    }else if (response.type == "response") {
      console.log(response.data);
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
