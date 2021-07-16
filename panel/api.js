var tokenHeader = document.getElementsByName("token")[0];
var jwt = document.getElementsByName("jwt")[0];
var webSocket = null;
var bool = true;

socket();

function display(response){
  if(bool){
    var container = document.getElementsByClassName("centerCont")[0]

    var barCont = document.createElement("div");
    barCont.opacity = 0;
    var bar = document.createElement("div");
    bar.className = "mkCharts";
    bar.dataset.size = "100";

    bar.dataset.percent = Math.ceil(response.data.player.current / response.data.player.max);
    bar.dataset.color = "#91A6FF";
    bar.dataset.stroke = "3";
    bar.id = "player";
    barCont.appendChild(bar);
    var barText = document.createElement("p");
    barText.innerText = "Player Scanner";
    barCont.appendChild(bar);
    barCont.appendChild(barText);

    container.appendChild(barCont);


    barCont = document.createElement("div");
    barCont.opacity = 0;

    bar = document.createElement("div");
    bar.className = "mkCharts";
    bar.dataset.size = "100";

    bar.dataset.percent = Math.ceil(response.data.crawler.current / response.data.crawler.max);
    bar.dataset.color = "#91A6FF";
    bar.dataset.stroke = "3";
    bar.id = "crawler";
    barCont.appendChild(bar);
    var barText = document.createElement("p");
    barText.innerText = "Player Scanner";
    barCont.appendChild(bar);
    barCont.appendChild(barText);

    container.appendChild(barCont);


    barCont = document.createElement("div");
    barCont.opacity = 0;

    bar = document.createElement("div");
    bar.className = "mkCharts";
    bar.dataset.size = "100";

    bar.dataset.percent = Math.ceil(response.data.scanner.current / response.data.scanner.max);
    bar.dataset.color = "#91A6FF";
    bar.dataset.stroke = "3";
    bar.id = "scanner";
    barCont.appendChild(bar);
    var barText = document.createElement("p");
    barText.innerText = "Player Scanner";
    barCont.appendChild(bar);
    barCont.appendChild(barText);

    container.appendChild(barCont);

    run();
  }else{
    
  }
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
