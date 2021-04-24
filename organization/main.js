var header = document.querySelector('header');
var section = document.querySelector('section');
var containerHeader = document.getElementsByClassName('container-header')[0];
var containerSection = document.getElementsByClassName('container-section')[0];
var bossContainer = document.getElementById('bossContainer');
var pageContainer = document.getElementsByClassName('pageContainer');
var node = document.getElementById('userInput');
var nodeContainer = document.getElementById('inputContainer');
var orgInfo = document.getElementById('orgInfo');
var tokenHeader = document.getElementsByName("token")[0];
var collapseBoss = document.getElementsByClassName('collapse')[0];
collapseBoss.innerHTML = "&#9650;";
colB = 0;
var collapseMembers = document.getElementsByClassName('collapse')[1];
collapseMembers.innerHTML = "&#9650;";
colM = 0;
var savedPage = 1;
var savedSearch = "";
var orgMembers = new XMLHttpRequest();
var searchMembers = new XMLHttpRequest();

window.onload = function(){
  org(1);
  collapseBoss.onclick = function(){
    toggleLeaders();
  };
  collapseMembers.onclick = function(){
    toggleMembers();
  };
};

function toggleLeaders(){
  if(colB == 0){
    collapseBoss.innerHTML = "&#9660;";
    bossContainer.style.display = "none";
    colB = 1;
  }else{
    collapseBoss.innerHTML = "&#9650;";
    bossContainer.style.display = "grid";
    colB = 0;
  }
}

node.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    savedSearch = node.value;
    search(savedSearch);
  }
});

function toggleMembers(){
  if(colM == 0){
    collapseMembers.innerHTML = "&#9660;";
    for(var x = 1; x<containerHeader.children.length; x++){
      containerHeader.children[x].style.display = "none";
    }
    colM = 1;
  }else{
    collapseMembers.innerHTML = "&#9650;";
    for(var x = 2; x<containerHeader.children.length; x++){
      containerHeader.children[x].style.display = "flex";
    }
    containerHeader.children[1].style.display = "block";
    header.style.display = "grid";
    colM = 0;
  }
}

function org(page){
  var orgPage = page;
  orgMembers.open('GET', '../src/api_org_manager.php?page='+page);
  orgMembers.setRequestHeader(tokenHeader.name,tokenHeader.content);
  orgMembers.responseType = 'json';
  orgMembers.send();
  orgMembers.onload = function() {
    members = orgMembers.response;
    displayMembers(members['members']);
    if(bossContainer.children.length == 0){
      bossContainer.style.display = "grid";
      header.style.display = "grid";
      orgInfo.innerHTML = members['orgInfo'];
      bossContainer.innerHTML = members['leaders'];
    }
    node.style.display = "inline-block";
    pages(orgPage, members['pagecount']);
  }
}

function displayMembers(members){
  header.innerHTML = members;
}

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
    var t = p;
    if(p>1){
      t=p-1;
    }
    if(p>2){
      prePages.id = p-1;
      pageContainer[x].appendChild(prePages.cloneNode(true));
      sPages.innerText = "1";
      sPages.id = "1";
      pageContainer[x].appendChild(sPages.cloneNode(true));
      pageContainer[x].appendChild(ellisis.cloneNode(true));
    }
    for(var i=t; i<(t+3) && i<=m; i++){
      if(p==i){
        sPages.className = "page linkme current";
      }else{
        sPages.className = "page linkme notcurrent";
      }
      if(i==1 && p<=2){
        sPages.style.marginLeft = "25px";
      }else{
        sPages.style.marginLeft = "0";
      }
      sPages.innerText = i;
      sPages.id = i;
      pageContainer[x].appendChild(sPages.cloneNode(true));
    }
    if(m>3 && p<(m-1)){
      postPages.id = p+1;
      sPages.innerText = m;
      sPages.id = m;
      pageContainer[x].appendChild(ellisis.cloneNode(true));
      pageContainer[x].appendChild(sPages.cloneNode(true));
      pageContainer[x].appendChild(postPages.cloneNode(true));
    }
    var page = document.getElementsByClassName('page');
    for(var i=0;i<page.length;i++){
      if(v == 0){
        page[i].onclick = function(){
          org(parseInt(this.id));
        };
      }else{
        page[i].onclick = function(){
          search(savedSearch, parseInt(this.id));
        };
      }
    }
  }
}

function search(name, page){
  if(!page){
    page = 1;
  }
  if(name != ""){
    searchMembers.open('GET', 'search.php?member='+name+"&page="+page);
    searchMembers.setRequestHeader(tokenHeader.name,tokenHeader.content);
    searchMembers.responseType = 'json';
    searchMembers.send();
    searchMembers.onload = function() {
      var member = searchMembers.response;
      displayMembers(member['result']);
      pages(page, member['pageCount'], 1);
    };
  }else{
    org(savedPage);
  }
}
