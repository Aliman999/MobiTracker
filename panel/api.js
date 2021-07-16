var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
var bool = true;

socket();

var players = new ldBar(".players", {
  'preset':'fan',
  "type": 'stroke',
  "img": '',
  "path": 'M10 10L90 10M90 8M90 12',
  "fill-dir": 'btt',
  "fill": '#25b',
  "fill-background": '#ddd',
  "fill-background-extrude": 3,
  "pattern-size": null,
  "stroke-dir": 'normal',
  "stroke": '#25b',
  "stroke-width": '3',
  "stroke-trail": '#ddd',
  "stroke-trail-width": 0.5,
  "duration": 1,
  "easing": 'linear',
  "value": 0,
  "img-size": null,
  "bbox": null,
  "set-dim": true,
  "aspect-ratio": "xMidYMid",
  "transition-in": false,
  "min": 0,
  "max": 100,
  "precision": 0,
  "padding": undefined
});
var crawler = new ldBar(".crawler", {
  "type": 'stroke',
  "img": '',
  "path": 'M10 10L90 10M90 8M90 12',
  "fill-dir": 'btt',
  "fill": '#25b',
  "fill-background": '#ddd',
  "fill-background-extrude": 3,
  "pattern-size": null,
  "stroke-dir": 'normal',
  "stroke": '#25b',
  "stroke-width": '3',
  "stroke-trail": '#ddd',
  "stroke-trail-width": 0.5,
  "duration": 1,
  "easing": 'linear',
  "value": 0,
  "img-size": null,
  "bbox": null,
  "set-dim": true,
  "aspect-ratio": "xMidYMid",
  "transition-in": false,
  "min": 0,
  "max": 100,
  "precision": 0,
  "padding": undefined
});
var scanner = new ldBar(".scanner", {
  "type": 'stroke',
  "img": '',
  "path": 'M10 10L90 10M90 8M90 12',
  "fill-dir": 'btt',
  "fill": '#25b',
  "fill-background": '#ddd',
  "fill-background-extrude": 3,
  "pattern-size": null,
  "stroke-dir": 'normal',
  "stroke": '#25b',
  "stroke-width": '3',
  "stroke-trail": '#ddd',
  "stroke-trail-width": 0.5,
  "duration": 1,
  "easing": 'linear',
  "value": 0,
  "img-size": null,
  "bbox": null,
  "set-dim": true,
  "aspect-ratio": "xMidYMid",
  "transition-in": false,
  "min": 0,
  "max": 100,
  "precision": 0,
  "padding": undefined
});

function display(response){
  console.log(myBar);
  /*
  var bar = document.getElementsByClassName("mkCharts");

  bar[0].dataset.value = Math.round((response.data.player.current / response.data.player.max * 100));
  bar[1].dataset.value = Math.round((response.data.crawler.current / response.data.crawler.max * 100));
  bar[2].dataset.value = Math.round((response.data.scanner.current / response.data.scanner.max * 100))
  */
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
