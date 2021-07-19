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

  const discUser = document.getElementsByName("dusername")[0];
  const discid = document.getElementsByName("discid")[0];
  const username = getCookie("username");
  const cid = getCookie("cid");

  var query = new XMLHttpRequest();
  query.open("POST", "https://mobitracker.co/beta/src/link.php?disc=" + discUser + "&discid=" + discid + "&username=" + username + "&cid" + cid +"&token=p529.FR^;N^h/2CI");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.send();
  query.onload = function () {
    window.close();
  };
}

init();