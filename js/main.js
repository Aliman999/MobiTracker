var header = document.querySelector("header");
var section = document.querySelector("section");
var body = document.getElementsByTagName("body");
var containerHeader = document.getElementsByClassName("container-header")[0];
var containerSection = document.getElementsByClassName("container-section")[0];
var tokenHeader = document.getElementsByName("token")[0];
var createErr = document.createElement("p");
var createButton = document.createElement("button");
var newline = "\r\n";
var node = document.getElementsByClassName("userInput")[0];
var commentCount;
var dataCount;
var bioExist;
var player = null;
var editing = 0;
var commented = 0;
var check = 0;
var sC = [0,0,0,0,0,0,-1,1];
var ext = "auto";
var careers = ["src/crew.png","src/escort.png","src/explorer.png","src/miner.png","src/pirate.png","src/trader.png"];
var careersText = ["Crew","Escort","Explorer","Miner","Pirate","Trader"];
var orgURL = "https://robertsspaceindustries.com/orgs/";
var active;

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
getUser.open("GET", "src/user.php");
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
  if (node.value) {
    updateSearch(node.value);
    showPlayer(search);
  }else if (sessionUser) {
    node.value = sessionUser;
    updateSearch(sessionUser);
    showPlayer(sessionUser);
  }
  //init Search
}
//USER

//PUSH Search
var pushSearch = new XMLHttpRequest();
function updateSearch(sUser){
  search = sUser;
  pushSearch.open("GET", "vadw.php?search="+sUser);
  pushSearch.send();
}
//PUSH Search

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
  updateSearch(node.value);
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
var playerUser;
var retry = 0;
function showPlayer(node, live, clean){
  if(live){
    var ext = "live";
  }else{
    var ext = "auto";
  }
  function clear(){
    hideHome();
    hideSB();
    clearSB();
  }
  if(!clean){
    clear();
  }

  function load(retry){
    active = "";
    ready = false;
    var loading;
    if(loading = document.getElementById("loading")){
      loading.innerText = "Loading "+retry+"/3";
    }else{
      header.style.padding = "8px 16px";
      containerHeader.style.display = "block";
      containerSection.style.display = "none";
      header.style.display = "flex";

      var loadingContainer = document.createElement("div");
      loadingContainer.id = "loadingContainer";
      loadingContainer.style.margin = "auto";
      loadingContainer.style.display = "flex";
      var loadcont = document.createElement("p");

      var loading = document.createElement("span");
      loading.className = "rBold";
      loading.id = "loading";
      loading.innerText = "Loading";

      var loadingImg = document.createElement("img");
      loadingImg.className = "loading";
      loadingImg.src = "src/loading.png";

      loadcont.appendChild(loading);
      loadingContainer.appendChild(loadcont);
      loadingContainer.appendChild(loadingImg);
      header.appendChild(loadingContainer);
    }
  }
  load(retry);
  if(node != playerUser || live){
    dataCount = 0;
    request.open("GET", "src/api.php"+"?username="+node+"&ext="+ext);
    request.setRequestHeader(tokenHeader.name,tokenHeader.content);
    request.responseType = "json";
    request.send();
    request.onload = function() {
      player = request.response;
      if (player) {
        dataCount = Object.keys(player["data"]).length;
      }
      if (dataCount === 0 && retry < 3){
        playerUser = null;
        retry++;
        showPlayer(node, live, true);
      }else{
        clear();
        populateHeader(player);
        retry = 0;
        if(dataCount>0){
          playerUser = player.data.profile.handle;
          showComment(node);
        }
      }
    }
  }else{
    clear();
    populateHeader(player);
    showComment(node);
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
function updateComment(id, newRating, newComment){
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
function mtco(){
  headerHeight = 0;
  clearBox(header);
  clearBox(section);
  hideHome();
  hideSB();
  if(node.value == "" || node.value.includes("/")){
    showHome();
  }else{
    node.value = node.value.replace(/\s/g,"");
    showPlayer(node.value);
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

  var queryString = "?c="+sc[0]+"&e="+sc[1]+"&x="+sc[2]+"&m="+sc[3]+"&p="+sc[4]+"&t="+sc[5];

  searchCareers.open("GET", "src/searchBy.php" + queryString+"&page="+sC[7]);
  searchCareers.setRequestHeader(tokenHeader.name,tokenHeader.content);
  searchCareers.responseType = "json";
  searchCareers.send();
  searchCareers.onload = function(){
    pages(sC[7], searchCareers.response.pages, 0, containerHeader);
    var response = searchCareers.response;
    delete response.pages;
    const sCount = Object.keys(response).length;
    uSearch(response, sCount);
  }
}

function showSBC(){
  if(boolsbc == false){
    var sbcImg = document.getElementsByClassName("sbc-content")[0];
    sbcImg.classList.add("tooltip");
    var sbcContainer = document.getElementsByClassName("search-param-container")[0];
    var tooltip = document.createElement("span");
    tooltip.className = "tooltiptext";
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
          searchCareer(sC);
        }else{
          sC[0] = 0;
          searchCareer(sC);
        }
      }else if (e.target == this.children[0].children[1].children[1]) {
        e.target.classList.toggle("notSelected");
        if(sC[1] == 0){
          sC[1] = 1;
          searchCareer(sC);
        }else{
          sC[1] = 0;
          searchCareer(sC);
        }
      }else if (e.target == this.children[0].children[1].children[2]) {
        e.target.classList.toggle("notSelected");
        if(sC[2] == 0){
          sC[2] = 1;
          searchCareer(sC);
        }else{
          sC[2] = 0;
          searchCareer(sC);
        }
      }else if (e.target == this.children[0].children[1].children[3]) {
        e.target.classList.toggle("notSelected");
        if(sC[3] == 0){
          sC[3] = 1;
          searchCareer(sC);
        }else{
          sC[3] = 0;
          searchCareer(sC);
        }
      }else if (e.target == this.children[0].children[1].children[4]) {
        e.target.classList.toggle("notSelected");
        if(sC[4] == 0){
          sC[4] = 1;
          searchCareer(sC);
        }else{
          sC[4] = 0;
          searchCareer(sC);
        }
      }else if (e.target == this.children[0].children[1].children[5]) {
        e.target.classList.toggle("notSelected");
        if(sC[5] == 0){
          sC[5] = 1;
          searchCareer(sC);
        }else{
          sC[5] = 0;
          searchCareer(sC);
        }
      }
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
                tooltip.style.right = "76px";
                tooltip.style.left = "";
                break;
              case 1:
                tooltip.style.right = "45px";
                tooltip.style.left = "";
                break;
              case 2:
                tooltip.style.right = "13px";
                tooltip.style.left = "";
                break;
              case 3:
                tooltip.style.left = "13px";
                tooltip.style.right = "";
                break;
              case 4:
                tooltip.style.left = "45px";
                tooltip.style.right = "";
                break;
              case 5:
                tooltip.style.left = "76px";
                tooltip.style.right = "";
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
function hideSB(){
  var sbc = document.getElementsByClassName("sbc-content")[0];
  var sbcContainer = document.getElementsByClassName("search-param-container")[0];
  var resetsbc = document.getElementsByClassName("sbc-img");
  sbc.style.display = "none";
  sbcContainer.style.height = null;
  sbcContainer.children[0].style.color = "C4D7E6";
  //Reset selected
  //Reset END
  boolsbc= false;
}
function clearSB(){
  var resetsbc = document.getElementsByClassName("sbc-img");
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
var ready = false;
function populateHeader(jsonObj){
  active = "user";
  retries = 0;

  var loading = document.getElementById("loadingContainer");
  loading.style.opacity = 0;
  setTimeout(()=>{
    loading.remove();
  }, 150);
  if(dataCount > 0){
    header.style.padding = "8px 16px";
    containerHeader.style.display = "block";
    header.style.display = "flex";
  }else{
    containerHeader.style.display = "block";
    containerSection.style.display = "none";
    header.style.padding = "8px 16px";
    var notFound = document.createElement("p");
    notFound.className = "notFound faded";
    notFound.textContent = "Citizen Not Found";
    header.appendChild(notFound);
    document.title = "Citizen Not Found - MobiTracker";
    setTimeout(()=>{
      notFound.style.opacity = "1";
    }, 150);
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
    var copyUrlTT = document.createElement("span");
    copyUrlTT.className = "copyURL refresh copyToolTip";
    copyUrlTT.innerHTML = "Profile Url Copied!";
    var copyUrl = document.createElement("img");
    copyUrl.className = "copyURL refresh faded";
    copyUrl.src = "src/copy.png";
    copyUrl.onclick = function(){
      copyUrlTT.style.display = "block";
      var copy = document.createElement("input");
      copy.value = "https://www.mobitracker.co/"+jsonObj.data.profile.handle;
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
  var forceRefresh = document.createElement("img");
  forceRefresh.className = "refresh faded";
  forceRefresh.src = "src/refresh.png";
  forceRefresh.onclick = function(){
    clearBox(header);
    clearBox(section);
    showPlayer(node.value, true);
  };
  header.appendChild(forceRefresh);
  //Refresh END

  //Data Source

  var created_at = document.createElement("p");
  created_at.className = "faded";


  function now() {
    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

  }

  var d = new Date(now());
  created_at.innerText = d.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  created_at.style.textAlign = "start";

  if(jsonObj.source == "cache"){
    created_at.innerText = "Cache";
  }else{
    created_at.innerText = "Live - "+created_at.innerText;
  }

  header.appendChild(created_at);
  setTimeout(()=>{
    forceRefresh.style.opacity = "1";
    copyUrl.style.opacity = "1";
    created_at.style.opacity = "1";
  }, 250);
  //Data Source

  //Player Avatar
  var playeravatar = document.createElement("img");
  playeravatar.className = "playeravatar faded";
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
  playerPanel.className = "ptitle faded";

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
  ptitle.className = "ptitle faded";

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
  ratingContainer.className  = "ptitle faded";

  var playerRatingContainer = document.createElement("div");
  var playerRatingConForm = document.createElement("form");
  playerRatingContainer.appendChild(playerRatingConForm);

  var queryString = "?username=" + node.value;
  readRating.open("GET", "src/rating.php" + queryString, true);
  readRating.setRequestHeader(tokenHeader.name,tokenHeader.content);
  readRating.send();
  readRating.onreadystatechange = function(){
    if(readRating.readyState == 4){
      var ratings = JSON.parse(readRating.response);
      var avgRating = parseInt(ratings.avgRating);

      var ratingCount = document.createElement("p");
      ratingCount.style.margin = "auto 0 auto 0";
      ratingCount.innerText = "(" + ratings.reviewed_count + ")";

      for (var x = 5; x > 0; x--) {
        if(x < avgRating){
          var starLabel = document.createElement("label");
          starLabel.className = "nStarFull";
          playerRatingConForm.appendChild(starLabel);
        }else{
          var starLabel = document.createElement("label");
          starLabel.className = "nStarEmpty";
          playerRatingConForm.appendChild(starLabel);
        }
      }
      ratingContainer.appendChild(playerRatingConForm);
      ratingContainer.appendChild(ratingCount);
    }
  }


  header.appendChild(ratingContainer);
  //Rating Container END


  //Player Info
  var ptitle = document.createElement("div");
  ptitle.className = "ptitle faded";
  ptitle.style.flexWrap = "wrap";


  var infoCont = document.createElement("div");
  infoCont.className = "rFlex";


  var idCont = document.createElement("p");
  idCont.style.display = "flex";
  idCont.style.flexDirection = "column";
  var boldSpan = document.createElement("span");

  boldSpan.innerText = "Citizen ID:";
  boldSpan.className = "rBold";

  var subP = document.createElement("span");
  subP.className = "subP";
  subP.innerText = jsonObj.data.profile.id

  idCont.appendChild(boldSpan);
  idCont.appendChild(subP);
  ptitle.appendChild(idCont);
  //Player Info END

  //Enlisted
  const enlistCont = document.createElement("p");
  enlistCont.style.display = "flex";
  enlistCont.style.flexDirection = "column";
  boldSpan = document.createElement("span");

  boldSpan.innerText = "Enlisted:";
  boldSpan.className = "rBold";

  subP = document.createElement("span");
  subP.className = "subP";
  var d = new Date(jsonObj.data.profile.enlisted);
  subP.innerText = d.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  enlistCont.appendChild(boldSpan);
  enlistCont.appendChild(subP);
  ptitle.appendChild(enlistCont);
  //Enlisted END


  //Languages
  if(jsonObj.data.profile.fluency){
    if(jsonObj.data.profile.fluency.length > 0){
      const langCont = document.createElement("p");
      langCont.style.display = "flex";
      langCont.style.flexDirection = "column";
      boldSpan = document.createElement("span");

      boldSpan.innerText = "Languages:";
      boldSpan.className = "rBold";

      subP = document.createElement("span");
      subP.className = "subP";
      subP.innerText = jsonObj.data.profile.fluency.join(", ");

      langCont.appendChild(boldSpan);
      langCont.appendChild(subP);
      ptitle.appendChild(langCont);
    }
  }
  //Languages


  header.appendChild(ptitle);


  //Player Org
  var orgPanel = document.createElement("div");

  orgPanel.className = "ptitle faded";
  orgPanel.style.flexWrap = "wrap";

  if(jsonObj.data.organization){
    if(jsonObj.data.organization.name){
      var orgCont = document.createElement("div");
      orgCont.className = "rFlex";
      var orgLogo = document.createElement("img");
      var orgLink = document.createElement("a");
      var orgName = document.createElement("span");
      var orgRank = document.createElement("span");
      orgLink.className = "panelLink";

      orgLogo.className = "orgLogo";
      orgLogo.src = jsonObj.data.organization.image;


      orgName.className = "orgName rBold";
      orgName.textContent = jsonObj.data.organization.name;

      orgRank.className = "subP";
      orgRank.innerText = jsonObj.data.organization.rank+" ["+jsonObj.data.organization.stars+"]";

      orgLink.href = orgURL+jsonObj.data.organization.sid;
      orgLink.target = "_blank";

      header.appendChild(orgPanel);

      orgLink.appendChild(orgName);
      orgLink.appendChild(orgRank);
      orgCont.appendChild(orgLogo);
      orgCont.appendChild(orgLink);
      orgPanel.appendChild(orgCont);
    }else{
      var orgCont = document.createElement("div");
      orgCont.className = "rFlex";
      var orgLogo = document.createElement("img");
      var orgLink = document.createElement("a");
      var orgName = document.createElement("span");
      var orgRank = document.createElement("span");
      orgLink.className = "panelLink";

      orgLogo.className = "orgLogo";
      orgLogo.src = "https://robertsspaceindustries.com/rsi/static/images/organization/public-orgs-thumb-redacted-bg.png";


      orgName.className = "orgName rBold";
      orgName.textContent = "REDACTED";

      orgRank.className = "subP";
      orgRank.innerText = "REDACTED";

      orgLink.href = "";

      header.appendChild(orgPanel);

      orgLink.appendChild(orgName);
      orgLink.appendChild(orgRank);
      orgCont.appendChild(orgLogo);
      orgCont.appendChild(orgLink);
      orgPanel.appendChild(orgCont);
    }
  }
  if(jsonObj.data.affiliation){
    for(var x = 0; x < jsonObj.data.affiliation.length; x++){
      if(jsonObj.data.affiliation[x].name){
        var orgCont = document.createElement("div");
        orgCont.className = "rFlex";
        var orgLogo = document.createElement("img");
        var orgLink = document.createElement("a");
        var orgName = document.createElement("span");
        var orgRank = document.createElement("span");
        orgLink.className = "panelLink";

        orgLogo.className = "orgLogo";
        orgLogo.src = jsonObj.data.affiliation[x].image;


        orgName.className = "orgName rBold";
        orgName.textContent = jsonObj.data.affiliation[x].name;

        orgRank.className = "subP";
        orgRank.innerText = jsonObj.data.affiliation[x].rank+" ["+jsonObj.data.affiliation[x].stars+"]";

        orgLink.href = orgURL+jsonObj.data.affiliation[x].sid;
        orgLink.target = "_blank";

        header.appendChild(orgPanel);

        orgLink.appendChild(orgName);
        orgLink.appendChild(orgRank);
        orgCont.appendChild(orgLogo);
        orgCont.appendChild(orgLink);
        orgPanel.appendChild(orgCont);
      }else{
        var orgCont = document.createElement("div");
        orgCont.className = "rFlex";
        var orgLogo = document.createElement("img");
        var orgLink = document.createElement("a");
        var orgName = document.createElement("span");
        var orgRank = document.createElement("span");
        orgLink.className = "panelLink";

        orgLogo.className = "orgLogo";
        orgLogo.src = "https://robertsspaceindustries.com/rsi/static/images/organization/public-orgs-thumb-redacted-bg.png";


        orgName.className = "orgName rBold";
        orgName.textContent = "REDACTED";

        orgRank.className = "subP";
        orgRank.innerText = "REDACTED";

        orgLink.href = "";

        header.appendChild(orgPanel);

        orgLink.appendChild(orgName);
        orgLink.appendChild(orgRank);
        orgCont.appendChild(orgLogo);
        orgCont.appendChild(orgLink);
        orgPanel.appendChild(orgCont);
      }
    }
  }
  //Player Org END

  //Tag
  var selectedCareer = [];
  var tagContainer = document.createElement("div");
  tagContainer.className  = "ptitle tooltip faded";
  tagContainer.style.margin = "auto";
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
  playerbio.className = "playerbio faded";
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
    createButton.textContent = "Rate "+jsonObj.data.profile.handle;
    createButton.style.marginTop = "15px";
    header.style.paddingBottom = "18px";
    var editImg = document.createElement("img");
    createButton.onclick = function() {
      if(session && commented == 0 && comcount != 3){
        var createCommentContainer = document.createElement("div");
        createCommentContainer.className = "cCommentContainer";
        header.removeChild(header.lastChild);

        var reviewContainer = document.createElement("div");
        reviewContainer.style.display = "flex";
        reviewContainer.style.justifyContent = "flex-end";

        var starContainer = document.createElement("div");
        var starConForm = document.createElement("form");
        starContainer.appendChild(starConForm);
        var stars = [];

        for(var x = 5; x > 0; x--){
          var starInput = document.createElement("input");
          starInput.className = "star star-"+x;
          starInput.id = "star-"+x;
          starInput.type = "radio";
          starInput.name = "star";
          var starLabel = document.createElement("label");
          starLabel.className = "star star-"+x;
          starLabel.htmlFor = "star-"+x;
          starLabel.num = x;
          starLabel.onclick = function(){
            toggleSelected(this);
          };
          stars.push({ input: starInput, label: starLabel });
          starConForm.appendChild(starInput);
          starConForm.appendChild(starLabel);
        }
        reviewContainer.appendChild(starContainer);

        var selected = 0;
        function toggleSelected(e){
          if(!document.getElementById(e.htmlFor).checked){
            selected = e.num;
            if(selected <= 2){
              if (reviewContainer.firstChild.id != "warning") {
                var minWarning = document.createElement("p");
                minWarning.id = "warning";
                minWarning.className = "highlight-red shadow-red";
                minWarning.innerText = "Requires Proof";
                minWarning.style.margin = "auto 0";
                minWarning.style.fontSize = "18px";
                reviewContainer.insertBefore(minWarning, reviewContainer.firstChild);
              }
            }else{
              if(reviewContainer.firstChild.id == "warning"){
                reviewContainer.firstChild.remove();
              }
            }
          }
        }

        createCommentContainer.appendChild(reviewContainer);

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

        newCommentContainer.style.display = "flex";
        newCommentContainer.style.justifyContent = "flex-end";

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
          var writeString = "u_player="+sessionUser+"&r_player="+jsonObj["data"]["profile"]["handle"]+"&avi="+jsonObj["data"]["profile"]["image"]+"&rating="+selected+"&comment="+createComment.value;
          sendComment(writeString);
        });
      }else if(session && commented == 0 && comcount == 3){
        createErr.textContent = "Unverified accounts are limited to 3 reviews. "+comcount+"/3";
      }
    };

    header.appendChild(createErr);
    header.appendChild(createButton);

  }
  //Add Comment END

  var x = 0;
  var faded = document.getElementsByClassName("faded");
  var display = setInterval(()=>{
    if(active == "user"){
      faded[x].style.opacity = 1;
      if (x == faded.length-2) {
        ready = true;
      }
      if(x == faded.length-1){
        clearInterval(display);
      }else{
        x++;
      }
    }
  }, 150);
}

function noReviews(usr){
  if(session == 1){
    var firstContainer = document.createElement("div");
    var notFound = document.createElement("p");
    firstContainer.className = "firstContainer";
    notFound.className = "notFound";
    notFound.textContent = "Has "+usr+" left a lasting impression? \nBe the first to leave a good review for them.";
    firstContainer.appendChild(notFound);
    containerSection.style.display = "block";
    section.appendChild(firstContainer);
  }else{
    var firstContainer = document.createElement("div");
    var notFound = document.createElement("p");
    var signup = document.createElement("a");
    firstContainer.className = "firstContainer";
    signup.className = "login_btn";
    signup.innerHTML = "Sign up";
    signup.href = "register";
    notFound.className = "notFound";
    notFound.textContent = "Has "+usr+" left a lasting impression? \nBe the first to leave a good review for the.";
    firstContainer.appendChild(notFound);
    firstContainer.appendChild(signup);
    containerSection.style.display = "block";
    section.appendChild(firstContainer);
  }
  return;
}

function showReview(){
  if(commentCount > 0){
    containerSection.style.display = "block";
  }else{
    noReviews(playerUser);
    return;
  }
  var playerReview = [];
  for(var i = 0; i < commentCount; i++){
    editing = 0;
    //Creator Container
    playerReview.push(document.createElement("div"));
    playerReview[i].className = "player-review faded-section";
    var playerminContainer = document.createElement("div");
    playerminContainer.className = "player-min-container";
    playerReview[i].appendChild(playerminContainer);

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
    var review = document.createElement("h3");

    var playerRatingContainer = document.createElement("div");
    var playerRatingConForm = document.createElement("form");
    playerRatingContainer.appendChild(playerRatingConForm);

    for (var x = 5; x > 0; x--) {
      if (x < comment[i].rating) {
        var starLabel = document.createElement("label");
        starLabel.className = "nStarFull";
        playerRatingConForm.appendChild(starLabel);
      } else {
        var starLabel = document.createElement("label");
        starLabel.className = "nStarEmpty";
        playerRatingConForm.appendChild(starLabel);
      }
    }
    
    ratingContainer.appendChild(playerRatingConForm);

    //Rating Container END
    //Comment
    var creatorComment = document.createElement("p");
    var commentContainer = document.createElement("div");
    creatorComment.className = "comment";
    creatorComment.innerHTML = comment[i]["comment"];
    if(session && sessionUser == comment[i]["u_creator"]){
      creatorComment.id = comment[i]["id"];
      var userComment = comment[i];
    }
    commentContainer.className = "commentContainer";
    commentContainer.appendChild(ratingContainer);
    commentContainer.append(creatorComment);
    playerminContainer.appendChild(commentContainer);
    //Comment END
    //Manage
    var manageComment = document.createElement("div");
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
        createErr.textContent = "Error: You've already left a review of this Citizen. \n If you wish to edit your comments please edit it using the edit button";
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

          var reviewContainer = document.createElement("div");
          reviewContainer.style.display = "flex";
          reviewContainer.style.justifyContent = "flex-end";

          var reviewPlus = document.createElement("h3");
          var reviewMin = document.createElement("h3");
          reviewPlus.className = "highlight-green notSelected cursor";
          reviewPlus.innerText = "+1";
          reviewPlus.value = 1;
          reviewPlus.other = reviewMin;
          reviewPlus.onclick = function(){
            toggleSelected(this);
          };

          reviewMin.className = "highlight-red shadow-red notSelected cursor";
          reviewMin.innerText = "-1";
          reviewMin.value = -1;
          reviewMin.other = reviewPlus;
          reviewMin.onclick = function(){
            toggleSelected(this);
          };
          var newRating;
          if(userComment.rating > 0){
            reviewPlus.classList.toggle("notSelected");
            newRating = 1;
          }else if (userComment.rating < 0) {
            reviewMin.classList.toggle("notSelected");
            newRating = -1;
          }
          function toggleSelected(e){
            if(e.classList.contains("notSelected")){
              e.classList.toggle("notSelected");
              e.other.classList.toggle("notSelected");
              newRating = e.value;
              return;
            }
          }

          reviewContainer.appendChild(reviewMin);
          reviewContainer.appendChild(reviewPlus);

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
            this.parentElement.parentElement.parentElement.children[3].style.display = "flex";
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

          editContainer.appendChild(reviewContainer);
          editContainer.appendChild(editBox);
          editContainer.appendChild(manageEditContainer);
          manageEditContainer.appendChild(editorCount);
          manageEditContainer.appendChild(editCancel);
          manageEditContainer.appendChild(editSubmit);

          this.parentElement.parentElement.children[0].style.display = "none";
          this.parentElement.parentElement.children[1].style.display = "none";
          this.parentElement.parentElement.children[2].style.display = "none";
          this.parentElement.parentElement.insertBefore(editContainer, this.parentElement.parentElement.children[2]);
          editSubmit.onclick = function(){
            updateComment(editSubmit.id, newRating, editBox.value);
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
    if(comment[i].rating < 0 && comment[i].approval == 0){
      var pending = document.createElement("p");
      pending.className = "validity highlight-red shadow-red";
      pending.innerText = "Pending Admin Validity";
      manageComment.insertBefore(pending, manageComment.firstChild);
    }else if(comment[i].rating < 0 && comment[i].approval == 1){
      var approved = document.createElement("p");
      approved.className = "validity highlight-green";
      approved.innerText = "Approved";
      manageComment.insertBefore(approved, manageComment.firstChild);
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
    playerReview[i].appendChild(created_at);
    //Creation END
    if(comment[0]["u_creator"] == sessionUser){
      commented = 1;
    }else{
      commented = 0;
    }
    section.appendChild(playerReview[i]);
  }
  var x = 0;
  var display = setInterval(()=>{
    if(ready){
      playerReview[x].style.opacity = 1;
      if(x == playerReview.length-1){
        clearInterval(display);
      }else{
        x++;
      }
    }
  }, 150);
}
//Searched Users
function uSearch(searched, length){
  active = "career";
  document.title = "MobiTracker";
  if(length > 0){
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
  var sb = [];
  for(var i = 0; i<length; i++){
    sb.push(document.createElement("div"));
    sb[i].className = "sbCont faded-section";
    var sba  = document.createElement("img");
    sba.className = "sba";
    sba.onerror = function(){
      this.src = "src/avatars/avatar_default.jpg";
    }

    sba.src = searched[i].avatar;
    sb[i].appendChild(sba);
    var sbName = document.createElement("div");
    sbName.className = "player-min-name";

    if(searched[i].verify == 1){
      var sbVerified = document.createElement("img");
      sbVerified.className = "verified";
      sbVerified.src = "src/verified.png";
      sbName.appendChild(sbVerified);
    }

    var sbUsername = document.createElement("a");
    sbUsername.innerHTML = searched[i].username;
    sbUsername.id = searched[i].username;
    sbUsername.className = "sbu player-username";
    sbUsername.href = "https://mobitracker.co/"+searched[i].username;
    sbName.appendChild(sbUsername);
    sb[i].appendChild(sbName);

    var sbr = document.createElement("div");
    sbr.className = "sbr";

    var showsbrc = document.createElement("p");
    showsbrc.className = "sbrc";


    showsbrc.textContent = xp(searched[i].reviewed_count)+" ("+searched[i].reviewed_count+")";

    sbr.appendChild(showsbrc);
    sb[i].appendChild(sbr);
    var sbrc = document.createElement("div");
    sbrc.className = "sbr";
    var sbrcImg = document.createElement("img");
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

    var selectedCareer = [searched[i]["crew"],searched[i]["escort"],searched[i]["explorer"],searched[i]["miner"],searched[i]["pirate"],searched[i]["trader"]];
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
    sb[i].appendChild(sbrc);
    header.appendChild(sb[i]);
  }


  var x = 0;
  var display = setInterval(()=>{
    if(active == "career"){
      sb[x].style.opacity = "1";
      if(x == sb.length-1){
        clearInterval(display);
      }else{
        x++;
      }
    }
  }, 50);

  header.style.removeProperty("height");
  headerHeight = header.offsetHeight;
}
//Searched Users END

// functions
var sbc = document.getElementsByClassName("sbc-btn")[0];
sbc.onclick = function(){showSBC()};
