var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
var bool = true;

socket();

var bars = [
  new ldBar(".players", {
    "preset": 'circle',
    "img": '',
    "fill-dir": 'btt',
    "fill": '#fff',
    "fill-background": '#ddd',
    "fill-background-extrude": 3,
    "pattern-size": null,
    "stroke-dir": 'normal',
    "stroke-width": '3',
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
    "img": '',
    "fill-dir": 'btt',
    "fill": '#25b',
    "fill-background": '#ddd',
    "fill-background-extrude": 3,
    "pattern-size": null,
    "stroke-dir": 'normal',
    "stroke-width": '3',
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
    "img": '',
    "fill-dir": 'btt',
    "fill": '#25b',
    "fill-background": '#ddd',
    "fill-background-extrude": 3,
    "pattern-size": null,
    "stroke-dir": 'normal',
    "stroke-width": '3',
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
  bars[0].set(Math.round((response.data.player.current / response.data.player.max * 100)));
  bars[1].set(Math.round((response.data.crawler.current / response.data.crawler.max * 100)));
  bars[2].set(Math.round((response.data.scanner.current / response.data.scanner.max * 100)));
}

function socket(){
  webSocket = new WebSocket("wss://ws.mobitracker.co:2599");
  webSocket.onopen = function(){
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
      console.log(response.message);
      var loading = document.getElementById("loadingContainer");
      loading.style.opacity = 0;
      setTimeout(() => {
        loading.remove();
      }, 250);
    }else{
      console.log(response);
      display(response);
      bool = false;
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
