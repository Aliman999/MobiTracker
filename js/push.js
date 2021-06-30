var webSocket = new WebSocket("wss://ws.mobitracker.co:8000");
var jwt = document.getElementsByName("jwt")[0];

function socket(){
  webSocket = new WebSocket("wss://ws.mobitracker.co:8000");
  webSocket.onopen = function(){
    message = {
      type:"authenticate",
      token:jwt.content,
    };
    heartbeat();
    webSocket.send(JSON.stringify(message));
  }
  webSocket.onmessage = function(event){
    data = JSON.parse(event.data);
    if(data.reload){
      searchCareer(sC);
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

socket();
