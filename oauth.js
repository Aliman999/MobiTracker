window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get('access_token');

  fetch("https://discordapp.com/api/oauth2/token?grant_type=identify&code=", {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 
      'grant_type': 'identify',
      'code':accessToken,
      'Access-Control-Allow-Headers'
    },
  })
  .then(res => res.json())
  .then(json => console.log(json))
};