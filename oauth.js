window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), ];

  if (!accessToken) {
    return document.getElementById('login').style.display = 'block';
  }


  const genAuth = new XMLHttpRequest();
  genAuth.open("POST", "https://discordapp.com/api/oauth2/token?grant_type=identify&code="+code.accessToken);
  genAuth.send();
  genAuth.onload = function (result) {
    console.log(result);
  }
};