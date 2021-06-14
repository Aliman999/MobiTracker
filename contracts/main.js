var x, i, j, l, ll, selElmnt, a, b, c, y = 0;
var post = document.getElementsByClassName("post")[0];
var formContainer = document.getElementsByClassName("jpFormContainer")[0];
var tokenHeader = document.getElementsByName("token")[0];
var colD = 0;
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
getUser.open("GET", "../src/user.php");
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
  if(faction == 0){
    careersText = ["Racing", "Delivery", "Security", "Scouting", "Medical", "Charting Regular", "Charting Luxury"];
    careersShort = ["?r=", "&d=", "&s=", "&st=", "&md=", "&cr=", "&cl=", "&pref=", "&rating="];
    for(var i = 0; i < careersText.length; i++){
      sC.push(0);
    }
  }else if(faction == 1){
    careersText = ["Racing", "Delivery", "Security", "Head Hunting", "Scouting", "Medical", "VIP Smuggling"];
    careersShort = ["?r=", "&d=", "&s=", "&st=", "&md=", "&hh=", "&vip=", "&pref=", "&rating="];
    for(var i = 0; i< careersText.length; i++){
      sC.push(0);
    }
  }
  for(var i = 0; i< careersShort.length-1; i++){
    queryString.push(careersShort[i]);
  }
  sC.push(-1);
  searchCareer(sC);
}
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
  b.setAttribute("class", "select-items select-hide");
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
  a.addEventListener("click", function(e){
    atype = document.getElementsByClassName("select-selected")[0];
    ajob = document.getElementsByClassName("select-selected")[1];
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt){
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  z = document.getElementsByClassName("jpFormContainer");
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
  var isClickInside = formContainer.contains(event.target);
  var isClickPost = post.contains(event.target);
  if(!isClickInside && !isClickPost){
    formContainer.classList.add("hidden");
    postErr.classList.add("hidden");
    formfill = 0;
  }

  var isClickInsidePR = document.querySelectorAll(".player-review");
  var click;
  for(var i = 0; i < isClickInsidePR.length; i++){
    if(isClickInsidePR[i].contains(event.target)){
      click = true;
      break;
    }else{
      click = false;
    }
  }
  var appDesc = document.querySelectorAll(".appDescCont");
  if(!click){
    for(var i = 0; i < appDesc.length; i++){
      appDesc[i].children[0].value = "";
      appDesc[i].classList.add("hidden");
    }
  }
}
document.addEventListener("click", closeAllSelect);

var postContainer = document.getElementsByClassName("postContainer")[0];
var postErr = document.getElementsByClassName("error")[0];
var service = document.getElementsByClassName("select-selected")[0];
var jobtype = document.getElementsByClassName("select-selected")[1];
var formfill = 0;

post.addEventListener("click", function(e) {
  if(session){
    if(formfill == 1){
      if(service.innerText != " " && jobtype.innerText != "Select Job"){
        window.location.href = "create?option="+service.innerText+"&service="+jobtype.innerText;
      }else{
        postErr.classList.toggle("hidden");
      }
    }else{
      formContainer.classList.toggle("hidden");
      formfill = 1;
    }
  }else{
    openNav();
    showForm(false);
  }
});

var pageContainer = document.getElementsByClassName("pageContainer");
var savedPage;

function pages(p, m, v){
  //Page, Max, Version
  savedPage = p;
  if(!v){
    v=0;
  }
  for(var x=0; x<2; x++){
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
          showContracts(parseInt(this.id));
          window.scrollTo(0,0);
        };
      }else{
        page[i].onclick = function(){
          search(savedSearch, parseInt(this.id));
        };
      }
    }
  }
}

function toggleDesc(e){
  var drops = document.getElementsByClassName("collapseB");
  for(var i = 0; i < drops.length; i++){
    if(e.nextSibling.classList.contains("jobcomp") && e != drops[i]){
      drops[i].nextSibling.classList.add("jobcomp");
      drops[i].children[1].innerText = "▲";
    }
  }
  if(e.nextSibling.classList.contains("jobcomp")){
    e.nextSibling.classList.remove("jobcomp");
    e.children[1].innerText = "▼";
  }else{
    e.nextSibling.classList.add("jobcomp");
    e.children[1].innerText = "▲";
  }
}

var section = document.getElementsByClassName("section")[0];
var tokenHeader = document.getElementsByName("token")[0];
var listContracts = new XMLHttpRequest();
var apply = new XMLHttpRequest();
var manage = new XMLHttpRequest();

function clearContracts(){
  document.querySelectorAll(".player-review").forEach(function(a){
    a.remove()
  })
  document.querySelectorAll(".notFound").forEach(function(a){
    a.remove()
  })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clickUser(user){
  window.location.href = "https://mobitracker.co/"+user;
}
var sb = new Array();
for(var x = 0; x < document.getElementsByClassName("search-param-container")[0].children.length; x++){
  sb[x] = { bool:false, type: document.getElementsByClassName("search-param-container")[0].children[x].innerText };
}

var node = document.getElementsByClassName("contractSearch")[0];

node.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if(node.value != ""){
      searchCareer(sC);
    }else{
      hideSB();
      searchCareer(sC);
    }
  }
});

var searchCareers = new XMLHttpRequest();

function searchCareer(sc){
  var tempString = queryString.slice();
  for(var x = 0; x<sC.length-1; x++){
    tempString[x] = tempString[x]+sC[x];
  }
  tempString = tempString.join('');
  if(node.value != ""){
    var user = "&user="+node.value;
  }else{
    var user = null;
  }
  if(!savedPage){
    savedPage = 1;
  }
  searchCareers.open("GET", "../src/contracts.php"+tempString+"&page="+savedPage+user+"&pref="+JSON.stringify(cPref));
  searchCareers.setRequestHeader(tokenHeader.name,tokenHeader.content);
  searchCareers.send();
  searchCareers.onreadystatechange = function(){
    if(searchCareers.readyState == 4){
      var response = JSON.parse(searchCareers.response);
      if(response.data.length > 0){
        pages(1, response["pages"]);
      }
      populateContracts(response["data"], 1);
    }
  }
}
var sbcContainer = document.getElementsByClassName("search-param-container")[0];
for(var i = 0; i < sb.length; i++){
  sbcContainer.children[i].style.width = (sbcContainer.children[i].clientWidth)+"px";
}
function toggleSB(type){
  for(var i = 0; i < sb.length; i++){
    if(sb[i].bool && sb[i].type != type){
      hideSB();
    }
  }
  if(sb[0].type === type && sb[0].bool === false){
    sbcContainer.children[0].style.color = "FFFFFF";
    var btn = sbcContainer.children[0].children[1];
    btn.style.display = "flex";
    if(parseInt(cPref.cType) != 2){
      btn.children[parseInt(cPref.cType)].classList.remove("notSelected");
    }else{
      btn.children[0].classList.remove("notSelected");
      btn.children[1].classList.remove("notSelected");
    }
    sbcContainer.onclick = function(e){
      for (var x = 0; x < btn.children.length; x++) {
        if(e.target == btn.children[x]){
          if(!btn.children[x].classList.contains("notSelected")){
            btn.children[x].classList.add("notSelected");
          }else{
            btn.children[x].classList.remove("notSelected");
          }
          if(!btn.children[0].classList.contains("notSelected") && !btn.children[1].classList.contains("notSelected")){
            cPref.cType = 2;
            searchCareer(sC);
          }else if(btn.children[0].classList.contains("notSelected") && btn.children[1].classList.contains("notSelected")){
            for(var xx = 0; xx < btn.children.length; xx++){
              if(btn.children[xx] != btn.children[x]){
                btn.children[xx].classList.remove("notSelected");
                cPref.cType = xx;
                searchCareer(sC);
              }
            }
          }else{
            for(var xx = 0; xx < btn.children.length; xx++){
              if(btn.children[xx] != btn.children[x]){
                btn.children[xx].classList.remove("notSelected");
                cPref.cType = xx;
                searchCareer(sC);
              }
            }
          }
        }
      }
    };

    sb[0].bool = true;
  }else if(sb[1].type === type && sb[1].bool === false){
    var sbcImg = document.getElementsByClassName("sbc-content")[0];
    var tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.visibility = "hidden";
    tooltip.style.width = "max-content";
    sbcImg.appendChild(tooltip);

    sbcImg.style.display = "flex";
    sbcContainer.children[0].style.color = "FFFFFF";

    sbcContainer.onclick = function(e){
      var btn = sbcContainer.children[1].children[1];
      for(var x = 0; x<btn.children.length; x++){
        if(e.target == btn.children[x]){
          if(btn.children[x].classList.contains("notSelected")){
            btn.children[x].classList.remove("notSelected");
            sC[x] = 1;
          }else{
            btn.children[x].classList.add("notSelected");
            sC[x] = 0;
          }
          searchCareer(sC);
        }
      }
      if(faction == 0){
        btn.onmouseover = function(e){
          var target = e.target;
          var mouse = e;
          e = this.children;
          for (var i = 0; i < e.length-1; i++) {
            if(e[i] == target){
              tooltip.textContent = careersText[i];
              tooltip.style.visibility = "visible";
              tooltip.style.top = (e[i].offsetHeight+6)+"px";
              switch(i){
                case 0:
                  tooltip.style.left = -86+"px";
                  break;
                case 1:
                  tooltip.style.left = -60+"px";
                  break;
                case 2:
                  tooltip.style.left = -28+"px";
                  break;
                case 3:
                  tooltip.style.left = 3+"px";
                  break;
                case 4:
                  tooltip.style.left = 38+"px";
                  break;
                case 5:
                  tooltip.style.left = 36+"px";
                  break;
                case 6:
                  tooltip.style.left = 72+"px";
              }
            }
          }
        };
      }else if (faction == 1) {
        btn.onmouseover = function(e){
          var target = e.target;
          var mouse = e;
          e = this.children;
          for (var i = 0; i < e.length-1; i++) {
            if(e[i] == target){
              tooltip.textContent = careersText[i];
              tooltip.style.visibility = "visible";
              tooltip.style.top = (e[i].offsetHeight)+"px";
              switch(i){
                case 0:
                  tooltip.style.left = -86+"px";
                  break;
                case 1:
                  tooltip.style.left = -60+"px";
                  break;
                case 2:
                  tooltip.style.left = -28+"px";
                  break;
                case 3:
                  tooltip.style.left = -16+"px";
                  break;
                case 4:
                  tooltip.style.left = 35+"px";
                  break;
                case 5:
                  tooltip.style.left = 70+"px";
                  break;
                case 6:
                  tooltip.style.left = 76+"px";
              }
            }
          }
        };
      }
      sbcContainer.onmouseout = function(e){
        tooltip.textContent = "";
        tooltip.style.visibility = "hidden";
      };
    };
    sb[1].bool = true;
  }else if(sb[2].type === type && sb[2].bool === false){
    sbcContainer.children[0].style.color = "FFFFFF";
    var btn = sbcContainer.children[2].children[1];
    btn.style.display = "flex";
    if(parseInt(cPref.cOwn) != 2 && parseInt(cPref.cOwn) != -1){
      btn.children[parseInt(cPref.cOwn)].classList.remove("notSelected");
    }else if(cPref.cOwn == 2){
      btn.children[0].classList.remove("notSelected");
      btn.children[1].classList.remove("notSelected");
    }
    sbcContainer.onclick = function(e){
      for (var x = 0; x < btn.children.length; x++) {
        if(e.target == btn.children[x]){
          if(!btn.children[x].classList.contains("notSelected")){
            btn.children[x].classList.add("notSelected");
          }else{
            btn.children[x].classList.remove("notSelected");
          }
          if(!btn.children[0].classList.contains("notSelected") && !btn.children[1].classList.contains("notSelected")){
            for(var xx = 0; xx < btn.children.length; xx++){
              if(btn.children[x] == btn.children[xx] && !btn.children[xx].classList.contains("notSelected")){
                if(x == 0){
                  cPref.cType = 2;
                }
                cPref.cOwn = x;
                searchCareer(sC);
              }else{
                btn.children[xx].classList.add("notSelected");
              }
            }
            searchCareer(sC);
          }else if(btn.children[0].classList.contains("notSelected") && btn.children[1].classList.contains("notSelected")){
            cPref.cOwn = -1;
            searchCareer(sC);
          }else{
            for(var xx = 0; xx < btn.children.length; xx++){
              if(btn.children[x] != btn.children[xx] && btn.children[xx].classList.contains("notSelected")){
                cPref.cOwn = x;
                searchCareer(sC);
              }
            }
          }
        }
      }
    };

    sb[2].bool = true;
  }else{
    hideSB();
  }
}

function hideSB(){
  var sbcContainer = document.getElementsByClassName("search-param-container")[0];
  for (var i = 0; i < sbcContainer.children.length; i++) {
    sbcContainer.children[i].children[1].style.display = "none";
    sbcContainer.children[i].children[1].style.color = "C4D7E6";
  }
  for (var i = 0; i < sb.length; i++) {
    sb[i].bool = false;
  }
}

function clearSB(){
  var resetSB = document.getElementsByClassName("sbt-content");
  for(var x = 0; x < resetSB.children.length; x++){
    for(var xx = 0; xx < resetSB.children[x]; xx++){
      resetSB.children[x].children[xx].classList.add("notSelected");
    }
  }
  for(var x = 0; x<sC.length-2; x++){
    sC[x] = 0;
  }
}

function populateContracts(obj, p, apps){
  if(section.children.length > 0){
    clearContracts();
  }
  if(obj.length == 0){
    var nContainer = document.createElement("div");
    var noContract = document.createElement("p");
    noContract.className = "notFound";
    noContract.innerText = "No contracts, Be the first to create one.";
    nContainer.appendChild(noContract);
    section.appendChild(nContainer);
  }
  for (var i = 0; i < obj.length; i++) {
    var completed = obj[i]['completed'];
    var markComplete = obj[i]['markComplete'];
    var escrow = JSON.parse(obj[i]['escrow']);
    var playerReview = document.createElement("div");
    playerReview.className = "player-review";
    playerReview.complete = completed;
    playerReview.markComplete = markComplete;
    var jobPosting = document.createElement("div");
    jobPosting.className = "player-min-container jobposting";
    var playerMin = document.createElement("div");
    playerMin.className = "player-min";
    var playerminAvatar = document.createElement("img");
    playerminAvatar.className = "player-min-avatar";
    playerminAvatar.src = obj[i]["avatar"];
    var playerminName = document.createElement("a");
    playerminName.className = "player-min-name";
    playerminName.href = "https://mobitracker.co/"+obj[i]["u_creator"];
    var playerUsername = document.createElement("p");
    playerUsername.className = "player-username";
    playerUsername.innerText = obj[i]["u_creator"];
    playerReview.appendChild(jobPosting);
    jobPosting.appendChild(playerMin);
    playerMin.appendChild(playerminAvatar);
    playerMin.appendChild(playerminName);
    if(obj[i]["verify"] == 1){
      var playerVerify = document.createElement("img");
      playerVerify.src = "../src/verified.png";
      playerVerify.className = "verified";
      playerminName.appendChild(playerVerify);
    }
    playerminName.appendChild(playerUsername);
    var jpContainer = document.createElement("div");
    jpContainer.className = "commentContainer";
    var jpType = document.createElement("p");
    jpType.className = "comment jobtype";
    var jobTitle = document.createElement("span");
    jobTitle.className = "jobtitle";
    if(obj[i]["type"] == "R"){
      if(obj[i]["careertype"] == "Scouting"){
        jobTitle.innerText = "Looking for a Scout";
      }else if(obj[i]["careertype"] == "Delivery"){
        jobTitle.innerText = "Need a Courier";
      }else if(obj[i]["careertype"] == "Head Hunting"){
        jobTitle.innerText = "Requesting a Head Hunter";
      }else if (obj[i]["careertype"] == "Racing"){
        jobTitle.innerText = "Looking to Race";
      }else if (obj[i]["careertype"] == "Medical"){
        jobTitle.innerText = "Looking for Medical Services";
      }else if (obj[i]["careertype"] == "Security"){
        jobTitle.innerText = "Looking for Security Services";
      }else if (obj[i]["careertype"] == "Charting Regular"){
        jobTitle.innerText = "Looking for a Charter";
      }else if (obj[i]["careertype"] == "Charting Luxury"){
        jobTitle.innerText = "Looking for a Luxurious Charter";
      }else if (obj[i]["careertype"] == "VIP Smuggling"){
        jobTitle.innerText = "Looking for a Smuggler";
      }
    }else if(obj[i]["type"] == "O"){
      if(obj[i]["careertype"] == "Scouting"){
        jobTitle.innerText = "Scout for Hire";
      }else if(obj[i]["careertype"] == "Delivery"){
        jobTitle.innerText = "Courier for Hire";
      }else if(obj[i]["careertype"] == "Head Hunting"){
        jobTitle.innerText = "Head Hunter for Hire";
      }else if (obj[i]["careertype"] == "Racing"){
        jobTitle.innerText = "Racer for Hire";
      }else if (obj[i]["careertype"] == "Medical"){
        jobTitle.innerText = "Medical Services for Hire";
      }else if (obj[i]["careertype"] == "Security"){
        jobTitle.innerText = "Security Services for Hire";
      }else if (obj[i]["careertype"] == "Charting Regular"){
        jobTitle.innerText = "Regular Charter for Hire";
      }else if (obj[i]["careertype"] == "Charting Luxury"){
        jobTitle.innerText = "Luxurious Charter for Hire";
      }else if (obj[i]["careertype"] == "VIP Smuggling"){
        jobTitle.innerText = "Smuggler for Hire";
      }
    }
    jpContainer.appendChild(jpType);
    jpType.appendChild(jobTitle);
    var editAssist = 0;
    if(obj[i]["faction"] != faction){
      var status = document.createElement("span");
      status.classList.add("highlight-red");
      status.classList.add("rBold");
      status.innerText = " ILLEGAL";
      editAssist++;
      jpType.appendChild(status);
    }
    if(escrow.ESCROW == 1){
      var status = document.createElement("span");
      status.classList.add("highlight-green");
      status.classList.add("rBold");
      status.innerText = " ESCROW";
      editAssist++;
      jpType.appendChild(status);
    }
    if(obj[i]["markComplete"] == 1){
      var status = document.createElement("span");
      status.classList.add("highlight-yellow");
      status.classList.add("rBold");
      status.innerText = " MARKED COMPLETE";
      editAssist++;
      jpType.appendChild(status);
    }
    if(obj[i]["completed"] == 1){
      var status = document.createElement("span");
      status.classList.add("highlight-green");
      status.classList.add("rBold");
      status.innerText = " COMPLETED";
      jpType.appendChild(status);
    }
    if(obj[i]["type"] == "R"){
      var pay = document.createTextNode("\nPay: "+numberWithCommas(obj[i]["price"])+" aUEC");
      jpType.appendChild(pay);
    }else if(obj[i]["type"] == "O"){
      var pay = document.createTextNode("\nPrice: "+numberWithCommas(obj[i]["price"])+" aUEC");
      jpType.appendChild(pay);
    }
    var cPrice = obj[i]["price"];
    var jpTarget = document.createElement("span");
    jpTarget.className = "target";
    var jpTitle = document.createElement("a");
    jpTitle.className = "jobtitle";
    if(obj[i]["target"] != ""){
      jpTarget.innerText = "Target: ";
      jpTarget.appendChild(jpTitle);
      jpTitle.href = "https://mobitracker.co/"+obj[i]["target"];
      jpTitle.innerText = obj[i]["target"];
      jpTitle.onclick = function(){
        clickUser(this.innerText);
      };
    }
    jpType.appendChild(jpTarget);
    if(escrow.ESCROW == 1 && obj[i]['u_creator'] == sessionUser){
      var jpEscrow = document.createElement("span");
      jpEscrow.innerHTML = "Escrow Instructions: "+escrow.EI+"</br>Close of Escrow: "+escrow.COE+"</br>Payor: "+escrow.PAYOR+"</br>Payee: "+escrow.PAYEE+"</br>Servicer: "+escrow.SERVICER+"</br>Status: "+escrow.STATUS;
      jpType.appendChild(jpEscrow);
    }else if(escrow.ESCROW == 1){
      var jpEscrow = document.createElement("span");
      jpEscrow.innerHTML = "Escrow Instructions: "+escrow.EI;
      jpType.appendChild(jpEscrow);
    }
    var jpDesc = document.createElement("p");
    jpDesc.className = "comment jobcomp";
    jpDesc.innerHTML = obj[i]["unsecure"];
    var jpDescExpander = document.createElement("div");
    jpDescExpander.className = "collapseB";
    var jpDescExpanderTitle = document.createElement("p");
    jpDescExpanderTitle.innerText = "Description";
    jpDescExpanderTitle.className = "pointer";
    var jpDescExpanderClick = document.createElement("p");
    jpDescExpanderClick.className = "collapse pointer";
    jpDescExpanderClick.innerHTML = "&#9650;";
    jpDescExpanderClick.id = i;
    jpDescExpander.onclick = function(){
      toggleDesc(this);
    }
    jpDescExpander.appendChild(jpDescExpanderTitle);
    jpDescExpander.appendChild(jpDescExpanderClick);
    jpContainer.appendChild(jpDescExpander);
    jpContainer.appendChild(jpDesc);
    var jpSec = document.createElement("p");
    jpSec.className = "comment jobsecure";
    if(obj[i]["secure"]){
      jpSec.innerHTML = "<span style='font-weight: bold;'>Secure Channel - </span>"+obj[i]["secure"];
    }
    jpContainer.appendChild(jpSec);
    var manageContract = document.createElement("div");
    manageContract.className = "manageContract";
    playerReview.appendChild(manageContract);
    playerReview.contract = { applicants: obj[i]['apps'], accepted: obj[i]['acc'] };

    if(obj[i]["completed"] == 0 && obj[i]["u_creator"] == sessionUser){

      var completeErr = document.createElement("p");
      completeErr.className = "highlight-red hidden";
      completeErr.innerText = "";

      var completeBtn = document.createElement("a");
      completeBtn.className = "rButton highlight-green";
      completeBtn.innerText = "Complete";
      completeBtn.id = obj[i]["id"];
      completeBtn.type = obj[i]["type"];
      completeBtn.contract = playerReview.contract;
      completeBtn.err = completeErr;
      completeBtn.onclick = function(e){
        if(this.contract.accepted.length > 0){
          e.target.onmouseout = function(){
            e.target.innerText = "Complete";
          }
          if(e.target.innerText == "Are you sure?"){
            manage.open("POST", "../src/contractManage.php");
            manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
            manage.send("c=complete&cid="+e.target.id);
            manage.onload = function(){
              var response = manage.response;
              searchCareer(sC);
            };
          }
          e.target.innerText = "Are you sure?";
        }else{
          e.target.err.classList.remove("hidden");
          if(e.target.type == "O"){
            e.target.err.innerText = "You cant complete a contract with no employers!";
          }else{
            e.target.err.innerText = "You cant complete a contract with no employees!";
          }
          setTimeout(function(){
            e.target.err.classList.add("hidden");
            e.target.err.innerText = "";
          }, 10000);
        }
      };
      manageContract.appendChild(completeBtn);
      playerReview.appendChild(completeErr);
    }

    if(markComplete == 1){
      var disputeBtn = document.createElement("a");
      disputeBtn.className = "rButton highlight-green";
      disputeBtn.innerText = "Dispute";
      disputeBtn.id = obj[i]["id"];
      disputeBtn.contract = playerReview.contract;
      disputeBtn.err = completeErr;
      disputeBtn.onclick = function(e){
        manage.open("POST", "../src/contractManage.php");
        manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
        manage.send("c=dispute&cid="+e.target.id);
        manage.onload = function(){
          var response = manage.response;
          searchCareer(sC);
        };
      };
      manageContract.appendChild(disputeBtn);
      playerReview.appendChild(completeErr);
    }

    if(obj[i]["u_creator"] == sessionUser && (obj[i]["apps"].length>0 || obj[i]["acc"].length>0)){
      applicantBtn = document.createElement("a");
      applicantBtn.className = "rButton highlight-green";
      applicantBtn.innerText = "Applicants";
      manageContract.appendChild(applicantBtn);
      var jpApplicantsCont = document.createElement("div");
      applicantBtn.appContainer = jpApplicantsCont;
      jpApplicantsCont.className = "jpAppContainer hidden";
      jpApplicantsCont.id = obj[i]["id"];

      var sectionEmployees = document.createElement("span");
      if(obj[i]["type"] == "O"){
        sectionEmployees.innerText = "Employers";
      }else{
        sectionEmployees.innerText = "Employees";
      }
      sectionEmployees.count = obj[i]["acc"].length;
      sectionEmployees.style.paddingLeft = "8px";
      sectionEmployees.style.textAlign = "left";
      jpApplicantsCont.appendChild(sectionEmployees);

      if(obj[i]["acc"].length == 0){
        var sectionEmployees = document.createElement("p");
        sectionEmployees.innerText = "None";
        sectionEmployees.classList.add("comment");
        sectionEmployees.count = obj[i]["acc"].length;
        sectionEmployees.style.paddingLeft = "8px";
        sectionEmployees.style.textAlign = "left";
        jpApplicantsCont.appendChild(sectionEmployees);
      }

      for(x = 0; x < obj[i]["acc"].length; x++){
        var appcon = document.createElement("div");
        if(x == obj[i]["acc"].length-1){
          appcon.last = true;
        }else{
          appcon.last = false;
        }
        appcon.className = "sbs manageContract";
        var jpApplicants = document.createElement("a");
        jpApplicants.className = "applicant";
        jpApplicants.href = "https://mobitracker.co/"+obj[i]["acc"][x]["handle"];
        jpApplicants.target = "_blank";
        jpApplicants.innerText = obj[i]["acc"][x]["handle"];
        appcon.appendChild(jpApplicants);
        jpApplicantsCont.appendChild(appcon);
        var jpApplicantDesc = document.createElement("p");
        jpApplicantDesc.className = "comment appDesc appDescComp fade";
        jpApplicantDesc.onclick = function(){
          this.classList.toggle("appDescComp");
          this.classList.toggle("fade");
        };
        if(obj[i]["acc"][x]["desc"] != ""){
          jpApplicantDesc.innerText = obj[i]["acc"][x]["desc"];
        }
        appcon.appendChild(jpApplicantDesc);
        if(completed == 0 && markComplete == 0){
          var jpRetract = document.createElement("a");
          jpRetract.className = "rButton highlight-red";
          if(obj[i]["completed"] == 1){
            jpRetract.classList.add("rFaded");
          }
          jpRetract.innerText = "Retract";
          jpRetract.id = x;
          jpRetract.escrow = escrow.ESCROW;
          jpRetract.onclick = function(e){
            manage.open("POST", "../src/contractManage.php");
            manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
            manage.send("c=retract&cid="+e.target.parentElement.parentElement.id+"&id="+e.target.id);
            manage.onload = function(){
              var response = manage.response;
              if(response == "Success"){
                searchCareer(sC);
              }
            };
          }
          appcon.appendChild(jpRetract);
        }else if(markComplete == 1){
          var completeErr = document.createElement("p");
          completeErr.className = "highlight-red hidden";
          completeErr.innerText = "This contract has been marked for completion. If the contractor does not dispute this, you will receive payout after 7 days or when the contractor completes the contract.";
          playerReview.appendChild(completeErr);
        }
      }

      var sectionApplicants = document.createElement("span");
      if(obj[i]["type"] == "O"){
        sectionApplicants.innerText = "Contractors";
      }else{
        sectionApplicants.innerText = "Applicants";
      }
      sectionApplicants.style.paddingLeft = "8px";
      sectionApplicants.style.textAlign = "left";
      jpApplicantsCont.appendChild(sectionApplicants);

      if(obj[i]["apps"].length == 0){
        var sectionApplicants = document.createElement("p");
        sectionApplicants.innerText = "None";
        sectionApplicants.classList.add("comment");
        sectionApplicants.style.paddingLeft = "8px";
        sectionApplicants.style.textAlign = "left";
        jpApplicantsCont.appendChild(sectionApplicants);
      }

      for(x=0;x<obj[i]["apps"].length; x++){
        var appcon = document.createElement("div");
        appcon.className = "sbs manageContract";
        var jpApplicants = document.createElement("a");
        jpApplicants.className = "applicant";
        jpApplicants.href = "https://mobitracker.co/?search="+obj[i]["apps"][x]["handle"];
        jpApplicants.target = "_blank";
        jpApplicants.innerText = obj[i]["apps"][x]["handle"];
        appcon.appendChild(jpApplicants);
        jpApplicantsCont.appendChild(appcon);
        var jpApplicantDesc = document.createElement("p");
        jpApplicantDesc.className = "comment appDesc appDescComp fade";
        jpApplicantDesc.onclick = function(){
          this.classList.toggle("appDescComp");
          this.classList.toggle("fade");
        };
        if(obj[i]["apps"][x]["desc"] != ""){
          jpApplicantDesc.innerText = obj[i]["apps"][x]["desc"];
        }
        appcon.appendChild(jpApplicantDesc);
        var jpAccept = document.createElement("a");
        jpAccept.className = "rButton highlight-green";
        jpAccept.innerText = "Accept";
        jpAccept.id = x;
        jpAccept.escrow = escrow.ESCROW;
        jpAccept.onclick = function(e){
          manage.open("POST", "../src/contractManage.php");
          manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
          manage.send("c=accept&cid="+e.target.parentElement.parentElement.id+"&id="+e.target.id);
          manage.onload = function(){
            var response = manage.response;
            if(response == "Success"){
              searchCareer(sC);
            }
          };
        }
        appcon.appendChild(jpAccept);
        var jpDeny = document.createElement("a");
        jpDeny.className = "rButton highlight-red";
        jpDeny.innerText = "Deny";
        jpDeny.id = x;
        jpDeny.onclick = function(e){
          manage.open("POST", "../src/contractManage.php");
          manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
          manage.send("c=deny&cid="+e.target.parentElement.parentElement.id+"&id="+e.target.id);
          manage.onload = function(){
            var response = manage.response;
            if(response == "Success"){
              searchCareer(sC);
            }
          };
        }
        appcon.appendChild(jpDeny);
      }
      applicantBtn.onclick = function(){
        var x = document.getElementsByClassName("jpAppContainer");
        for (var i = 0; i < x.length ; i++) {
          if(x[i] == this.appContainer){
            this.appContainer.classList.toggle("hidden");
          }else{
            x[i].classList.add("hidden");
          }
        }
      };
      playerReview.appendChild(jpApplicantsCont);
    }
    if(obj[i]["u_creator"] != sessionUser){
      appBtn = document.createElement("a");
      appBtn.className = "rButton highlight-green";
      if(obj[i]["apps"] == sessionUser || obj[i]["acc"] == sessionUser){
        appBtn.classList.remove("highlight-green");
        appBtn.classList.add("highlight-red");
        appBtn.innerText = "Withdraw";
        appBtn.type = obj[i]["type"];
        appBtn.count = i;
        completeBtn = document.createElement("a");
        completeBtn.complete = playerReview.complete;
        completeBtn.markComplete = playerReview.markComplete;
        if(completeBtn.complete == 0 && completeBtn.markComplete == 0){
          completeBtn.className = "rButton highlight-green";
          completeBtn.innerText = "Request Completion";
          completeBtn.id = obj[i]["id"];
          completeBtn.onclick = function(e){
            manage.open("POST", "../src/contractManage.php");
            manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
            manage.send("c=markComplete&cid="+e.target.id);
            manage.onload = function(){
              var response = manage.response;
              searchCareer(sC);
            };
          };
        }
        manageContract.appendChild(completeBtn);
      }else{
        if(obj[i]["type"] == "O"){
          appBtn.innerText = "Hire";
        }else if (obj[i]["type"] == "R") {
          appBtn.innerText = "Apply";
        }
      }
      appBtn.id = obj[i]["id"];
      appDescCont = document.createElement("div");
      appDescCont.className = "appDescCont hidden";

      var appToC = document.createElement(obj[i]);

      var appDesc = document.createElement("input");
      appDesc.className = "appDesc contractSearch";
      appDesc.style.borderRadius = "4px";
      if(obj[i]["type"] == "O"){
        appDesc.placeholder = "Enter a description of your requirements or your Discord tag so they may contact you.";
      }else if (obj[i]["type"] == "R") {
        appDesc.placeholder = "Enter a description of your experience or your Discord tag so they may contact you.";
      }
      appDesc.maxLength = "80";
      appDescCont.appendChild(appDesc);
      manageContract.before(appDescCont);
      appBtn.onclick = function(e){
        var thisDesc = this.parentElement.parentElement.children[1];
        if(e.target.innerText == "Apply" || e.target.innerText == "Hire"){
          thisDesc.classList.toggle("hidden");
          thisDesc.children[0].focus();
        }
        if(thisDesc.children[0].value != "" || e.target.innerText == "Withdraw"){
          apply.open("POST", "../src/contractApply.php");
          apply.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          apply.setRequestHeader(tokenHeader.name,tokenHeader.content);
          if(e.target.innerText == "Withdraw"){
            apply.send("id="+this.id);
          }else if(e.target.innerText == "Apply" || e.target.innerText == "Hire"){
            apply.send("id="+this.id+"&desc="+thisDesc.children[0].value);
          }
          thisDesc.children[0].value = "";
          apply.onload = function(){
            var response = apply.response;
            searchCareer(sC);
          };
        }else{

        }
      }
      manageContract.appendChild(appBtn);
    }else{
      if(obj[i]["apps"].length < 1 && obj[i]["acc"].length < 1){
        var editBtn = document.createElement("a");
        editBtn.editAssist = editAssist;
        editBtn.className = "rButton highlight-green";
        editBtn.innerText = "Edit";
        editBtn.id = obj[i]["id"];
        editBtn.price = obj[i]["price"];
        editBtn.onclick = function(e){
          var editPay = document.createElement("input");
          editPay.className = "userInput numInput form-control";
          editPay.value = this.price;
          editCon = e.target.parentElement.parentElement.children[0].children[1];
          if(this.editAssist > 0){
            tempHold = editCon.children[0].childNodes[this.editAssist+1].nodeValue;
          }else{
            tempHold = editCon.children[0].childNodes[1].nodeValue;
          }
          if(this.editAssist > 0){
            editCon.children[0].childNodes[this.editAssist+1].after(editPay);
            editCon.children[0].childNodes[this.editAssist+1].nodeValue = "\nPay: ";
          }else{
            editCon.children[0].childNodes[1].after(editPay);
            editCon.children[0].childNodes[1].nodeValue = "\nPay: ";
          }
          editPay.after(" aUEC");
          editPay.style.margin = "8px 0 8px 0";

          e.target.classList.add("hidden");
          e.target.nextSibling.classList.add("hidden");
          e.target.previousSibling.classList.add("hidden");

          var editUnsecure = document.createElement("textarea");
          editUnsecure.className = "createComment form-control";
          editUnsecure.maxLength = "500";
          editUnsecure.value = editCon.children[2].innerText;
          editCon.children[2].classList.add("hidden");
          editCon.children[3].classList.add("hidden");
          editCon.appendChild(editUnsecure);
          var editSecure = document.createElement("textarea");
          editSecure.className = "createComment form-control";
          editSecure.maxLength = "100";
          editSecure.style.marginTop = "8px";
          editSecure.value = editCon.children[3].childNodes[1].nodeValue;
          editCon.appendChild(editSecure);

          var editCancel = document.createElement("a");
          editCancel.editAssist = this.editAssist;
          editCancel.className = "rButton highlight-red";
          editCancel.innerText = "Cancel";
          editCancel.onclick = function(){
            editCon.children[2].classList.remove("hidden");
            editCon.children[3].classList.remove("hidden");
            editSecure.remove();
            editUnsecure.remove();
            editCancel.remove();
            editSubmit.remove();
            e.target.classList.remove("hidden");
            e.target.nextSibling.classList.remove("hidden");
            e.target.previousSibling.classList.remove("hidden");
            editPay.remove();
            if(this.editAssist > 0){
              editCon.children[0].childNodes[this.editAssist+1].remove();
              editCon.children[0].childNodes[this.editAssist+1].nodeValue = tempHold;
            }else{
              editCon.children[0].childNodes[2].remove();
              editCon.children[0].childNodes[1].nodeValue = tempHold;
            }
          };
          e.target.parentElement.appendChild(editCancel);
          var editSubmit = document.createElement("a");
          editSubmit.className = "rButton highlight-green";
          editSubmit.innerText = "Submit";
          editSubmit.onclick = function(){
            manage.open("POST", "../src/contractManage.php");
            manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
            manage.send("c=edit&cid="+e.target.id+"&editPrice="+editPay.value+"&editUnsecure="+editUnsecure.value+"&editSecure="+editSecure.value);
            manage.onload = function(){
              var response = manage.response;
              searchCareer(sC);
            };
          };
          e.target.parentElement.appendChild(editSubmit);
        };
        manageContract.appendChild(editBtn);
      }
      if(obj[i]["completed"] == 0 && obj[i]["apps"].length == 0 && obj[i]["acc"].length == 0){
        var remBtn = document.createElement("a");
        remBtn.className = "rButton highlight-red";
        remBtn.innerText = "Remove";
        remBtn.id = obj[i]["id"];
        remBtn.onclick = function(e){
          e.target.onmouseout = function(){
            e.target.innerText = "Remove";
          };
          if(e.target.innerText == "Are you Sure?"){
            manage.open("POST", "../src/contractManage.php");
            manage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            manage.setRequestHeader(tokenHeader.name,tokenHeader.content);
            manage.send("c=delete&cid="+e.target.id);
            manage.onload = function(){
              var response = manage.response;
              if(response == "Success"){
                searchCareer(sC);
              }
            };
          }
          e.target.innerText = "Are you Sure?";
        };
        manageContract.appendChild(remBtn);
      }
    }
    //Hidden Escrow START
    if(escrow.ESCROW == 1 && obj[i]['u_creator'] == sessionUser){
      if(!escrow.ACTIVE){
        var hide = document.createElement("p");
        hide.className = "highlight-red";
        hide.innerText = "This contract is not live and is pending Escrow Confirmation. \n Please give from 12-24 hours for Escrow contracts to be processed. \nThis may be shorter during peak hours.";
        playerReview.appendChild(hide);
      }
    }
    //Hidden Escrow END
    //Creation
    var created_at = document.createElement("p");
    var t = obj[i]["created_at"].split(/[- :]/);
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    created_at.className = "created_at";
    created_at.innerText = d.toLocaleString("en-US", {
        weekday: "short",
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    created_at.innerText = created_at.innerText.replace(",", ""); // Remove the first comma in the date
    playerReview.appendChild(created_at);
    //Creation END
    jobPosting.appendChild(jpContainer);
    section.appendChild(playerReview);
  }
}

var sbc = document.getElementsByClassName("sbc-btn")[0];
sbc.onclick = function(){toggleSB(this.innerText)};
//var sbr = document.getElementsByClassName("sbr-btn")[0];
//sbr.onclick = function(){showSBR()};
var sbt = document.getElementsByClassName("sbt-btn")[0];
sbt.onclick = function(){toggleSB(this.innerText)};
var sbm = document.getElementsByClassName("sbm-btn")[0];
sbm.onclick = function(){toggleSB(this.innerText)};
