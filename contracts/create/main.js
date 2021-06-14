var inputNum = document.getElementsByClassName("numInput");
var userTarget = document.getElementsByClassName("userInput")[1];
var inputText = document.getElementsByClassName("createComment");
var charCount = document.getElementsByClassName("charCounter");
var tokenHeader = document.getElementsByName("token")[0];
var service = document.getElementById("service");
var option = document.getElementById("option");
var post = document.getElementsByClassName("post")[0];
var postErr = document.getElementsByClassName("error")[0];
var create = new XMLHttpRequest();
var getUser = new XMLHttpRequest();
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
  cPref = response["cPref"]; // TODO: 0 = Freelance, 1 = Contractor, 2 = Both
}
function hasValue(e){
  if(e.value){
    e.style.border = "2px solid rgb(57, 206, 216)";
    e.style.boxShadow = "0px 0px 15px rgba(57, 206, 216, 0.5)";
  }else{
    e.style.border = null;
    e.style.boxShadow = null;
  }
}
var err;
function error(e){
  postErr.classList.remove("hidden");
  postErr.classList.remove("highlight-green");
  postErr.classList.add("highlight-red");
  if(e.cd){
    postErr.innerText = e.error+" "+Math.round((e.cd - e.time)/60)+" min(s) remaining";
  }else{
    postErr.innerText = e.error;
  }
}
window.onload = function(){
  var text = document.getElementsByClassName("form-control");
  for(var i=0;i<text.length;i++){
    if(text[i].value){
      text[i].style.border = "2px solid rgb(57, 206, 216)";
      text[i].style.boxShadow = "0px 0px 15px rgba(57, 206, 216, 0.5)";
    }else{
      text[i].style.border = null;
      text[i].style.boxShadow = null;
    }
  }
}
function clickUser(user){
  window.location.href = "https://mobitracker.co/"+user;
}

var temp;

inputNum[0].oninput = function(e){
  hasValue(this);
  if(Number.isInteger(parseInt(e.data)) || e.data === null){
    temp = this.value;
  }else{
    this.value = temp;
  }
  if(this.value > 35000000){
    this.value = 35000000;
    temp = this.value;
    postErr.error = "Current maximum aUEC is 35,000,000";
    error(postErr);
  }else if(this.value < 0){
    this.value = 0;
    temp = this.value;
    postErr.error = "Price cannot be negative";
    error(postErr);
  }
};

var prevLen0 = 0;
inputText[0].oninput = function(){
  hasValue(this);
  var len = this.textLength;
  if(len !== prevLen0){
    prevLen0 = len;
    charCount[0].textContent = len+"/500";
  }
};
var prevLen1 = 0;
inputText[1].oninput = function(){
  hasValue(this);
  var len = this.textLength;
  if(len !== prevLen1){
    prevLen1 = len;
    charCount[1].textContent = len+"/100";
  }
};
userTarget.oninput = function(){
  hasValue(this);
  if(userTarget.value == sessionUser){
    postErr.error = "You cannot target yourself.";
    error(postErr);
  }else{
    postErr.classList.add("hidden");
  }
};
function checkInputs(){
  if(post.innerText == "Confirm") post.innerText = "Create";
  var pass = false;
  if(inputNum[0].value == ""){
    inputNum[0].value = 0;
  }
  if(inputText[0].value == "" || inputText[1].value == ""){
    return false;
  }else{
    return true;
  }
}
var escrow = document.getElementById("escrow");
escrow.onclick = function(){
  if(this.checked == true){
    if(option.innerText == "Offering"){
      postErr.innerText = "Opting in for the escrow service requires your contractors to deposit the price of this contract before you work with them for your payment's security. \n\nYour contract will not be shown publicly until the escrow service confirms they're ready for aUEC transactions.";
    }else{
      postErr.innerText = "Opting in for the escrow service requires you send a deposit of the contract's payout to a secured ingame account that will hold your future employee's payment when they complete this contract. \n\nYour contract will not be publicly shown until the escrow service confirms they've received your aUEC deposit.";
    }
    postErr.classList.remove("highlight-red");
    postErr.classList.add("highlight-green");
    postErr.classList.remove("hidden");
    setTimeout(function(){
      postErr.classList.add("highlight-red");
      postErr.classList.remove("highlight-green");
      postErr.classList.add("hidden");
    }, 30000);
  }else{
    postErr.classList.add("highlight-red");
    postErr.classList.remove("highlight-green");
    postErr.classList.add("hidden");
  }
}
post.addEventListener("click", function(e){
  var escrow = document.getElementById("escrow");
  if(checkInputs()){
    if(escrow.checked == true){
      if(post.innerText == "Create"){
        if(option.innerText == "Offering"){
          postErr.innerText = "Your contract will not be shown publicly until the escrow service confirms they're ready for aUEC transactions. \n\nYou will receive payout only when we've received the aUEC from a contractor.";
        }else{
          postErr.innerText = "Your contract will not be shown publicly until the escrow service confirms they've received your aUEC deposit. \n\nPlease send "+(parseInt(inputNum[0].value)+(parseInt(inputNum[0].value)*0.05))+"aUEC (Includes transfer fee) to the ingame name 'Kindmiss'";
        }
        postErr.classList.remove("highlight-red");
        postErr.classList.add("highlight-green");
        postErr.classList.remove("hidden");
      }
      escrow.post = "&escrow=1";
      post.innerText = "Confirm";
      post.onclick = function(e){
        submit();
      };
    }else{
      escrow.post = "&escrow=0";
      submit();
    }
    function submit(){
      create.open("POST", "../../src/contractCreate.php");
      create.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      create.setRequestHeader(tokenHeader.name,tokenHeader.content);
      create.send("careertype="+service.innerText+"&option="+option.innerText+"&price="+inputNum[0].value+"&target="+userTarget.value+"&unsecure="+escape(inputText[0].value)+"&secure="+escape(inputText[1].value)+escrow.post);
      create.onload = function(){
        var response = create.response;
        if(response){
          error(JSON.parse(response));
        }else{
          postErr.classList.remove("hidden");
          postErr.classList.remove("highlight-red");
          postErr.classList.add("highlight-green");
          postErr.innerText = "Your contract has been created! \nSending you back to the contracts.";
          setTimeout(function(){
            window.location.href = "../";
          }, 3000);
        }
      }
    }
  }else{
    postErr.classList.remove("hidden");
    if (userTarget.value == "" && !userTarget.parentElement.classList.contains("hidden")) {
      postErr.error = "Enter a target's ingame Starcitizen name.";
      error(postErr);
    }else if (inputText[0].value == "") {
      postErr.error = "Enter a description of your contract.";
      error(postErr);
    }else if (inputText[1].value == "") {
      postErr.error = "Enter information that you want accepted applicants to see.";
      error(postErr);
    }
  }
});
