var x, i, j, l, ll, selElmnt, a, b, c, y = 0;
var pageContainer = document.getElementsByClassName('pageContainer');
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items faction select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");

    if(document.getElementsByClassName("same-as-selected")[0].innerText == "Legal"){
      document.getElementsByClassName("select-selected")[0].style.color = "#87d374";
      document.getElementsByClassName("select-selected")[0].style.textShadow = "0px 0px 5px #87d374";
    }else{
      document.getElementsByClassName("select-selected")[0].style.color = "#FF5A5A";
      document.getElementsByClassName("select-selected")[0].style.textShadow = "0px 0px 5px #FF5A5A";
    }
  });
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

var faction = document.getElementsByClassName('faction')[0];
var agree = document.getElementById('agree');
var disagree = document.getElementById('disagree');
var tokenHeader = document.getElementsByName("token")[0];
var disclaimer = new XMLHttpRequest();


faction.addEventListener("click", function(e) {
  agree.classList.remove("rDisabled");
  agree.classList.add("highlight-green");
  agree.addEventListener("click", function(e) {
    disclaimer.open('POST', '../src/disclaimer.php');
    disclaimer.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    disclaimer.setRequestHeader(tokenHeader.name,tokenHeader.content);
    disclaimer.send("faction="+a.innerText);
    disclaimer.onload = function(){
      var response = disclaimer.response;
      if(response == "Success"){
        document.getElementById('error').classList.remove("highlight-red");
        document.getElementById('error').classList.add("highlight-green");
        document.getElementById('error').innerText = "Welcome to MobiTracker Contracts. Redirecting.";
        setTimeout(function () {
          window.location.href = "https://mobitracker.co/contracts"; //CHANGE THIS LATER
        }, 2000)
      }
    };
  });
});
disagree.addEventListener("click", function(e) {
  document.getElementById('error').classList.remove("highlight-green");
  document.getElementById('error').classList.add("highlight-red");
  document.getElementById('error').innerText = "You must agree to use Mobitracker Contracts. Redirecting to the HomePage.";
  setTimeout(function () {
    window.location.href = "https://mobitracker.co";
  }, 2000)
});
var contracts = { legal: 0, illegal: 0 };
var percent = { total: 0 };
var getPercent = new XMLHttpRequest();
getPercent.open("GET", "../src/contractPercent.php");
getPercent.setRequestHeader(tokenHeader.name, tokenHeader.content);
getPercent.send();
getPercent.onload = function(){
  var response = JSON.parse(getPercent.response);
  contracts.legal = response.legal;
  contracts.illegal = response.illegal;
  percent.total = response.total;
  balance();
}
function balance(){
  var multiplier = document.getElementsByClassName("statusContainer")[0].clientWidth/100;
  document.getElementsByClassName("statusTotal")[0].innerText = percent.total+" Contracts";
  percent.nums = new Array();
  percent.nums[0] = percent.illegal = Math.round((contracts.illegal/percent.total)*100);
  percent.nums[1] = percent.legal = Math.round((contracts.legal/percent.total)*100);
  var statusbar = document.getElementsByClassName("status");
  var statusPercent = document.getElementsByClassName("statusPercent");
  for(var i = 0; i < statusPercent.length; i++){
    statusPercent[i].innerText = percent.nums[i]+"%";
    if(i == 0){
      statusPercent[i].innerText = "Illegal "+statusPercent[i].innerText;
    }else{
      statusPercent[i].innerText = statusPercent[i].innerText+" Legal";
    }
  }
  var color = { legal:"#00f", illegal:"#C00" };
  statusbar[0].style.backgroundColor = color.illegal;
  statusbar[0].style.width = percent.illegal*multiplier+"px";
  statusbar[1].style.backgroundColor = color.legal;
  statusbar[1].style.width = percent.legal*multiplier+"px";
}

document.addEventListener("click", closeAllSelect);
