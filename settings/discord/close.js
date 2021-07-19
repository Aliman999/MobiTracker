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

  const username = getCookie("username");
  const cid = getCookie("cid");

  

  /*
  var query = new XMLHttpRequest();
  query.open("GET", "https://mobitracker.co/beta/src/link.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.setRequestHeader(tokenHeader.name, tokenHeader.content);
  query.send();
  query.onload = function () {
    window.close();
  };
  */
}

init();