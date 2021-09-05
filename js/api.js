var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var apiToken = document.getElementsByName("apiToken")[0];
var webSocket = null;

function socket() {
  return new Promise(callback => {
    webSocket = new WebSocket("wss://ws.mobitracker.co:2599");
    webSocket.onopen = function () {
      message = {
        type: "internal",
        token: jwt.content
      };
      webSocket.send(JSON.stringify(message));
      console.log("Authentication Sent");
      heartbeat();
    }
    webSocket.onmessage = function (event) {
      console.log("Authentication Response");
      var response = JSON.parse(event.data);
      if (response.type == "authentication") {
        callback(response.status);
      }
    }
    window.onfocus = function(){
      webSocket.onerror = function (err) {
        console.log("Error");
        setTimeout(socket, 3000);
      };
      webSocket.onclose = function () {
        console.log("Connection Closed");
        setTimeout(socket, 3000);
      };
    };
    window.onblur = function(){
      webSocket.onerror = null;
      webSocket.onclose = null;
    };
  })
}

function heartbeat() {
  if (!webSocket) return;
  if (webSocket.readyState !== 1) return;
  webSocket.send(JSON.stringify({type:"ping"}));
  setTimeout(heartbeat, 30000);
}

function send(type, message) {
  return new Promise(callback => {
    message = {
      type: type,
      data: message
    }
    webSocket.onmessage = function (event) {
      var response = JSON.parse(event.data);
      if(response.type === "response"){
        callback(response);
      }
    }
    console.log(JSON.stringify(message));
    webSocket.send(JSON.stringify(message));
  });
}