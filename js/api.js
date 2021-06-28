var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
var profile;

var waitUser = setInterval(()=>{
  if(user){
    socket();
    clearInterval(waitUser);
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
      if(!profile){
        api(user.sessionUser);
      }
    }else if (response.type == "response") {
      profile = response.data;
      console.log(response);
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
  name = "Bo-Fone";
  console.log("Job Sent");
  webSocket.send(JSON.stringify({
    type:"job",
    token:name
  }));
}
