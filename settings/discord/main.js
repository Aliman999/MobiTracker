function init() {
  query.open("GET", "https://mobitracker.co/beta/src/verify.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.setRequestHeader(tokenHeader.name, tokenHeader.content);
  query.onload = null;
  query.send();
}