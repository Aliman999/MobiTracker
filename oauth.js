window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get('access_token');

  const genAuth = new XMLHttpRequest();
  genAuth.open("POST", "https://discordapp.com/api/oauth2/token?grant_type=identify&code="+accessToken);
  genAuth.send();
  genAuth.onload = function () {
    console.log(genAuth.response);
  }
};