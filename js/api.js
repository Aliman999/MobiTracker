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
  query.onload = async function(){
    user = query.response;
    await socket()
    .then(()=>{
    })
  }
}

requestUser();

function socket(){
  return new Promise(callback => {
    webSocket = new WebSocket("wss://mobitracker.co:2599");
    webSocket.onopen = function(){
      /*
      message = {
        type:"auth",
        token:jwt.content
      };
      webSocket.send(JSON.stringify(message));
      */
      api(user.sessionUser);
      heartbeat();
    }
    webSocket.onmessage = function(event){
      var data = JSON.parse(event.data);
      callback();
    }
    webSocket.onerror = function(err){

    }
    webSocket.onclose = function(){
      setTimeout(socket, 3000);
    };
  });
}

function heartbeat() {
  if (!webSocket) return;
  if (webSocket.readyState !== 1) return;
  webSocket.send(JSON.stringify({type:"ping"}));
  setTimeout(heartbeat, 3000);
}

function api(name){
  webSocket.send(JSON.stringify({
    type:"job",
    token:name
  }));
}
