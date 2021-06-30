
var node = document.getElementsByClassName("userInput")[0];
var section = document.querySelector("section");
section.parentElement.style.display = "block";

var session = sessionStorage.getItem("session"),
    sessionUser = sessionStorage.getItem("sessionUser"),
    comcount = sessionStorage.getItem("comcount"),
    search = sessionStorage.getItem("search"),
    limited = sessionStorage.getItem("limited"),
    verified = sessionStorage.getItem("verified"),
    flagged = sessionStorage.getItem("flagged");

function loadMessage(message, user, verified, system){
  var playerReview = document.createElement("div");
  playerReview.className = "player-review";
  var playerMinContainer = document.createElement("div");
  playerMinContainer.className = "player-min-container";
  var playerMin = document.createElement("div");
  playerMin.className = "player-min";
  var playerMinName = document.createElement("a");
  playerMinName.className = "player-min-name";
  var verifiedImg = document.createElement("img");
  verifiedImg.className = "verified hidden";
  verifiedImg.src = "src/verified.png";
  if(verified == 1){
    verifiedImg.classList.remove("hidden");
  }
  var playerUsername = document.createElement("p");
  playerUsername.className = "player-username";
  if(system){
    playerUsername.innerText = "System";
  }else{
    playerUsername.innerText = user;
  }
  var commentContainer = document.createElement("div");
  commentContainer.className = "comment-container";
  var comment = document.createElement("p");
  comment.className = "comment";
  if(system && !message){
    comment.innerText = "Welcome to the Chat. History is not saved for future clients.";
  }else{
    comment.innerText = message;
  }
  playerReview.appendChild(playerMinContainer);
  playerMinContainer.appendChild(playerMin);
  playerMinContainer.appendChild(commentContainer);
  playerMin.appendChild(playerMinName);
  playerMinName.appendChild(verifiedImg);
  playerMinName.appendChild(playerUsername);
  playerMinContainer.appendChild(commentContainer);
  commentContainer.appendChild(comment);
  section.appendChild(playerReview.cloneNode(true));
}

loadMessage("Set your username", null, null, true);


function connect(){
  webSocket = new WebSocket("wss://ws.mobitracker.co:8000");
  webSocket.onopen = function(){
    loadMessage(null, null, null, true);
    var joined = sessionUser+" Joined the chat."
    publish(joined);
  };

  webSocket.onmessage = function(event){
    const message = JSON.parse(event.data);
    loadMessage(message.value, message.user, message.verify);
  }
  return webSocket;
}
function publish(m){
  message = {
    type:"Publish",
    message:m,
    user:sessionUser,
    verify:verified
  };
  webSocket.send(JSON.stringify(message));
}

if(sessionUser){
  node.placeholder = "Message";
}else{
  node.placeholder = "You're a guest. Type your username.";
}
node.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if(sessionUser){
      publish(node.value);
    }else{
      loadMessage("Username set to "+node.value+".", null, null, true);
      sessionUser = node.value;
      node.placeholder = "Message";
      connect();
    }
    node.value = "";
  }
});
