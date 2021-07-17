var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
var bool = true;

function getColor() {
  var hue = Math.floor(Math.random() * 360);
  return 'hsl(' + hue + ', 100%, 80%)';
}

if(jwt){
  socket();
}

var bars = [
  new ldBar(".players", {
    "preset": 'circle',
    "stroke": getColor(),
    "img": '',
    "fill-dir": 'btt',
    "fill": '#25b',
    "fill-background": '#fff',
    "fill-background-extrude": 3,
    "pattern-size": 3,
    "stroke-dir": 'normal',
    "stroke-width": '6',
    "stroke-trail": '#ddd',
    "stroke-trail-width": 0.5,
    "duration": 1,
    "easing": 'linear',
    "value": 0,
    "img-size": null,
    "set-dim": true,
    "aspect-ratio": "xMidYMid",
    "transition-in": false,
    "min": 0,
    "max": 100,
    "precision": 0,
    "padding": undefined
  }),
  new ldBar(".crawler", {
    "preset": 'circle',
    "stroke": getColor(),
    "img": '',
    "fill-dir": 'btt',
    "fill": '#25b',
    "fill-background": '#ddd',
    "fill-background-extrude": 3,
    "pattern-size": null,
    "stroke-dir": 'normal',
    "stroke-width": '6',
    "stroke-trail": '#ddd',
    "stroke-trail-width": 0.5,
    "duration": 1,
    "easing": 'linear',
    "value": 0,
    "img-size": null,
    "set-dim": true,
    "aspect-ratio": "xMidYMid",
    "transition-in": false,
    "min": 0,
    "max": 100,
    "precision": 0,
    "padding": undefined
  }),
  new ldBar(".scanner", {
    "preset": 'circle',
    "stroke": getColor(),
    "img": '',
    "fill-dir": 'btt',
    "fill": '#25b',
    "fill-background": '#ddd',
    "fill-background-extrude": 3,
    "pattern-size": null,
    "stroke-dir": 'normal',
    "stroke-width": '6',
    "stroke-trail": '#ddd',
    "stroke-trail-width": 0.5,
    "duration": 1,
    "easing": 'linear',
    "value": 0,
    "img-size": null,
    "set-dim": true,
    "aspect-ratio": "xMidYMid",
    "transition-in": false,
    "min": 0,
    "max": 100,
    "precision": 0,
    "padding": undefined
  })
];

function display(response){
  bars[0].set(Math.floor((response.data.player.current / response.data.player.max * 100)));
  bars[1].set(Math.floor((response.data.crawler.current / response.data.crawler.max * 100)));
  bars[2].set(Math.floor((response.data.scanner.current / response.data.scanner.max * 100)));
}

function socket(){
  var connection = document.getElementsByClassName("conContainer")[0];
  webSocket = new WebSocket("wss://ws.mobitracker.co:2599");
  webSocket.onopen = function(){
    connection.children[0].innerText = "CONNECTING";
    connection.children[1].className = "connecting";
    message = {
      type:"panel",
      token:jwt.content
    };
    webSocket.send(JSON.stringify(message));
    console.log("Authentication Sent");
    heartbeat();
  }
  webSocket.onmessage = function(event){
    var response = JSON.parse(event.data);
    if(response.type == "authentication"){
      var loading;
      if (loading = document.getElementById("loadingContainer")){
        loading.style.opacity = 0;
        setTimeout(() => {
          loading.remove();
        }, 250);
      }
    } else {
      connection.children[0].innerText = "LIVE";
      connection.children[1].className = "live";
      display(response);
      bool = false;
    }
  }
  
  webSocket.onclose = function () {
    connection.children[0].innerText = "DISCONNECTED";
    connection.children[1].className = "offline";
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
