const tokenHeader = document.getElementsByName("token")[0];
const getUser = new XMLHttpRequest();
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
  const response = getUser.response;
  /*
  sessionStorage.setItem("session", response["session"]);
  sessionStorage.setItem("sessionUser", response["sessionUser"]);
  sessionStorage.setItem("comcount", response["comcount"]);
  sessionStorage.setItem("search", response["search"]);
  sessionStorage.setItem("limited", response["limited"]);
  sessionStorage.setItem("verified", response["verified"]);
  sessionStorage.setItem("flagged", response["flagged"]);
  sessionStorage.setItem("faction", response["faction"]);
  */
}
export session, sessionUser, comcount, search, limited, verified, flagged, faction;
