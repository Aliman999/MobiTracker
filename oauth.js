window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get('access_token');

  fetch("https://discordapp.com/api/oauth2/token", {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 
      'grant_type': 'identify',
      'code':accessToken,
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    },
  })
  .then(res => res.json())
  .then(json => console.log(json))
};