function init() {
  query.open("GET", "https://mobitracker.co/beta/src/verify.php");
  query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  query.setRequestHeader(tokenHeader.name, tokenHeader.content);
  query.onload = null;
  query.send();
}

function receiveMessage(test){
  console.log(test);
}

function auth(){
  let windowObjectReference = null;
  let previousUrl = null;

  const openSignInWindow = (url, name) => {
    // remove any existing event listeners
    window.removeEventListener('message', receiveMessage);

    // window features
    const strWindowFeatures =
      'toolbar=no, menubar=no, width=600, height=800, top=100, left=100';

    if (windowObjectReference === null || windowObjectReference.closed) {
      /* if the pointer to the window object in memory does not exist
        or if such pointer exists but the window was closed */
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      /* if the resource to load is different,
        then we load it in the already opened secondary window and then
        we bring such window back on top/in front of its parent window. */
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      /* else the window reference must exist and the window
        is not closed; therefore, we can bring it back on top of any other
        window with the focus() method. There would be no need to re-create
        the window or to reload the referenced resource. */
      windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener('message', event => receiveMessage(event), false);
    // assign the previous URL
    previousUrl = url;
  };

  openSignInWindow("https://discord.com/api/oauth2/authorize?client_id=751252617451143219&redirect_uri=https%3A%2F%2Fmobitracker.co%2Fbeta%2Fsettings%2Fdiscord%2Foauth.php&response_type=code&scope=identify", "Debug");
}
function close(){
  window.close();
}

auth();