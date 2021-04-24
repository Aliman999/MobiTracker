var header = document.querySelector('header');
var section = document.querySelector('section');
var body = document.getElementsByTagName('body');
var containerHeader = document.getElementsByClassName('container-header')[0];
var containerSection = document.getElementsByClassName('container-section')[0];
var newline = "\r\n";
var node = document.getElementsByClassName("userInput")[0];
var commentCount;
var dataCount;
var bioExist;
var player = null;
var selected = -1;
var editing = 0;
var commented = 0;
var ext = "auto";
var requestURL = 'https://api.starcitizen-api.com/c13b1badf9ccd433c90b4160c7664107/v1/'+ext+'/user/';
var orgURL = 'https://robertsspaceindustries.com/orgs/';
var tokenHeader = document.getElementsByName("token")[0];
var request = new XMLHttpRequest();
var readComments = new XMLHttpRequest();
var readAllComments = new XMLHttpRequest();
var readRating = new XMLHttpRequest();
var recentFlag = new XMLHttpRequest();
var deleteComments = new XMLHttpRequest();
var flagID = new XMLHttpRequest();
var check = 0;

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
}
//USER

function removeFlag(id){
  flagID.open('POST', '../src/report.php', true);
  flagID.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  flagID.setRequestHeader(tokenHeader.name,tokenHeader.content);
  flagID.send("id="+id);
  flagID.onload = function() {
      player = flagID.response;
  }
}
function showPlayer(node){
  request.open('GET', requestURL+node, true);
  if(ext == 'live'){
    ext = 'auto';
    requestURL = 'https://api.starcitizen-api.com/c13b1badf9ccd433c90b4160c7664107/v1/'+ext+'/user/';
  }
  request.responseType = 'json';
  request.send();
  request.onload = function() {
      player = request.response;
      dataCount = 0;
      dataCount = Object.keys(player['data']).length;

      populateHeader(player);
  }
}
function showComment(node){
  var queryString = "?username=" + node;
  readComments.open("GET", "../src/comments.php" + queryString, true);
  readComments.setRequestHeader(tokenHeader.name,tokenHeader.content);
  readComments.send();
  readComments.onreadystatechange = function(){
    if(readComments.readyState == 4){
      var comment = JSON.parse(readComments.response);
      commentCount = 0;
      commentCount = Object.keys(comment).length;
      showReview(comment);
    }
  }
}
function showAllComments(){
  readAllComments.open("GET", "allcomments.php", true);
  readAllComments.send();
  readAllComments.onreadystatechange = function(){
    if(readAllComments.readyState == 4){
      var comment = JSON.parse(readAllComments.response);
      commentCount = 0;
      commentCount = Object.keys(comment).length;
      showReview(comment);
    }
  }
}
window.onload = function(){
    recentFlags();
    showAllComments();
}
function recentFlags(){
  recentFlag.open("GET", "recentFlag.php", true);
  recentFlag.send();
  recentFlag.onreadystatechange = function(){
    if(recentFlag.readyState == 4){
      var comment = JSON.parse(recentFlag.response);
      commentCount = 0;
      commentCount = Object.keys(comment).length;
      showFlagged(comment);
    }
  }
}
function clickUser(userID){
  node.value = userID;

  event.preventDefault();

  clearBox(header);
  clearBox(section);

  header.style.padding = "0px 0px";
  containerHeader.style.display = "none";


  node.value = node.value.replace(/\s/g,'');
  showPlayer(node.value);
  showComment(node.value);
}

function deleteComment(commentID){
  deleteComments.open('POST', 'delete.php');
  deleteComments.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  deleteComments.setRequestHeader(tokenHeader.name,tokenHeader.content);
  deleteComments.send("id="+commentID.id);
  if(deleteComments.readyState == 4){
    commented = 0;
    clearBox(header);
    clearBox(section);
    if(node.value == ""){
      recentFlags();
      showAllComments();
    }
  }
}
function toggle(e){
  if(e.classList.contains("hidden")){
    e.classList.remove("hidden");
  }else{
    e.classList.add("hidden");
  }
}
node.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if(node.value == ""){
      clearBox(header);
      clearBox(section);
      recentFlags();
      showAllComments();
      toggle(header);
    }else{
      toggle(header);
      clearBox(header);
      clearBox(section);

      header.style.padding = "0px 0px";
      containerHeader.style.display = "none";

      node.value = node.value.replace(/\s/g,'');
      showPlayer(node.value);
      showComment(node.value);
    }
  }
});
function clearBox(elementID){
  elementID.innerHTML = "";
}

function populateHeader(jsonObj) {
  if(dataCount > 0){
    header.style.padding = "8px 16px";
    containerHeader.style.display = "block";
  }else{
    header.style.padding = "8px 16px";
    containerHeader.style.display = "block";
    var notFound = document.createElement('p');
    notFound.className = 'notFound';
    notFound.textContent = 'Citizen Not Found';
    header.appendChild(notFound);
  }
  var exists = document.getElementsByClassName("manageEdit commentSubmit")[0];
  if(exists){
    commented = 1;
  }else{
    commented = 0;
  }
  //Refresh
  forceRefresh = document.createElement('img');
  forceRefresh.className = 'refresh';
  forceRefresh.src = "../src/refresh.png";
  forceRefresh.onclick = function(){
    ext = "live";
    requestURL = 'https://api.starcitizen-api.com/c13b1badf9ccd433c90b4160c7664107/v1/'+ext+'/user/';
    clearBox(header);
    showPlayer(node.value);
  };
  header.appendChild(forceRefresh);
  //Refresh END
  //Player ID
  var playerid = document.createElement('p');
  playerid.className = 'playerid';
  playerid.textContent = "Citizen "+jsonObj['data']['profile']['id'];
  header.appendChild(playerid);
  //Player ID END

  //Player Avatar
  var playeravatar = document.createElement("img");
  playeravatar.className = "playeravatar";
  playeravatar.src = jsonObj['data']['profile']['image'];
  header.appendChild(playeravatar);
  //Player Avatar END


  //Player Handle
  var playerinfo = document.createElement('p');
  var handleLink = document.createElement('a');
  var playerPanel = document.createElement('div');

  handleLink.className = "panelLink";
  playerinfo.className = "playerinfo";
  playerPanel.className = 'ptitle';

  playerinfo.textContent = jsonObj['data']['profile']['handle'];

  handleLink.href = jsonObj['data']['profile']['page']['url'];
  handleLink.target = "_blank";

  handleLink.appendChild(playerinfo);
  playerPanel.appendChild(handleLink);
  header.appendChild(playerPanel);
  //Player Handle END

  //Player Org
  var orgLogo = document.createElement('img');
  var orgName = document.createElement('p');
  var orgLink = document.createElement('a');
  var orgPanel = document.createElement('div');
  orgPanel.className = "ptitle";
  orgLink.className = "panelLink";

  orgLogo.className = 'orgLogo';
  orgLogo.src = jsonObj['data']['organization']['image'];


  orgName.className = 'orgName';
  orgName.textContent = jsonObj['data']['organization']['name'];

  orgLink.href = orgURL+jsonObj['data']['organization']['sid'];
  orgLink.target = "_blank";

  header.appendChild(orgPanel);

  orgLink.appendChild(orgName);
  orgPanel.appendChild(orgLogo);
  orgPanel.appendChild(orgLink);

  if(!jsonObj['data']['organization']['image']){
    clearBox(orgPanel);
  }
  //Player Org END

  //Player Badge
  var playerbadge = document.createElement('img');
  var playertitle = document.createElement('p');
  var ptitle = document.createElement('div');
  ptitle.className = "ptitle";

  playertitle.className = 'playertitle';
  playertitle.textContent = jsonObj['data']['profile']['badge'];

  playerbadge.className = 'playerbadge';
  playerbadge.src = jsonObj['data']['profile']['badge_image'];

  header.appendChild(ptitle);
  ptitle.appendChild(playerbadge);
  ptitle.appendChild(playertitle);
  //Player Badge END
  //Rating Container
  var ratingContainer = document.createElement('div');
  ratingContainer.className  = 'ptitle';
  var e = 0;
  var ratingStar = document.createElement('img');
  ratingStar.className = 'rating';
  ratingStar.src = '../../src/star.png';
  var queryString = "?username=" + node.value;
  readRating.open("GET", "../src/rating.php" + queryString, true);
  readRating.send();
  readRating.onreadystatechange = function(){
    if(readRating.readyState == 4){
      var ratings = JSON.parse(readRating.response);
      rating = ratings;
      if(rating !== -1){
        for(e=0; e<5 ; e++){
          if(e==rating){
            ratingStar.src="../src/star-empty.png";
            ratingContainer.appendChild(ratingStar.cloneNode(true));
          }else{
            ratingContainer.appendChild(ratingStar.cloneNode(true));
          }
        }
      }
    }
  }
  header.appendChild(ratingContainer);
  //Rating Container END
  //Player Bio
  var playerbio = document.createElement('p');
  playerbio.className = "playerbio";
  playerbio.textContent = 'Bio:'+ newline + jsonObj['data']['profile']['bio'];
  header.appendChild(playerbio);
  //Player Bio END
}
function showFlagged(comment){
  if(commentCount > 0){
    containerSection.style.display = "block";

    var playerReview = document.createElement('div');
    playerReview.className = 'player-review';
    var playerminContainer = document.createElement('div');
    playerminContainer.className = 'player-min-container titleContainer';
    playerReview.appendChild(playerminContainer);
    var title = document.createElement('p');
    title.innerText = "Flagged Comments";
    title.className = "flagTitle";
    playerminContainer.appendChild(title);
    section.appendChild(playerReview);
  }else{
    containerSection.style.display = "block";

    var playerReview = document.createElement('div');
    playerReview.className = 'player-review';
    var playerminContainer = document.createElement('div');
    playerminContainer.className = 'player-min-container titleContainer';
    playerReview.appendChild(playerminContainer);
    var title = document.createElement('p');
    title.innerText = "Flagged Comments";
    var noFlagged = document.createElement('p');
    noFlagged.innerText = "No flagged comments at this time";
    playerminContainer.appendChild(title);
    playerminContainer.appendChild(noFlagged);
    section.appendChild(playerReview);
  }
  for(var i = 0; i<commentCount; i++){
    editing = 0;
    //Creator Container
    var playerReview = document.createElement('div');
    playerReview.className = 'player-review';
    var playerminContainer = document.createElement('div');
    playerminContainer.className = 'player-min-container';
    playerReview.appendChild(playerminContainer);

    var playerMin = document.createElement('div');
    playerMin.className = 'player-min';
    playerminContainer.appendChild(playerMin);

    var playerminAvatar = document.createElement('img');
    playerminAvatar.className = 'player-min-avatar';
    playerminAvatar.src = comment[i]['avatar'];
    playerMin.appendChild(playerminAvatar);

    var playerminName = document.createElement('a');
    playerminName.className = 'player-min-name';
    var playerUsername = document.createElement('p');
    var playerVerify = document.createElement('img');
    playerVerify.src = "../src/verified.png";
    playerVerify.className = "verified";
    playerUsername.className = 'player-username';
    playerUsername.id = comment[i]['u_creator'];
    if(comment[i]['verify'] == 1){
      playerminName.appendChild(playerVerify);
    }
    playerUsername.innerHTML = comment[i]['u_creator'];
    playerUsername.onclick = function(id){
      clickUser(this.id);
    };
    playerminName.appendChild(playerUsername);
    playerMin.appendChild(playerminName);
    //Creator Container END
    //Rating Container
    var ratingContainer = document.createElement('div');
    ratingContainer.className  = 'rating-container';
    var rating = comment[i]['rating'];
    var e = 0;
    var ratingStar = document.createElement('img');
    ratingContainer.id = rating;
    ratingStar.className = 'rating';
    ratingStar.src = '../src/star.png';

    for(e=0; e<5 ; e++){
      if(e==rating){
        ratingStar.src="../src/star-empty.png";
        ratingContainer.appendChild(ratingStar.cloneNode(true));
      }else{
        ratingContainer.appendChild(ratingStar.cloneNode(true));
      }
    }
    //Rating Container END
    //Comment
    var creatorComment = document.createElement('p');
    var commentContainer = document.createElement('div');
    creatorComment.className = 'comment';
    creatorComment.innerHTML = comment[i]['comment'];
    creatorComment.id = comment[i]['id'];
    commentContainer.className = 'commentContainer';
    commentContainer.appendChild(ratingContainer);
    commentContainer.append(creatorComment);
    playerReview.id = creatorComment.innerHTML;
    playerminContainer.appendChild(commentContainer);
    //Comment END
    //Manage
    var flagCount = document.createElement('p');
    var flagComment = document.createElement('button');
    flagCount.className = 'flagCount';
    flagCount.textContent = "Flagged ("+comment[i]['flag']+")";
    var toUser = document.createElement('p');
    toUser.className = 'toUser';
    toUser.textContent = "To: "+comment[i]['r_player'];
    toUser.id = comment[i]['r_player'];
    toUser.onclick = function(){
      clickUser(this.id);
    }
    flagComment.className = 'manageEdit commentSubmit flag';
    flagComment.id = comment[i]['id'];
    flagComment.innerHTML = "Remove Flags";
    flagComment.onclick = function(){
      removeFlag(this.id);
    };
    commented = 1
    manageComment = document.createElement('div');
    manageComment.className = 'manageComment';
    manageComment.appendChild(flagCount);
    manageComment.appendChild(toUser);
    manageComment.appendChild(flagComment);

    var deleteComment = document.createElement('button');
    deleteComment.className = 'manageEdit commentSubmit flag';
    deleteComment.id = comment[i]['id'];
    deleteComment.innerHTML = 'Delete';
    deleteComment.setAttribute("onclick", "deleteComment(this)");
    manageComment.appendChild(deleteComment);
    commentContainer.appendChild(manageComment);
    //Manage Comment END
    //Creation
    var created_at = document.createElement('p');
    var t = comment[i]['created_at'].split(/[- :]/);
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    created_at.className = 'created_at';
    created_at.innerHTML = d.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
    playerReview.appendChild(created_at);
    section.appendChild(playerReview);
  }
}
function showReview(comment) {
  if(commentCount > 0){
    containerSection.style.display = "block";

    var playerReview = document.createElement('div');
    playerReview.className = 'player-review';
    var playerminContainer = document.createElement('div');
    playerminContainer.className = 'player-min-container titleContainer';
    playerReview.appendChild(playerminContainer);
    var title = document.createElement('p');
    title.innerText = "Recent Comments";
    title.className = "flagTitle";
    playerminContainer.appendChild(title);
    title.parentElement.parentElement.style.border = "0";
    section.appendChild(playerReview);
  }else{
    containerSection.style.display = "block";

    var playerReview = document.createElement('div');
    playerReview.className = 'player-review';
    var playerminContainer = document.createElement('div');
    playerminContainer.className = 'player-min-container';
    playerReview.appendChild(playerminContainer);
    var title = document.createElement('p');
    title.innerText = "Flagged Comments";
    var noFlagged = document.createElement('p');
    noFlagged.innerText = "No flagged comments at this time";
    playerminContainer.appendChild(title);
    playerminContainer.appendChild(noFlagged);
    section.appendChild(playerReview);
  }
  for(var i = 0; i<commentCount; i++){
    editing = 0;
    //Creator Container
    var playerReview = document.createElement('div');
    playerReview.className = 'player-review';
    var playerminContainer = document.createElement('div');
    playerminContainer.className = 'player-min-container';
    playerReview.appendChild(playerminContainer);

    var playerMin = document.createElement('div');
    playerMin.className = 'player-min';
    playerminContainer.appendChild(playerMin);

    var playerminAvatar = document.createElement('img');
    playerminAvatar.className = 'player-min-avatar';
    playerminAvatar.src = comment[i]['avatar'];
    playerMin.appendChild(playerminAvatar);

    var playerminName = document.createElement('a');
    playerminName.className = 'player-min-name';
    var playerUsername = document.createElement('p');
    var playerVerify = document.createElement('img');
    playerVerify.src = "../src/verified.png";
    playerVerify.className = "verified";
    playerUsername.className = 'player-username';
    playerUsername.id = comment[i]['u_creator'];
    if(comment[i]['verify'] == 1){
      playerminName.appendChild(playerVerify);
    }else{
      playerUsername.style.paddingLeft = "8px";
    }
    playerUsername.innerHTML = comment[i]['u_creator'];
    playerUsername.onclick = function(id){
      clickUser(this.id);
    };
    playerminName.appendChild(playerUsername);
    playerMin.appendChild(playerminName);
    //Creator Container END
    //Rating Container
    var ratingContainer = document.createElement('div');
    ratingContainer.className  = 'rating-container';
    var rating = comment[i]['rating'];
    var e = 0;
    var ratingStar = document.createElement('img');
    ratingContainer.id = rating;
    ratingStar.className = 'rating';
    ratingStar.src = '../src/star.png';

    for(e=0; e<5 ; e++){
      if(e==rating){
        ratingStar.src="../src/star-empty.png";
        ratingContainer.appendChild(ratingStar.cloneNode(true));
      }else{
        ratingContainer.appendChild(ratingStar.cloneNode(true));
      }
    }
    //Rating Container END
    //Comment
    var creatorComment = document.createElement('p');
    var commentContainer = document.createElement('div');
    creatorComment.className = 'comment';
    creatorComment.innerHTML = comment[i]['comment'];
    creatorComment.id = comment[i]['id'];
    commentContainer.className = 'commentContainer';
    commentContainer.appendChild(ratingContainer);
    commentContainer.append(creatorComment);
    playerReview.id = creatorComment.innerHTML;
    playerminContainer.appendChild(commentContainer);
    //Comment END
    //Manage
    var flagCount = document.createElement('p');
    var flagComment = document.createElement('button');
    flagCount.className = 'flagCount';
    flagCount.textContent = "Flagged ("+comment[i]['flag']+")";
    var toUser = document.createElement('p');
    toUser.className = 'toUser';
    toUser.textContent = "To: "+comment[i]['r_player'];
    toUser.id = comment[i]['r_player'];
    toUser.onclick = function(){
      clickUser(this.id);
    }
    flagComment.className = 'manageEdit commentSubmit flag';
    flagComment.id = comment[i]['id'];
    flagComment.innerHTML = "Remove Flags";
    flagComment.onclick = function(){
      removeFlag(this.id);
    };
    commented = 1
    manageComment = document.createElement('div');
    manageComment.className = 'manageComment';
    manageComment.appendChild(flagCount);
    manageComment.appendChild(toUser);
    manageComment.appendChild(flagComment);

    var deleteComment = document.createElement('button');
    deleteComment.className = 'manageEdit commentSubmit flag';
    deleteComment.id = comment[i]['id'];
    deleteComment.innerHTML = 'Delete';
    deleteComment.setAttribute("onclick", "deleteComment(this)");
    manageComment.appendChild(deleteComment);
    commentContainer.appendChild(manageComment);
    //Manage Comment END
    //Creation
    var created_at = document.createElement('p');
    var t = comment[i]['created_at'].split(/[- :]/);
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    created_at.className = 'created_at';
    created_at.innerHTML = d.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
    playerReview.appendChild(created_at);
    //Creation END
    if(comment[0]['u_creator'] == sessionUser){
      commented = 1;
    }else{
      commented = 0;
    }
    //Creation END
    section.appendChild(playerReview);
  }
}
