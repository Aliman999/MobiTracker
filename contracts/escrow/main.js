var tokenHeader = document.getElementsByName("token")[0];
var collapse = document.getElementsByClassName("collapseB");
var section = document.getElementsByClassName("container-comments");
var getUser = new XMLHttpRequest();
var escrow = new XMLHttpRequest();

var session,
    sessionUser,
    comcount,
    search,
    limited,
    verified,
    flagged,
    faction,
    cPref;

getUser.open("GET", "../../src/user.php");
getUser.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
getUser.setRequestHeader(tokenHeader.name,tokenHeader.content);
getUser.responseType = "json";
getUser.send();
var careersText;
var careersShort;
var sC = new Array();
var queryString = new Array();
getUser.onload = function(){
  var response = getUser.response;
  session = response["session"];
  sessionUser = response["sessionUser"];
  comcount = response["comcount"];
  search = response["search"];
  limited = response["limited"];
  verified = response["verified"];
  flagged = response["flagged"];
  faction = response["faction"];
  cPref = response["cPref"];
  mtco(document.getElementById("pending"));
}

for (var i = 0; i < collapse.length; i++){
  if(!collapse[i].nextElementSibling.classList.contains("hidden")){
    console.log("test");
  }
  collapse[i].children[0].onclick = function(e){
    e = document.getElementById(e.target.parentElement.dataset.control);
    mtco(e);
    e.classList.toggle("hidden");
    e = e.previousElementSibling.children[1];
    if(e.innerText == "▲"){
      e.innerText = "▼";
    }else{
      e.innerText = "▲";
    }
  };
  collapse[i].children[1].onclick = function(e){
    e = document.getElementById(e.target.parentElement.dataset.control);
    mtco(e);
    e.classList.toggle("hidden");
    e = e.previousElementSibling.children[1];
    if(e.innerText == "▲"){
      e.innerText = "▼";
    }else{
      e.innerText = "▲";
    }
  };
}

function mtco(section){
  escrow.open("GET", "../../src/escrow.php");
  escrow.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  escrow.setRequestHeader(tokenHeader.name,tokenHeader.content);
  escrow.responseType = "json";
  escrow.send();
  escrow.onload = function(){
    var response = escrow.response;
    if(section.id == "pending"){
      populatePending(section, response.pending);
    }else if (section.id == "progress") {
      populateProgress(section, response.progress);
    }else if (section.id == "completed") {
      populateCompleted(section, response.completed);
    }
  }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clearContracts(section){
  for(var x = 0; x <= section.children.length; x++){
    section.children[0].remove();
  }
}
function populatePending(section, escrow){
  if(section.children.length > 0){
    clearContracts(section);
  }
  for(var i = 0; i < escrow.length; i++){
    var paid = "";
    var active = "";
    if(escrow[i].paid == "1"){
      paid = "True";
    }else{
      paid = "False";
    }
    if(escrow[i].active == "1"){
      active = "True";
    }else{
      active = "False";
    }
    var escrowContainer = document.createElement("div");
    escrowContainer.className = "player-review";

    var playerMinContainer = document.createElement("div");
    playerMinContainer.className = "player-min-container jobposting";

    var playerMin = document.createElement("div");
    playerMin.className = "player-min";
    escrowContainer.appendChild(playerMinContainer);
    playerMinContainer.appendChild(playerMin);

    var playerMinAvatar = document.createElement("img");
    playerMinAvatar.className = "player-min-avatar";
    playerMinAvatar.src = escrow[i].avatar;

    var playerMinName = document.createElement("a");
    playerMinName.className = "player-min-name";
    playerMinName.href = "https://mobitracker.co/"+escrow[i].u_creator;

    var verified = document.createElement("img");
    verified.src = "../../src/verified.png";
    verified.className = "verified";

    var playerUsername = document.createElement("p");
    playerUsername.className = "player-username";
    playerUsername.innerText = escrow[i].u_creator;

    playerMin.appendChild(playerMinAvatar);
    playerMin.appendChild(playerMinName);
    playerMinName.appendChild(verified);
    playerMinName.appendChild(playerUsername);

    var infoContainer = document.createElement("div");
    infoContainer.className = "commentContainer";

    var infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerHTML = escrow[i].careertype+" | #"+escrow[i].id+"</br><span class='highlight'>Paid: "+paid+"</span></br><span class='highlight'>Active: "+active+"</span></br><span class='highlight'>Price: "+numberWithCommas(escrow[i].amount)+"</span></br>EI: "+escrow[i].instructions+"</br>CoE: TBD</br></br>Payee: "+JSON.parse(escrow[i].payee).join(", ")+"</br>Payor: "+JSON.parse(escrow[i].payor).join(", ")+"</br></br>Status: "+escrow[i].status+"</br>Servicer: "+escrow[i].servicer;
    //infoField.innerHTML = "Delivery | ID: 1</br><span class='highlight'>Paid: False</span></br><span class='highlight'>Price: 25,000 aUEC</span></br>EI: Payout per Hiree</br>CoE: TBD</br></br>Payee: TBD</br></br>Status: Awaiting aUEC Confirmation from Escrow</br>Servicer: MobiTracker";
    infoContainer.appendChild(infoField);
    infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerText = "Unsecure - "+escrow[i].unsecure;
    infoContainer.appendChild(infoField);
    infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerText = "Secure - "+escrow[i].secure;
    infoContainer.appendChild(infoField);
    playerMinContainer.appendChild(infoContainer);

    var manageEscrow = document.createElement("div");
    manageEscrow.className = "manageContract";

    var notes = document.createElement("p");
    notes.innerText = "Notes:";

    var notesText = document.createElement("textarea");
    notesText.className = "createComment form-control";
    manageEscrow.appendChild(notes);
    manageEscrow.appendChild(notesText);
    escrowContainer.appendChild(manageEscrow);
    manageEscrow = document.createElement("div");
    manageEscrow.className = "manageContract";

    var escrowWarning = document.createElement("p");
    escrowWarning.className = "highlight-red hidden";

    var escrowSuccess = document.createElement("p");
    escrowSuccess.className = "highlight-green hidden";

    var confirmPayment = document.createElement("a");
    confirmPayment.className = "rButton highlight-green";
    confirmPayment.innerText = "Confirm Payment";
    confirmPayment.index = i;
    confirmPayment.error = escrowWarning;
    confirmPayment.success = escrowSuccess;
    confirmPayment.paid = escrow[i].paid;
    confirmPayment.onclick = function(){
      this.paid = 1;
      populateComplete(escrow);
    }

    var activateContract = document.createElement("a");
    activateContract.className = "rButton highlight-green";
    activateContract.innerText = "Activate Contract";
    activateContract.index = i;
    activateContract.error = escrowWarning;
    activateContract.success = escrowSuccess;
    activateContract.check = confirmPayment;
    activateContract.onclick = function(){
      if(this.check.paid){
        this.success.classList.remove("hidden");
        this.success.innerText = "Success";
        this.error.classList.add("hidden");
      }else{
        this.error.classList.remove("hidden");
        this.error.innerText = "Failed";
        this.success.classList.add("hidden");
      }
    }

    manageEscrow.appendChild(confirmPayment);
    manageEscrow.appendChild(activateContract);
    escrowContainer.appendChild(manageEscrow);
    escrowContainer.appendChild(escrowWarning);
    escrowContainer.appendChild(escrowSuccess);
    section.appendChild(escrowContainer);
  }
}


function populateProgress(section, escrow){
  if(section.children.length > 0){
    clearContracts(section);
  }
  for(var i = 0; i < escrow.length; i++){
    var paid = "";
    var active = "";
    if(escrow[i].paid == "1"){
      paid = "True";
    }else{
      paid = "False";
    }
    if(escrow[i].active == "1"){
      active = "True";
    }else{
      active = "False";
    }
    var escrowContainer = document.createElement("div");
    escrowContainer.className = "player-review";

    var playerMinContainer = document.createElement("div");
    playerMinContainer.className = "player-min-container jobposting";

    var playerMin = document.createElement("div");
    playerMin.className = "player-min";
    escrowContainer.appendChild(playerMinContainer);
    playerMinContainer.appendChild(playerMin);

    var playerMinAvatar = document.createElement("img");
    playerMinAvatar.className = "player-min-avatar";
    playerMinAvatar.src = escrow[i].avatar;

    var playerMinName = document.createElement("a");
    playerMinName.className = "player-min-name";
    playerMinName.href = "https://mobitracker.co/"+escrow[i].u_creator;

    var verified = document.createElement("img");
    verified.src = "../../src/verified.png";
    verified.className = "verified";

    var playerUsername = document.createElement("p");
    playerUsername.className = "player-username";
    playerUsername.innerText = escrow[i].u_creator;

    playerMin.appendChild(playerMinAvatar);
    playerMin.appendChild(playerMinName);
    playerMinName.appendChild(verified);
    playerMinName.appendChild(playerUsername);

    var infoContainer = document.createElement("div");
    infoContainer.className = "commentContainer";

    var infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerHTML = escrow[i].careertype+" | #"+escrow[i].id+"</br><span class='highlight'>Paid: "+paid+"</span></br><span class='highlight'>Active: "+active+"</span></br><span class='highlight'>Price: "+numberWithCommas(escrow[i].amount)+"</span></br>EI: "+escrow[i].instructions+"</br>CoE: TBD</br></br>Payee: "+JSON.parse(escrow[i].payee).join(", ")+"</br>Payor: "+JSON.parse(escrow[i].payor).join(", ")+"</br></br>Status: "+escrow[i].status+"</br>Servicer: "+escrow[i].servicer;
    //infoField.innerHTML = "Delivery | ID: 1</br><span class='highlight'>Paid: False</span></br><span class='highlight'>Price: 25,000 aUEC</span></br>EI: Payout per Hiree</br>CoE: TBD</br></br>Payee: TBD</br></br>Status: Awaiting aUEC Confirmation from Escrow</br>Servicer: MobiTracker";
    infoContainer.appendChild(infoField);
    infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerText = "Unsecure - "+escrow[i].unsecure;
    infoContainer.appendChild(infoField);
    infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerText = "Secure - "+escrow[i].secure;
    infoContainer.appendChild(infoField);
    playerMinContainer.appendChild(infoContainer);

    var manageEscrow = document.createElement("div");
    manageEscrow.className = "manageContract";

    var notes = document.createElement("p");
    notes.innerText = "Notes:";

    var notesText = document.createElement("textarea");
    notesText.className = "createComment form-control";
    manageEscrow.appendChild(notes);
    manageEscrow.appendChild(notesText);
    escrowContainer.appendChild(manageEscrow);
    manageEscrow = document.createElement("div");
    manageEscrow.className = "manageContract";

    var escrowWarning = document.createElement("p");
    escrowWarning.className = "highlight-red hidden";

    var escrowSuccess = document.createElement("p");
    escrowSuccess.className = "highlight-green hidden";

    var confirmPayment = document.createElement("a");
    confirmPayment.className = "rButton highlight-green";
    confirmPayment.innerText = "Confirm Payment";
    confirmPayment.index = i;
    confirmPayment.error = escrowWarning;
    confirmPayment.success = escrowSuccess;
    confirmPayment.paid = escrow[i].paid;
    confirmPayment.onclick = function(){
      this.paid = 1;
      populateComplete(escrow);
    }

    var activateContract = document.createElement("a");
    activateContract.className = "rButton highlight-green";
    activateContract.innerText = "Activate Contract";
    activateContract.index = i;
    activateContract.error = escrowWarning;
    activateContract.success = escrowSuccess;
    activateContract.check = confirmPayment;
    activateContract.onclick = function(){
      if(this.check.paid){
        this.success.classList.remove("hidden");
        this.success.innerText = "Success";
        this.error.classList.add("hidden");
      }else{
        this.error.classList.remove("hidden");
        this.error.innerText = "Failed";
        this.success.classList.add("hidden");
      }
    }

    manageEscrow.appendChild(confirmPayment);
    manageEscrow.appendChild(activateContract);
    escrowContainer.appendChild(manageEscrow);
    escrowContainer.appendChild(escrowWarning);
    escrowContainer.appendChild(escrowSuccess);
    section.appendChild(escrowContainer);
  }
}


function populateCompleted(section, escrow){
  if(section.children.length > 0){
    clearContracts(section);
  }
  for(var i = 0; i < escrow.length; i++){
    var paid = "";
    var active = "";
    if(escrow[i].paid == "1"){
      paid = "True";
    }else{
      paid = "False";
    }
    if(escrow[i].active == "1"){
      active = "True";
    }else{
      active = "False";
    }
    var escrowContainer = document.createElement("div");
    escrowContainer.className = "player-review";

    var playerMinContainer = document.createElement("div");
    playerMinContainer.className = "player-min-container jobposting";

    var playerMin = document.createElement("div");
    playerMin.className = "player-min";
    escrowContainer.appendChild(playerMinContainer);
    playerMinContainer.appendChild(playerMin);

    var playerMinAvatar = document.createElement("img");
    playerMinAvatar.className = "player-min-avatar";
    playerMinAvatar.src = escrow[i].avatar;

    var playerMinName = document.createElement("a");
    playerMinName.className = "player-min-name";
    playerMinName.href = "https://mobitracker.co/"+escrow[i].u_creator;

    var verified = document.createElement("img");
    verified.src = "../../src/verified.png";
    verified.className = "verified";

    var playerUsername = document.createElement("p");
    playerUsername.className = "player-username";
    playerUsername.innerText = escrow[i].u_creator;

    playerMin.appendChild(playerMinAvatar);
    playerMin.appendChild(playerMinName);
    playerMinName.appendChild(verified);
    playerMinName.appendChild(playerUsername);

    var infoContainer = document.createElement("div");
    infoContainer.className = "commentContainer";

    var infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerHTML = escrow[i].careertype+" | #"+escrow[i].id+"</br><span class='highlight'>Paid: "+paid+"</span></br><span class='highlight'>Active: "+active+"</span></br><span class='highlight'>Price: "+numberWithCommas(escrow[i].amount)+"</span></br>EI: "+escrow[i].instructions+"</br>CoE: TBD</br></br>Payee: "+JSON.parse(escrow[i].payee).join(", ")+"</br>Payor: "+JSON.parse(escrow[i].payor).join(", ")+"</br></br>Status: "+escrow[i].status+"</br>Servicer: "+escrow[i].servicer;
    //infoField.innerHTML = "Delivery | ID: 1</br><span class='highlight'>Paid: False</span></br><span class='highlight'>Price: 25,000 aUEC</span></br>EI: Payout per Hiree</br>CoE: TBD</br></br>Payee: TBD</br></br>Status: Awaiting aUEC Confirmation from Escrow</br>Servicer: MobiTracker";
    infoContainer.appendChild(infoField);
    infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerText = "Unsecure - "+escrow[i].unsecure;
    infoContainer.appendChild(infoField);
    infoField = document.createElement("p");
    infoField.className = "comment";
    infoField.innerText = "Secure - "+escrow[i].secure;
    infoContainer.appendChild(infoField);
    playerMinContainer.appendChild(infoContainer);

    var manageEscrow = document.createElement("div");
    manageEscrow.className = "manageContract";

    var notes = document.createElement("p");
    notes.innerText = "Notes:";

    var notesText = document.createElement("textarea");
    notesText.className = "createComment form-control";
    manageEscrow.appendChild(notes);
    manageEscrow.appendChild(notesText);
    escrowContainer.appendChild(manageEscrow);
    manageEscrow = document.createElement("div");
    manageEscrow.className = "manageContract";
    
    escrowContainer.appendChild(manageEscrow);
    section.appendChild(escrowContainer);
  }
}
