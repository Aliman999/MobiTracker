var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
function socket(){
  webSocket = new WebSocket("wss://mobitracker.co:8000");
  webSocket.onopen = function(){
    message = {
      type:"authenticate",
      token:jwt.content
    };
    webSocket.send(JSON.stringify(message));
    heartbeat();
  }
  webSocket.onmessage = function(event){
    data = JSON.parse(event.data);
    if(data.noti){
      //sub(data);
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
