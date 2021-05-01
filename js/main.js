var header = document.querySelector("header");
var section = document.querySelector("section");
var body = document.getElementsByTagName("body");
var containerHeader = document.getElementsByClassName("container-header")[0];
var containerSection = document.getElementsByClassName("container-section")[0];
var createErr = document.createElement("p");
var createButton = document.createElement("button");
var newline = "\r\n";
var node = document.getElementsByClassName("userInput")[0];
var commentCount;
var sCount;
var dataCount;
var bioExist;
var player = null;
var selected = -1;
var editing = 0;
var commented = 0;
var check = 0;
var sC = [0,0,0,0,0,0,-1,1];
var ext = "auto";
var careers = ["src/crew.png","src/escort.png","src/explorer.png","src/miner.png","src/pirate.png","src/trader.png"];
var careersText = ["Crew","Escort","Explorer","Miner","Pirate","Trader"];
var orgURL = "https://robertsspaceindustries.com/orgs/";
var tokenHeader = document.getElementsByName("token")[0];
var request = new XMLHttpRequest();
var readComments = new XMLHttpRequest();
var readRating = new XMLHttpRequest();
var readCareers = new XMLHttpRequest();
var writeComments = new XMLHttpRequest();
var searchCareers = new XMLHttpRequest();
var deleteComments = new XMLHttpRequest();
var editComments = new XMLHttpRequest();
var editCareer = new XMLHttpRequest();
var flagID = new XMLHttpRequest();
var reset = new XMLHttpRequest();
var updateCareerXML = new XMLHttpRequest();

// USER
var getUser = new XMLHttpRequest();
var session,
    sessionUser,
    comcount,
    search,
    limited,
    verified,
    flagged,
    faction;
getUser.open("GET", "https://mobitracker.co/src/user.php");
getUser.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
getUser.setRequestHeader(tokenHeader.name,tokenHeader.content);
getUser.responseType = "json";
getUser.async = false;
getUser.send();
getUser.onload = function() {
  var userResponse = getUser.response;
  session = userResponse["session"];
  sessionUser = userResponse["sessionUser"];
  comcount = userResponse["comcount"];
  search = userResponse["search"];
  limited = userResponse["limited"];
  verified = userResponse["verified"];
  flagged = userResponse["flagged"];
  faction = userResponse["faction"];
  if(search.includes("/")){
    search = "";
  }
  //init Search
  if(search){
    if(search != "" && search != "undefined"){
      showPlayer(search);
    }else{
      document.title = "MobiTracker";
    }
  }else if(sessionUser){
    node.value = sessionUser;
    updateSearch(sessionUser);
    showPlayer(sessionUser);
  }
  //init Search
}

//Responsive UI
var iContainer = document.getElementById("iContainer");
iContainer.sibling = document.getElementById("sPContainer");
var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const cr = entry.contentRect;
    if(cr.width < 800){
      entry.target.style.margin = "0 8px";
      entry.target.sibling.style.margin = "0 8px";
    }else{
      entry.target.style.margin = "";
      entry.target.sibling.style.margin = "";
    }
  }
});
ro.observe(iContainer);

//Responsive UI

//USER
window.onpopstate = function(e){
    if(e.state.search != search && e.state.search != undefined && e.state.search != ""){
      search = e.state.search;
      if(search != ""){
        node.value = search;
      }else{
        document.title = "MobiTracker";
      }
      mtco();
    }else if(e.state.sC){
      search = "";
      searchCareer(e.state.sC);
    }
};
//PUSH Search
var pushSearch = new XMLHttpRequest();
function updateSearch(user){
  search = user;
  if (window.location.href.indexOf("beta") == -1) {
    pushSearch.open("GET", "vadw.php?search="+user);
    pushSearch.send();
  }
}
//PUSH Search

var mtLogo = document.getElementById("mtLogo");
mtLogo.onclick = function(){
  mtco();
}
var mtTitle = document.getElementById("mtTitle");
mtTitle.onclick = function(){
  mtco();
}

var usr = document.getElementsByClassName("loginName")[0];
usr.onclick = function(){clickUser(this.innerText)};

function hideHome(exem){
  header.style.padding = "0px 0px";
  if(!exem){
    containerHeader.style.display = "none";
  }
  //var moto = document.getElementById("moto");
  //moto.style.display = "none";

  var disclaimer = document.getElementsByClassName("disclaimer")[0];
  disclaimer.style.display = "none";

  section.style.display = "block";
  section.style.justifyContent = null;
  section.style.flexWrap = null;
}
function showHome(){
  header.style.padding = "0px 0px";
  containerHeader.display = "none";
  containerSection.style.display = "none";
  var scLogo = document.getElementsByClassName("sc-logo")[0];
  scLogo.style.display = "block";
  //var moto = document.getElementById("moto");
  //moto.style.display = "block";
  var disclaimer = document.getElementsByClassName("disclaimer")[0];
  disclaimer.style.display = "block";
  emptySearch();
}
function emptySearch(){
  node.value = "";
  reset.open("POST", "src/reset.php");
  reset.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  reset.send();
}
function flag(id,bool){
  flagID.open("POST", "src/report.php");
  flagID.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  flagID.setRequestHeader(tokenHeader.name,tokenHeader.content);
  flagID.send("id="+id+"&bool="+bool);
  flagID.onload = function() {
      player = flagID.response;
  }
}
var player;
function showPlayer(node, ns){
  hideHome();
  hideSB();
  clearSB();
  dataCount = 0;
  request.open("GET", "src/api.php"+"?username="+node+"&v="+ext);
  if(ext == "live"){
    ext = "auto";
  }
  request.setRequestHeader(tokenHeader.name,tokenHeader.content);
  request.responseType = "json";
  request.send();
  request.onload = function() {
      if(player != request.response){
        player = request.response;
        dataCount = Object.keys(player["data"]).length;
        populateHeader(player);
        if(dataCount>0){
          showComment(node);
        }
      }
  }
}
var comment;
function showComment(node){
  if(section.children.length > 0){
    clearBox(section);
  }
  section.style.display = "block";
  commentCount = 0;
  var queryString = "?username=" + node;
  readComments.open("GET", "src/comments.php" + queryString);
  readComments.setRequestHeader(tokenHeader.name,tokenHeader.content);
  readComments.send();
  readComments.onreadystatechange = function(){
    if(readComments.readyState == 4){
      if(comment != JSON.parse(readComments.response)){
        comment = JSON.parse(readComments.response);
        commentCount = Object.keys(comment).length;
        showReview(comment);
      }
    }
  }
}
function clickUser(userID){
  if(userID != ""){
    document.title = userID+" - MobiTracker";
    node.value = userID;
  }else{
    document.title = "MobiTracker";
  }
  mtco();
  updateSearch(userID);
}
function deleteComment(commentID){
  if(verified == 0){
    comcount--;
  }
  deleteComments.open("POST", "src/delete.php");
  deleteComments.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  deleteComments.setRequestHeader(tokenHeader.name,tokenHeader.content);
  deleteComments.send("id="+commentID.id);
  deleteComments.onload = function(){
    var response = deleteComments.response;
    mtco();
  };
}
function updateComment(id,  newRating, newComment){
  newRating++;
  editComments.open("POST", "src/update.php");
  editComments.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  editComments.setRequestHeader(tokenHeader.name,tokenHeader.content);
  editComments.send("id="+id+"&rating="+newRating+"&comment="+escape(newComment));
  mtco();
}
function sendComment(string){
  if(verified == 0){
    comcount++;
  }
  writeComments.open("POST","src/create.php");
  writeComments.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  writeComments.setRequestHeader(tokenHeader.name,tokenHeader.content);
  writeComments.send(string);
  writeComments.onload = function(){
    var response = writeComments.response;
    mtco();
  }
}
function updateCareer(int){
  updateCareerXML.open("POST","src/career.php");
  updateCareerXML.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  updateCareerXML.setRequestHeader(tokenHeader.name,tokenHeader.content);
  updateCareerXML.send("username="+sessionUser+"&career="+int);
}
node.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    mtco();
  }
});
function mtco(ns){
  if(!ns){
    ns="";
  }
  headerHeight = 0;
  clearBox(header);
  clearBox(section);
  hideHome();
  hideSB();
  if(node.value == "" || node.value.includes("/")){
    showHome();
  }else{
    node.value = node.value.replace(/\s/g,"");
    showPlayer(node.value, ns);
  }
};

function pages(p, m, v, ele){
  var pageContainer = document.getElementsByClassName("pageContainer");
  if(ele.classList.contains("container-header")){
    var x = 0;
  }else if(ele.classList.contains("container-section")){
    var x = 2
  }
  var xx = x+2;
  //Page, Max, Version
  if(!v){
    v=0;
  }
  for(x; x<xx; x++){
    pageContainer[x].innerHTML = "";
    pageContainer[x].style.display = "flex";
    var prePages = document.createElement("a");
    prePages.className = "page linkme";
    prePages.innerHTML = "&#9668;";
    var postPages = document.createElement("a");
    postPages.className = "page linkme";
    postPages.innerHTML = "&#9658;";
    var ellisis = document.createElement("p");
    ellisis.className = "linkme ellisis";
    ellisis.innerText = "...";
    var sPages = document.createElement("a");
    sPages.className = "page linkme notcurrent";
    var pageCount = document.createElement("a");
    pageCount.style.padding = "8px 4px";
    pageCount.style.fontSize = "12px";
    pageCount.classList.add("rDisabled");
    pageCount.innerText = m+" Pages";

    var t = p;
    if(p>1){
      t=p-1;
      prePages.id = p-1;
      pageContainer[x].appendChild(prePages.cloneNode(true));
    }
    for(var i=t; i<(t+3) && i<=m; i++){
      if(p==i){
        sPages.className = "page linkme current";
      }else{
        sPages.className = "page linkme notcurrent";
      }
      if(i==1 && p==1){
        sPages.style.marginLeft = "25.5px";
      }else{
        sPages.style.marginLeft = "0px";
      }
      sPages.innerText = i;
      sPages.id = i;
      pageContainer[x].appendChild(sPages.cloneNode(true));
    }
    if(p<m){
      postPages.id = p+1;
      pageContainer[x].appendChild(postPages.cloneNode(true));
    }
    if(m>3){
      pageContainer[x].appendChild(pageCount);
      if(p==m){
        pageCount.style.marginLeft = "44px";
      }
    }
    var page = document.getElementsByClassName("page");
    for(var i=0;i<page.length;i++){
      if(v == 0){
        page[i].onclick = function(){
          sC[7] = parseInt(this.id);
          searchCareer(sC);
        };
      }else{
        page[i].onclick = function(){
          sC[7] = parseInt(this.id);
          searchCareer(sC);
        };
      }
    }
  }
}

//search By
var boolsbc = false;
var boolsbr = false;
var headerHeight;

function searchCareer(sc){
  if(window.location.href.indexOf("beta") == -1){
    history.pushState({sC:sC}, "", "/");
  }
  clearBox(header);
  headerHeight = 0;
  clearBox(section);
  hideHome(true);
  emptySearch();
  header.style.display = "grid";
  header.style.justifyContent = "flex-start";
  if(sc[0] || sc[1] || sc[2] || sc[3] || sc[4] || sc[5]){
    var queryString = "?c="+sc[0]+"&e="+sc[1]+"&x="+sc[2]+"&m="+sc[3]+"&p="+sc[4]+"&t="+sc[5]+"&r="+sc[6];
  }else if (sC[6] == -1) {
    var queryString = "?c="+sc[0]+"&e="+sc[1]+"&x="+sc[2]+"&m="+sc[3]+"&p="+sc[4]+"&t="+sc[5]+"&r="+sc[6];
  }else{
    var queryString = "?c=0&e=0&x=0&m=0&p=0&t=0&r="+sc[6];
  }
  searchCareers.open("GET", "src/searchBy.php" + queryString+"&page="+sC[7]);
  searchCareers.setRequestHeader(tokenHeader.name,tokenHeader.content);
  searchCareers.send();
  searchCareers.onreadystatechange = function(){
    if(searchCareers.readyState == 4){
      var searched = JSON.parse(searchCareers.response);
      pages(sC[7], searched.pages, 0, containerHeader);
      delete searched.pages;
      sCount = Object.keys(searched).length;
      uSearch(searched);
    }
  }
}

function showSBC(){
  if(boolsbr == true){
    hideSB();
  }
  if(boolsbc == false){
    var sbcImg = document.getElementsByClassName("sbc-content")[0];
    var sbcContainer = document.getElementsByClassName("search-param-container")[0];
    var tooltip = document.createElement("span");
    sbcImg.appendChild(tooltip);

    sbcImg.style.display = "flex";
    sbcContainer.style.height = "57px";
    sbcContainer.children[0].style.color = "FFFFFF";

    sbcContainer.onclick = function(e){
      sC[7] = 1;
      if(e.target == this.children[0].children[1].children[0]){
        e.target.classList.toggle("notSelected");
        if(sC[0] == 0){
          sC[0] = 1;
        }else{
          sC[0] = 0;
        }
      }else if (e.target == this.children[0].children[1].children[1]) {
        e.target.classList.toggle("notSelected");
        if(sC[1] == 0){
          sC[1] = 1;
        }else{
          sC[1] = 0;
        }
      }else if (e.target == this.children[0].children[1].children[2]) {
        e.target.classList.toggle("notSelected");
        if(sC[2] == 0){
          sC[2] = 1;
        }else{
          sC[2] = 0;
        }
      }else if (e.target == this.children[0].children[1].children[3]) {
        e.target.classList.toggle("notSelected");
        if(sC[3] == 0){
          sC[3] = 1;
        }else{
          sC[3] = 0;
        }
      }else if (e.target == this.children[0].children[1].children[4]) {
        e.target.classList.toggle("notSelected");
        if(sC[4] == 0){
          sC[4] = 1;
        }else{
          sC[4] = 0;
        }
      }else if (e.target == this.children[0].children[1].children[5]) {
        e.target.classList.toggle("notSelected");
        if(sC[5] == 0){
          sC[5] = 1;
        }else{
          sC[5] = 0;
        }
      }
      searchCareer(sC);
      sbcContainer.onmouseover = function(e){
        var target = e.target;
        var mouse = e;
        e = this.children[0].children[1].children;
        for (var i = 0; i < e.length-1; i++) {
          if(e[i] == target){
            tooltip.textContent = careersText[i];
            tooltip.style.visibility = "visible";
            tooltip.style.top = (e[i].offsetHeight+6)+"px";
            switch(i){
              case 0:
                tooltip.style.left = -63+"px";
                break;
              case 1:
                tooltip.style.left = -37+"px";
                break;
              case 2:
                tooltip.style.left = -13+"px";
                break;
              case 3:
                tooltip.style.left = 28+"px";
                break;
              case 4:
                tooltip.style.left = 60+"px";
                break;
              case 5:
                tooltip.style.left = 90+"px";
            }
          }
        }
      };
      sbcContainer.onmouseout = function(e){
        tooltip.textContent = "";
        tooltip.style.visibility = "hidden";
      };
    };
    boolsbc = true;
  }else{
    hideSB();
  }

}
function showSBR(){
  if(boolsbc == true){
    hideSB();
  }
  if(boolsbr == false){
    var sbcImg = document.getElementsByClassName("sbr-content")[0];
    var sbcContainer = document.getElementsByClassName("search-param-container")[0];
    sbcImg.style.display = "flex";
    sbcContainer.style.height = "57px";
    sbcContainer.children[1].style.color = "FFFFFF";

    sbcContainer.onclick = function(e){
      if(e.target == this.children[1].children[1].children[0] || e.target == this.children[1].children[1].children[1] || e.target == this.children[1].children[1].children[2] || e.target == this.children[1].children[1].children[3] || e.target == this.children[1].children[1].children[4] || e.target == this.children[1].children[1].children[5]){
        for(var y = 0; y<this.children[1].children[1].childElementCount; y++){
          this.children[1].children[1].children[y].className = "player-min-name notSelected";
        }
        sC[7] = 1;
      }
      if(e.target == this.children[1].children[1].children[0]){
        if(sC[6] == -1){
          e.target.className = "player-min-name";
          sC[6] = 0;
          searchCareer(sC);
        }else{
          if(sC[6] == 0){
            sC[6] = -1;
            e.target.className = "player-min-name notSelected";
          }else{
            sC[6] = 0;
            e.target.className = "player-min-name";
          }
          if(sC[0] || sC[1] || sC[2] || sC[3] || sC[4] || sC[5] || sC[6] > -1){
            searchCareer(sC);
          }
        }
      }else if (e.target == this.children[1].children[1].children[1]) {
        if(sC[6] == -1){
          e.target.className = "player-min-name";
          sC[6] = 1;
          searchCareer(sC);
        }else{
          if(sC[6] == 1){
            sC[6] = -1;
            e.target.className = "player-min-name notSelected";
          }else{
            sC[6] = 1;
            e.target.className = "player-min-name";
          }
          if(sC[0] || sC[1] || sC[2] || sC[3] || sC[4] || sC[5] || sC[6] > -1){
            searchCareer(sC);
          }
        }
      }else if (e.target == this.children[1].children[1].children[2]) {
        if(sC[6] == -1){
          e.target.className = "player-min-name";
          sC[6] = 2;
          searchCareer(sC);
        }else{
          if(sC[6] == 2){
            sC[6] = -1;
            e.target.className = "player-min-name notSelected";
          }else{
            sC[6] = 2;
            e.target.className = "player-min-name";
          }
          if(sC[0] || sC[1] || sC[2] || sC[3] || sC[4] || sC[5] || sC[6] > -1){
            searchCareer(sC);
          }
        }
      }else if (e.target == this.children[1].children[1].children[3]) {
        if(sC[6] == -1){
          e.target.className = "player-min-name";
          sC[6] = 3;
          searchCareer(sC);
        }else{
          if(sC[6] == 3){
            sC[6] = -1;
            e.target.className = "player-min-name notSelected";
          }else{
            sC[6] = 3;
            e.target.className = "player-min-name";
          }
          if(sC[0] || sC[1] || sC[2] || sC[3] || sC[4] || sC[5] || sC[6] > -1){
            searchCareer(sC);
          }
        }
      }else if (e.target == this.children[1].children[1].children[4]) {
        if(sC[6] == -1){
          e.target.className = "player-min-name";
          sC[6] = 4;
          searchCareer(sC);
        }else{
          if(sC[6] == 4){
            sC[6] = -1;
            e.target.className = "player-min-name notSelected";
          }else{
            sC[6] = 4;
            e.target.className = "player-min-name";
          }
          if(sC[0] || sC[1] || sC[2] || sC[3] || sC[4] || sC[5] || sC[6] > -1){
            searchCareer(sC);
          }
        }
      }else if (e.target == this.children[1].children[1].children[5]) {
        if(sC[6] == -1){
          e.target.className = "player-min-name";
          sC[6] = 5;
          searchCareer(sC);
        }else{
          if(sC[6] == 5){
            sC[6] = -1;
            e.target.className = "player-min-name notSelected";
          }else{
            sC[6] = 5;
            e.target.className = "player-min-name";
          }
          if(sC[0] || sC[1] || sC[2] || sC[3] || sC[4] || sC[5] || sC[6] > -1){
            searchCareer(sC);
          }
        }
      }
    };
    boolsbr = true;
  }else{
    hideSB();
  }

}
function hideSB(){
  var sbc = document.getElementsByClassName("sbc-content")[0];
  var sbr = document.getElementsByClassName("sbr-content")[0];
  var sbcContainer = document.getElementsByClassName("search-param-container")[0];
  sbc.style.display = "none";
  sbr.style.display = "none";
  sbcContainer.style.height = null;
  sbcContainer.children[0].style.color = "C4D7E6";
  sbcContainer.children[1].style.color = "C4D7E6";
  //Reset selected
  resetsbc = document.getElementsByClassName("sbc-img");
  resetsbr = document.getElementsByClassName("sbr-content")[0];
  //Reset END
  boolsbc= false;
  boolsbr = false;
}
function clearSB(){
  for(var n=0; n<resetsbr.childElementCount; n++){
    resetsbr.children[n].className = "player-min-name notSelected";
  }
  for(var n=0; n<resetsbc.length; n++){
    resetsbc[n].className = "sbc-img notSelected";
  }
  sC = [0,0,0,0,0,0,-1];
}
//search By END
function clearBox(elementID){
  if(headerHeight && elementID == header){
    header.style.height = headerHeight+"px";
    elementID.innerHTML = "";
  }else{
    elementID.innerHTML = "";
  }
  var pageContainers = document.getElementsByClassName("pageContainer");
  for(var pc = 0; pc<pageContainers.length; pc++){
    pageContainers[pc].innerHTML = "";
  }
  elementID.style.padding = "";
  elementID.style.border = "";
  elementID.style.marginTop = "";
}

function populateHeader(jsonObj) {
  if(dataCount > 0){
    header.style.padding = "8px 16px";
    containerHeader.style.display = "block";
    header.style.display = "flex";
  }else{
    containerHeader.style.display = "block";
    containerSection.style.display = "none";
    header.style.padding = "8px 16px";
    var notFound = document.createElement("p");
    notFound.className = "notFound";
    notFound.textContent = "Citizen Not Found";
    header.appendChild(notFound);
    document.title = "Citizen Not Found - MobiTracker";
  }
  updateSearch(jsonObj['data']['profile']['handle']);
  document.title = jsonObj['data']['profile']['handle']+" - MobiTracker";
  var exists = document.getElementsByClassName("manageEdit commentSubmit")[0];
  if(exists){
    commented = 1;
  }else{
    commented = 0;
  }
  //Copy url
  if(dataCount > 0){
    copyUrlTT = document.createElement("span");
    copyUrlTT.className = "copyURL refresh copyToolTip";
    copyUrlTT.innerHTML = "Profile Url Copied!";
    copyUrl = document.createElement("img");
    copyUrl.className = "copyURL refresh";
    copyUrl.src = "src/copy.png";
    copyUrl.onclick = function(){
      copyUrlTT.style.display = "block";
      var copy = document.createElement("input");
      copy.value = "https://www.mobitracker.co/"+node.value;
      document.body.appendChild(copy);
      copy.select();
      document.execCommand("copy");
      document.body.removeChild(copy);
      setTimeout(function () {
        copyUrlTT.style.display = "none";
      }, 1000);
    };
    header.appendChild(copyUrlTT);
    header.appendChild(copyUrl);
  }
  //Copy url END
  //Refresh
  forceRefresh = document.createElement("img");
  forceRefresh.className = "refresh";
  forceRefresh.src = "src/refresh.png";
  forceRefresh.onclick = function(){
    ext = "live";
    clearBox(header);
    clearBox(section);
    showPlayer(node.value);
  };
  header.appendChild(forceRefresh);
  //Refresh END
  //Player ID
  var playerid = document.createElement("p");
  playerid.className = "playerid";
  playerid.textContent = "Citizen "+jsonObj["data"]["profile"]["id"];
  header.appendChild(playerid);
  //Player ID END

  //Player Avatar
  var playeravatar = document.createElement("img");
  playeravatar.className = "playeravatar";
  playeravatar.src = jsonObj["data"]["profile"]["image"];
  playeravatar.onerror = function(){
    this.src = "src/avatars/avatar_default.jpg";
  }
  header.appendChild(playeravatar);
  //Player Avatar END


  //Player Handle
  var playerinfo = document.createElement("p");
  var handleLink = document.createElement("a");
  var playerPanel = document.createElement("div");

  handleLink.className = "panelLink";
  playerinfo.className = "playerinfo";
  playerPanel.className = "ptitle";

  playerinfo.textContent = jsonObj["data"]["profile"]["handle"];

  handleLink.href = jsonObj["data"]["profile"]["page"]["url"];
  handleLink.target = "_blank";

  handleLink.appendChild(playerinfo);
  playerPanel.appendChild(handleLink);
  header.appendChild(playerPanel);
  //Player Handle END

  //Player Badge
  var playerbadge = document.createElement("img");
  var playertitle = document.createElement("p");
  var ptitle = document.createElement("div");
  ptitle.className = "ptitle";

  playertitle.className = "playertitle";
  playertitle.textContent = jsonObj["data"]["profile"]["badge"];

  playerbadge.className = "playerbadge";
  playerbadge.src = jsonObj["data"]["profile"]["badge_image"];

  header.appendChild(ptitle);
  ptitle.appendChild(playerbadge);
  ptitle.appendChild(playertitle);
  //Player Badge END

  //Rating Container
  var ratingContainer = document.createElement("div");
  ratingContainer.className  = "ptitle";
  var showCount = document.createElement("p");
  showCount.className = "ratingCount";
  var queryString = "?username=" + node.value;
  readRating.open("GET", "src/rating.php" + queryString, true);
  readRating.setRequestHeader(tokenHeader.name,tokenHeader.content);
  readRating.send();
  readRating.onreadystatechange = function(){
    if(readRating.readyState == 4){
      var ratings = JSON.parse(readRating.response);
      ratingCount = ratings["reviewed_count"];
      if(ratingCount > 0){
        showCount.textContent = "Vouchers: +"+ratingCount;
      }else{
        showCount.textContent = "Vouchers: "+ratingCount;
      }
      ratingContainer.appendChild(showCount);
    }
  }
  header.appendChild(ratingContainer);
  //Rating Container END

  //Player Org
  var orgLogo = document.createElement("img");
  var orgName = document.createElement("p");
  var orgLink = document.createElement("a");
  var orgPanel = document.createElement("div");
  orgPanel.className = "ptitle";
  orgLink.className = "panelLink";

  orgLogo.className = "orgLogo";
  orgLogo.src = jsonObj["data"]["organization"]["image"];


  orgName.className = "orgName";
  orgName.textContent = jsonObj["data"]["organization"]["name"];

  orgLink.href = orgURL+jsonObj["data"]["organization"]["sid"];
  orgLink.target = "_blank";

  header.appendChild(orgPanel);

  orgLink.appendChild(orgName);
  orgPanel.appendChild(orgLogo);
  orgPanel.appendChild(orgLink);

  if(!jsonObj["data"]["organization"]["image"]){
    clearBox(orgPanel);
  }
  //Player Org END

  //Tag
  var selectedCareer = [];
  var tagContainer = document.createElement("div");
  tagContainer.className  = "ptitle tooltip";
  var tooltiptext = document.createElement("span");
  tooltiptext.className = "tooltiptext";
  var tags = document.createElement("img");
  tags.className = "careers";
  var tooltip = document.createElement("span");
  tooltip.className = "tooltiptext";
  var queryString = "?username=" + node.value;
  readCareers.open("GET", "src/rating.php" + queryString, true);
  readCareers.setRequestHeader(tokenHeader.name,tokenHeader.content);
  readCareers.send();
  readCareers.onreadystatechange = function(){
    if(readCareers.readyState == 4){
      var careersvar = JSON.parse(readCareers.response);
      if(!careersvar){
        selectedCareer = [0,0,0,0,0,0];
      }else{
        selectedCareer = [careersvar["crew"],careersvar["escort"],careersvar["explorer"],careersvar["miner"],careersvar["pirate"],careersvar["trader"]];
      }
      for(var x = 0; x<selectedCareer.length; x++){
        tags.title = careersText[x];
        if(selectedCareer[x] == 1){
          tags.className = "careers";
          tags.src = careers[x];
          tagContainer.appendChild(tags.cloneNode(true));
        }else{
          tags.className = "careers notSelected";
          tags.src = careers[x];
          tagContainer.appendChild(tags.cloneNode(true));
        }
      }
      tagContainer.onmouseover = function(e){
        tooltip.innerText = e.target.title;
        if(e.target == this.children[1]){
          tooltip.style.left = "-22px";
          tooltip.style.right = "";
        }else if (e.target == this.children[2]) {
          tooltip.style.left = "17px";
          tooltip.style.right = "";
        }else if (e.target == this.children[3]) {
          tooltip.style.left = "58px";
          tooltip.style.right = "";
        }else if (e.target == this.children[4]) {
          tooltip.style.right = "58px";
          tooltip.style.left = "";
        }else if (e.target == this.children[5]) {
          tooltip.style.right = "17px";
          tooltip.style.left = "";
        }else if (e.target == this.children[6]) {
          tooltip.style.right = "-22px";
          tooltip.style.left = "";
        }
      };
      tagContainer.onmouseout = function(e){
      //  tooltip.textContent = "";
      //  tooltip.style.visibility = "hidden";
      };
      if(session && sessionUser == node.value){
        tagContainer.onclick = function(e){
          if(e.target == this.children[1]){
            updateCareer(0);
            e.target.classList.toggle("notSelected");
            tooltip.style.left = "-22px";
          }else if (e.target == this.children[2]) {
            updateCareer(1);
            e.target.classList.toggle("notSelected");
            tooltip.style.left = "17px";
          }else if (e.target == this.children[3]) {
            updateCareer(2);
            e.target.classList.toggle("notSelected");
            tooltip.style.left = "58px";
          }else if (e.target == this.children[4]) {
            updateCareer(3);
            e.target.classList.toggle("notSelected");
            tooltip.style.right = "58px";
          }else if (e.target == this.children[5]) {
            updateCareer(4);
            e.target.classList.toggle("notSelected");
            tooltip.style.right = "17px";
          }else if (e.target == this.children[6]) {
            updateCareer(5);
            e.target.classList.toggle("notSelected");
            tooltip.style.right = "-22px";
          }
        };
      }
    }
  }
  tagContainer.appendChild(tooltip);
  header.appendChild(tagContainer);
  //Tag END
  //Player Bio
  var playerbio = document.createElement("p");
  playerbio.className = "playerbio";
  if(jsonObj["data"]["profile"]["bio"]){
    playerbio.textContent = "Bio:"+ newline + jsonObj["data"]["profile"]["bio"];
  }else{
    playerbio.textContent = "Bio:"+newline+"N/A";
  }
  header.appendChild(playerbio);
  //Player Bio END

  //Add Comment
  if(session && sessionUser !== node.value){
    createErr.className = "createErr";
    createErr.textContent = "";
    createButton.className = "commentButton";
    createButton.textContent = "Leave a Review";
    createButton.style.marginTop = "15px";
    header.style.paddingBottom = "18px";
    var editImg = document.createElement("img");
    createButton.onclick = function() {
      if(session && commented == 0 && comcount != 3){
        var createCommentContainer = document.createElement("div");
        createCommentContainer.className = "cCommentContainer";
        header.removeChild(header.lastChild);

        var createComment = document.createElement("textarea");
        createComment.maxLength = 600;
        var newCommentContainer = document.createElement("div");
        var createCommentSubmit = document.createElement("input");
        var cancelNew = document.createElement("button");
        var charCount = document.createElement("p");
        charCount.className = "charCounter";
        charCount.textContent = createComment.textLength+"/600";

        cancelNew.innerHTML = "Cancel";

        createCommentSubmit.type = "submit";
        createCommentSubmit.value = "Submit";

        var prevLen = 0;
        createComment.oninput = function(){
          var len = this.textLength;
          if(len !== prevLen){
            prevLen = len;
            charCount.textContent = len+"/600";
          }
        };

        newCommentContainer.className = "manageComment";
        cancelNew.className = "commentSubmit";
        createComment.className = "createComment";
        createCommentSubmit.className = "commentSubmit";

        cancelNew.onclick = function(){
          header.removeChild(header.lastChild);
          header.appendChild(createButton);
          createErr.textContent = "";
          document.getElementsByClassName("manageEdit")[0].style.display = "block";
        };

        if(verified == 0){
          createErr.textContent = "Unverified accounts are limited to 3 reviews. "+comcount+"/3";
        }
        createComment.name = "comment";

        header.style.paddingBottom = "10px";

        createCommentContainer.appendChild(createComment);
        createCommentContainer.appendChild(newCommentContainer);
        newCommentContainer.appendChild(charCount);
        newCommentContainer.appendChild(cancelNew);
        newCommentContainer.appendChild(createCommentSubmit);
        header.appendChild(createCommentContainer);

        createCommentSubmit.addEventListener("click", function(){
          selected++;
          var writeString = "u_player="+sessionUser+"&r_player="+jsonObj["data"]["profile"]["handle"]+"&avi="+jsonObj["data"]["profile"]["image"]+"&rating="+selected+"&comment="+createComment.value;
          sendComment(writeString);
          selected = -1;
        });
      }else if(session && commented == 0 && comcount == 3){
        createErr.textContent = "Unverified accounts are limited to 3 reviews. "+comcount+"/3";
      }
    };
    header.appendChild(createErr);
    header.appendChild(createButton);
  }
  //Add Comment END
}
function showReview(comment) {
  if(commentCount > 0){
    containerSection.style.display = "block";

  }else if (session == 1 && commentCount == 0 && dataCount > 0) {
    var firstContainer = document.createElement("div");
    var notFound = document.createElement("p");
    firstContainer.className = "firstContainer";
    notFound.className = "notFound";
    notFound.textContent = "Be the first to leave this user a review.";
    firstContainer.appendChild(notFound);
    containerSection.style.display = "block";
    section.appendChild(firstContainer);
  }else if(session == 0 && commentCount == 0 && dataCount > 0){
    var firstContainer = document.createElement("div");
    var notFound = document.createElement("p");
    var signup = document.createElement("a");
    firstContainer.className = "firstContainer";
    signup.className = "login_btn";
    signup.innerHTML = "Sign up";
    signup.href = "register";
    notFound.className = "notFound";
    notFound.textContent = "Be the first to leave this user a review.";
    firstContainer.appendChild(notFound);
    firstContainer.appendChild(signup);
    containerSection.style.display = "block";
    section.appendChild(firstContainer);
  }
  for(var i = 0; i<commentCount; i++){
    if(session){
      editing = 0;
      //Creator Container
      var playerReview = document.createElement("div");
      playerReview.className = "player-review";
      var playerminContainer = document.createElement("div");
      playerminContainer.className = "player-min-container";
      playerReview.appendChild(playerminContainer);

      var playerMin = document.createElement("div");
      playerMin.className = "player-min";
      playerminContainer.appendChild(playerMin);

      var playerminAvatar = document.createElement("img");
      playerminAvatar.className = "player-min-avatar";
      playerminAvatar.src = comment[i]["avatar"];
      playerminAvatar.onerror = function(){
        this.src = "https://mobitracker.co/src/avatars/avatar_default.jpg";
      }
      playerMin.appendChild(playerminAvatar);

      var playerminName = document.createElement("a");
      playerminName.className = "player-min-name";
      playerminName.href = "https://mobitracker.co/"+comment[i]["u_creator"];
      var playerUsername = document.createElement("p");
      var playerVerify = document.createElement("img");
      playerVerify.src = "src/verified.png";
      playerVerify.className = "verified";
      playerUsername.className = "player-username";
      playerUsername.id = comment[i]["u_creator"];
      if(comment[i]["verify"] == 1){
        playerminName.appendChild(playerVerify);
      }
      playerUsername.innerHTML = comment[i]["u_creator"];
      playerminName.appendChild(playerUsername);
      playerMin.appendChild(playerminName);
      //Creator Container END
      //Rating Container
      var ratingContainer = document.createElement("div");
      ratingContainer.className  = "rating-container";
      var rating = comment[i]["rating"];
      var e = 0;
      var ratingStar = document.createElement("img");
      ratingContainer.id = rating;
      ratingStar.className = "rating";
      ratingStar.src = "src/star.png";

      for(e=0; e<5 ; e++){
        if(e==rating){
          ratingStar.src="src/star-empty.png";
          ratingContainer.appendChild(ratingStar.cloneNode(true));
        }else{
          ratingContainer.appendChild(ratingStar.cloneNode(true));
        }
      }
      //Rating Container END
      //Comment
      var creatorComment = document.createElement("p");
      var commentContainer = document.createElement("div");
      creatorComment.className = "comment";
      creatorComment.innerHTML = comment[i]["comment"];
      if(session && sessionUser == comment[i]["u_creator"]){
        creatorComment.id = comment[i]["id"];
      }
      commentContainer.className = "commentContainer";
      commentContainer.appendChild(ratingContainer);
      commentContainer.append(creatorComment);
      playerReview.id = creatorComment.innerHTML;
      playerminContainer.appendChild(commentContainer);
      //Comment END
      //Manage
      manageComment = document.createElement("div");
      manageComment.className = "manageComment";
      if(comment[i]["u_creator"] != sessionUser){
        var flagComment = document.createElement("button");
        flagComment.className = "manageEdit commentSubmit flag";
        flagComment.id = comment[i]["id"];
        if(flagged.includes(comment[i]["id"])){
          flagComment.innerHTML = "Unreport";
        }else{
          flagComment.innerHTML = "Report";
        }
        flagComment.onclick = function(){
          if(flagged.includes(this.id)){
            flag(this.id,0);
            this.innerHTML = "Report";
            flagged = flagged.replace(this.id,"");
          }else{
            flag(this.id,1);
            this.innerHTML = "Unreport";
            flagged = flagged+this.id;
          }
        };
      }
      //Manage END
      //Manage Comment
      if(sessionUser == comment[i]["u_creator"]){
        commented = 1
        createButton.onclick = function(){
          createErr.textContent = "Error: You've already left a review of this Citizen. \n If you wish to change your review please edit it using the edit button";
          setTimeout(function () {
            createErr.textContent = "";
          }, 5000);
        };
        manageComment = document.createElement("div");
        manageComment.className = "manageComment";

        var editComment = document.createElement("button");
        editComment.className = "manageEdit commentSubmit";
        editComment.id = "Edit";
        editComment.innerHTML = "Edit";
        editComment.onclick = function(){
          if(editing == 0){
            editing = 1;
            var editContainer = document.createElement("div");
            editContainer.className = "createCommentContainer";
            var manageEditContainer = document.createElement("div");
            manageEditContainer.className = "manageComment";
            var editBox = document.createElement("textarea");
            var editSubmit = document.createElement("button");
            var editCancel = document.createElement("button");
            var editorCount = document.createElement("p");
            editorCount.className = "charCounter";

            editBox.className = "createComment editComment";
            editBox.maxLength = 600;

            var prevLen = 0;
            editCancel.onclick = function(){
              editing = 0;
              this.parentElement.parentElement.parentElement.children[0].style.display = "flex";
              this.parentElement.parentElement.parentElement.children[1].style.display = "block";
              this.parentElement.parentElement.parentElement.children[4].style.display = "flex";
              this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement.children[2]);
              this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement.children[2]);
            };
            editBox.oninput = function(){
              var len = this.textLength;
              if(len !== prevLen){
                prevLen = len;
                editorCount.textContent = len+"/600";
              }
            };

            editBox.innerHTML = this.parentElement.parentElement.children[1].innerText;
            editorCount.textContent = editBox.textLength+"/600";
            editCancel.className = "manageEdit commentSubmit";
            editCancel.innerHTML = "Cancel"
            editSubmit.className = "editSubmit commentSubmit";
            editSubmit.innerHTML = "Submit";
            editSubmit.id = this.parentElement.parentElement.children[1].id;
            editContainer.appendChild(editBox);
            editContainer.appendChild(manageEditContainer);
            manageEditContainer.appendChild(editorCount);
            manageEditContainer.appendChild(editCancel);
            manageEditContainer.appendChild(editSubmit);

            selected = this.parentElement.parentElement.children[0].id;
            this.parentElement.parentElement.children[0].style.display = "none";
            this.parentElement.parentElement.children[1].style.display = "none";
            this.parentElement.parentElement.children[2].style.display = "none";
            this.parentElement.parentElement.insertBefore(editContainer, this.parentElement.parentElement.children[2]);
            //Rating
            var oldRating = selected--;

            var editRatingContainer = document.createElement("div");
            editRatingContainer.className  = "rating-container";
            var ratingStar = document.createElement("img");
            ratingStar.src = "src/star.png";
            for(var i = 0;i<5;i++){
              ratingStar.id = "edit"+i;
              ratingStar.className = "rating star"+i;
              if(i==oldRating){
                ratingStar.src="src/star-empty.png";
                editRatingContainer.appendChild(ratingStar.cloneNode(true));
              }else{
                editRatingContainer.appendChild(ratingStar.cloneNode(true));
              }
            }
            this.parentElement.parentElement.insertBefore(editRatingContainer, this.parentElement.parentElement.children[2]);
            var newStar0 = document.getElementById("edit0");
            var newStar1 = document.getElementById("edit1");
            var newStar2 = document.getElementById("edit2");
            var newStar3 = document.getElementById("edit3");
            var newStar4 = document.getElementById("edit4");



            newStar0.onmouseover = function(){
              newStar0.src = "src/star.png";
              if(selected == 0 || selected > 0){
                newStar0.onmouseout = "";
              }else{
                newStar0.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar0.onclick = function(){
              if(selected ==  0){
                selected = -1;
                newStar0.src = "src/star-empty.png";
              }else if(selected > 0 || selected < 0){
                newStar0.onmouseout = "";
                selected = 0;
                newStar1.src = "src/star-empty.png";
                newStar2.src = "src/star-empty.png";
                newStar3.src = "src/star-empty.png";
                newStar4.src = "src/star-empty.png";
              }else{
                newStar0.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar1.onmouseover = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              if(selected == 1 || selected > 1){
                newStar1.onmouseout = "";
              }else if(selected == 0){
                newStar1.onmouseout = function(){
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else{
                newStar1.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar1.onclick = function(){
              if(selected == 1){
                selected = -1;
                newStar0.src = "src/star-empty.png";
                newStar1.src = "src/star-empty.png";
              }else if(selected < 1){
                newStar1.onmouseout = "";
                selected = 1;
              }else if(selected > 1){
                selected = 1;
                newStar2.src = "src/star-empty.png";
                newStar3.src = "src/star-empty.png";
                newStar4.src = "src/star-empty.png";
              }else{
                newStar1.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar2.onmouseover = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              newStar2.src = "src/star.png";
              if(selected == 2 || selected > 2){
                newStar2.onmouseout = "";
              }else if(selected == 0){
                newStar2.onmouseout = function(){
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else if(selected == 1){
                newStar2.onmouseout = function(){
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else{
                newStar2.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar2.onclick = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              newStar2.src = "src/star.png";
              if(selected == 2){
                selected = -1;
                newStar0.src = "src/star-empty.png";
                newStar1.src = "src/star-empty.png";
                newStar2.src = "src/star-empty.png";
              }else if(selected < 2){
                selected = 2;
                newStar2.onmouseout = "";
              }else if(selected > 2){
                selected = 2;
                newStar3.src = "src/star-empty.png";
                newStar4.src = "src/star-empty.png";
              }else{
                newStar2.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar3.onmouseover = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              newStar2.src = "src/star.png";
              newStar3.src = "src/star.png";
              if(selected == 3 || selected > 3){
                newStar3.onmouseout = "";
              }else if(selected == 0){
                newStar3.onmouseout = function(){
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else if(selected == 1){
                newStar3.onmouseout = function(){
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else if(selected == 2){
                newStar3.onmouseout = function(){
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else{
                newStar3.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar3.onclick = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              newStar2.src = "src/star.png";
              newStar3.src = "src/star.png";
              if(selected == 3){
                selected = -1;
                newStar0.src = "src/star-empty.png";
                newStar1.src = "src/star-empty.png";
                newStar2.src = "src/star-empty.png";
                newStar3.src = "src/star-empty.png";
              }else if(selected < 3){
                selected = 3;
                newStar3.onmouseout = "";
              }else if(selected > 3){
                selected = 3;
                newStar4.src = "src/star-empty.png";
              }else{
                newStar3.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar4.onmouseover = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              newStar2.src = "src/star.png";
              newStar3.src = "src/star.png";
              newStar4.src = "src/star.png";
              if(selected == 4){
                newStar4.onmouseout = "";
              }else if(selected == 0){
                newStar4.onmouseout = function(){
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else if(selected == 1){
                newStar4.onmouseout = function(){
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else if(selected == 2){
                newStar4.onmouseout = function(){
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }else if(selected == 3){
                newStar4.onmouseout = function(){
                  newStar4.src = "src/star-empty.png";
                };
              }else{
                newStar4.onmouseout = function(){
                  newStar0.src = "src/star-empty.png";
                  newStar1.src = "src/star-empty.png";
                  newStar2.src = "src/star-empty.png";
                  newStar3.src = "src/star-empty.png";
                  newStar4.src = "src/star-empty.png";
                };
              }
            };
            newStar4.onclick = function(){
              newStar0.src = "src/star.png";
              newStar1.src = "src/star.png";
              newStar2.src = "src/star.png";
              newStar3.src = "src/star.png";
              newStar4.src = "src/star.png";
              if(selected == 4){
                selected == -1;
                newStar0.src = "src/star-empty.png";
                newStar1.src = "src/star-empty.png";
                newStar2.src = "src/star-empty.png";
                newStar3.src = "src/star-empty.png";
                newStar4.src = "src/star-empty.png";
              }else if(selected < 4){
                selected = 4;
                newStar0.onmouseout = "";
                newStar1.onmouseout = "";
                newStar2.onmouseout = "";
                newStar3.onmouseout = "";
                newStar4.onmouseout = "";
              }
          };
          //Rating END
          editSubmit.onclick = function(){
            updateComment(editSubmit.id, selected++, editBox.value);
          };
          document.getElementsByClassName("createErr")[0].textContent = "";

          }
        };
        if(comment[i]["u_creator"] != sessionUser){
          manageComment.appendChild(flagComment);
        }
        manageComment.appendChild(editComment);

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "manageEdit commentSubmit deleteBtn highlight-red";
        if(session && sessionUser == comment[i]["u_creator"]){
          deleteBtn.id = comment[i]["id"];
        }
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = function(){
          deleteComment(this);
        };
        manageComment.appendChild(deleteBtn);
        commentContainer.appendChild(manageComment);

      }else{
        commentContainer.appendChild(manageComment);
        manageComment.appendChild(flagComment);
      }
      //Manage Comment END
      //Creation
      var created_at = document.createElement("p");
      var t = comment[i]["created_at"].split(/[- :]/);
      var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
      created_at.className = "created_at";
      created_at.innerHTML = d.toLocaleString("en-US", {
          weekday: "short",
          month: "long",
          day: "2-digit",
          year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
      playerReview.appendChild(created_at);
      //Creation END
      section.appendChild(playerReview);
      if(comment[0]["u_creator"] == sessionUser){
        commented = 1;
      }else{
        commented = 0;
      }
    }else{
      //Creator Container
      var playerReview = document.createElement("div");
      playerReview.className = "player-review";
      var playerminContainer = document.createElement("div");
      playerminContainer.className = "player-min-container";
      playerReview.appendChild(playerminContainer);

      var playerMin = document.createElement("div");
      playerMin.className = "player-min";
      playerminContainer.appendChild(playerMin);

      var playerminAvatar = document.createElement("img");
      playerminAvatar.className = "player-min-avatar";
      playerminAvatar.src = comment[i]["avatar"];
      playerminAvatar.onerror = function(){
        this.src = "src/avatars/avatar_default.jpg";
      }
      playerMin.appendChild(playerminAvatar);

      var playerminName = document.createElement("a");
      playerminName.className = "player-min-name";
      playerminName.href = "https://mobitracker.co/"+comment[i]["u_creator"];
      var playerUsername = document.createElement("p");
      var playerVerify = document.createElement("img");
      playerVerify.src = "src/verified.png";
      playerVerify.className = "verified";
      playerUsername.className = "player-username";
      playerUsername.id = comment[i]["u_creator"];
      if(comment[i]["verify"] == 1){
        playerminName.appendChild(playerVerify);
      }
      playerUsername.innerHTML = comment[i]["u_creator"];
      playerminName.appendChild(playerUsername);
      playerMin.appendChild(playerminName);
      //Creator Container END

      //Rating Container
      var ratingContainer = document.createElement("div");
      ratingContainer.className  = "rating-container";
      var rating = comment[i]["rating"];
      var e = 0;
      var ratingStar = document.createElement("img");
      ratingStar.className = "rating";
      ratingStar.src = "src/star.png";
      playerminContainer.appendChild(ratingContainer);

      for(e=0; e<5 ; e++){
        if(e==rating){
          ratingStar.src="src/star-empty.png";
          ratingContainer.appendChild(ratingStar.cloneNode(true));
        }else{
          ratingContainer.appendChild(ratingStar.cloneNode(true));
        }
      }
      //Rating Container END
      //Comment
      var creatorComment = document.createElement("p");
      var commentContainer = document.createElement("div");
      creatorComment.className = "comment";
      creatorComment.innerHTML = comment[i]["comment"];
      commentContainer.className = "commentContainer";
      commentContainer.appendChild(ratingContainer);
      commentContainer.append(creatorComment);
      playerReview.id = creatorComment.innerHTML;
      playerminContainer.appendChild(commentContainer);
      //Comment END
      //Manage
      manageComment = document.createElement("div");
      manageComment.className = "manageComment";
      var flagComment = document.createElement("button");
      flagComment.className = "manageEdit commentSubmit flag";
      flagComment.id = comment[i]["id"];
      if(flagged.includes(comment[i]["id"])){
        flagComment.innerHTML = "Unreport";
      }else{
        flagComment.innerHTML = "Report";
      }
      flagComment.onclick = function(){
        if(flagged.includes(this.id)){
          flag(this.id,0);
          this.innerHTML = "Report";
          flagged = flagged.replace(this.id,"");
        }else{
          flag(this.id,1);
          this.innerHTML = "Unreport";
          flagged = flagged+this.id;
        }
      };
      manageComment.appendChild(flagComment);
      commentContainer.appendChild(manageComment);
      //Manage END
      //Creation
      var created_at = document.createElement("p");
      var t = comment[i]["created_at"].split(/[- :]/);
      var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
      created_at.className = "created_at";
      created_at.innerHTML = d.toLocaleString("en-US", {
          weekday: "short",
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      playerReview.appendChild(created_at);
      //Creation END
      section.appendChild(playerReview);
    }
  }
}
//Searched Users
function uSearch(searched){
  document.title = "MobiTracker";
  if(sCount > 0){
    containerHeader.style.display = "block";
    containerSection.style.display = "none";
    var pageContainer = document.createElement("pageContainer");
    pageContainer.id = "pageContainer";
    pageContainer.className = "pageContainer";
  }else{
    containerHeader.style.display = "block";
    var notFound = document.createElement("p");
    notFound.className = "notFound";
    notFound.textContent = "No users meet this criteria";
    header.appendChild(notFound);
  }
  for(var i = 0; i<sCount; i++){
    var sb = document.createElement("div");
    sb.className = "sbCont";
    var sba  = document.createElement("img");
    sba.className = "sba";
    sba.src = searched[i]["avatar"];
    sba.onerror = function(){
      this.src = "src/avatars/avatar_default.jpg";
    }
    sb.appendChild(sba);
    var sbName = document.createElement("a");
    sbName.className = "player-min-name";

    if(searched[i]["verify"] == 1){
      var sbVerified = document.createElement("img");
      sbVerified.className = "verified";
      sbVerified.src = "src/verified.png";
      sbName.appendChild(sbVerified);
    }

    var sbUsername = document.createElement("a");
    sbUsername.innerHTML = searched[i]["username"];
    sbUsername.id = searched[i]["username"];
    sbUsername.className = "sbu player-username";
    sbUsername.href = "https://mobitracker.co/"+searched[i]["username"];
    sbName.appendChild(sbUsername);
    sb.appendChild(sbName);

    //Im not sure why I put the same classname
    var sbr = document.createElement("div");
    sbr.className = "sbr";
    var sbrI = document.createElement("img");
    sbrI.className = "sbr";
    sbrI.src="src/star.png";
    var showsbrc = document.createElement("p");
    showsbrc.className = "sbrc";

    var sbRating = searched[i]["avgRating"];
    var sbRatingCount = searched[i]["reviewed_count"];
    if(sbRatingCount == 0){
      showsbrc.textContent = "No Reviews";
      showsbrc.style.paddingTop = "";
    }else{
      for(e=0; e<5 ; e++){
        if(e==sbRating){
          sbrI.src="src/star-empty.png";
          sbr.appendChild(sbrI.cloneNode(true));
        }else{
          sbr.appendChild(sbrI.cloneNode(true));
        }
      }
      showsbrc.textContent = "("+sbRatingCount+")";
    }
    sbr.appendChild(showsbrc);
    sb.appendChild(sbr);
    header.appendChild(sb);
    var sbrc = document.createElement("div");
    sbrc.className = "sbr";
    sbrcImg = document.createElement("img");
    sbrcImg.className = "sbr-careers notSelected";
    var tooltiptext = document.createElement("span");
    tooltiptext.className = "tooltiptext";
    var tags = document.createElement("img");
    tags.className = "careers";
    var tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.visibility = "hidden";
    sbrc.appendChild(tooltip);

    selectedCareer = [searched[i]["crew"],searched[i]["escort"],searched[i]["explorer"],searched[i]["miner"],searched[i]["pirate"],searched[i]["trader"]];
    for(var x = 0; x<selectedCareer.length; x++){
      if(selectedCareer[x] == 1){
        sbrcImg.className = "sbr-careers";
        sbrcImg.src = careers[x];
        sbrc.appendChild(sbrcImg.cloneNode(true));
      }else{
        sbrcImg.className = "sbr-careers notSelected";
        sbrcImg.src = careers[x];
        sbrc.appendChild(sbrcImg.cloneNode(true));
      }
    }
    sb.appendChild(sbrc);
  }
  header.style.removeProperty("height");
  headerHeight = header.offsetHeight;
}
//Searched Users END

// functions
var sbc = document.getElementsByClassName("sbc-btn")[0];
sbc.onclick = function(){showSBC()};
var sbr = document.getElementsByClassName("sbr-btn")[0];
sbr.onclick = function(){showSBR()};
