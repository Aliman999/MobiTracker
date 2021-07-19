'use strict';

function init() {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var discUser = document.getElementsByName("dusername")[0];
  discUser = discUser.content;

  var discid = document.getElementsByName("discid")[0];
  discid = discid.content;

  const username = getCookie("username");
  const cid = getCookie("cid");

  var query = new XMLHttpRequest();
  query.open("GET", "https://mobitracker.co/beta/src/link.php?disc=" + discUser.content + "&discid=" + discid.content + "&username=" + username + "&cid=" + cid + "&token=p529.FR^;N^h/2CI");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.send();
  query.onload = function () {
    console.log(query.response);
    //window.close();
  };
}

init();