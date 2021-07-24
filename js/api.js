var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
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
        callback();
      }
    }
    webSocket.onerror = function (err) {
      console.log("Error");
      setTimeout(socket, 3000);
    }
    webSocket.onclose = function () {
      console.log("Connection Closed");
      setTimeout(socket, 3000);
    };
  })
}

function heartbeat() {
  if (!webSocket) return;
  if (webSocket.readyState !== 1) return;
  webSocket.send(JSON.stringify({type:"ping"}));
  setTimeout(heartbeat, 3000);
}

function api(name){
  if(!name){
    throw new error("Input Required");
  }else{
    return send("job", name);
  }
}

function history(obj = { type: 'user', datatype: 'username', input: '' }){
  if(!input){
    throw new error("Input Required");
  }else{
    return send("history", obj);
  }
}

function send(type, message) {
  return new Promise(callback => {
    message = {
      type: type,
      data: message
    }
    console.log(message);
    webSocket.send(JSON.stringify(message));

    webSocket.onmessage = function (event) {
      var response = JSON.parse(event.data);
      callback(response.data);
    }
  });
}