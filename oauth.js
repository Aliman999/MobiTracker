window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get('access_token');
  const tokenUrl = "https://discordapp.com/api/oauth2/token";
  const UserUrl = "https://discordapp.com/api/users/@me";
  data = {
    'client_id': '751252617451143219',
    'client_secret': 'a7p2OQShjYQApq99f9zv2rjsz2_6Dg1Q',
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': 'https://mobitracker.co/beta/',
    'scope': 'identify'
  }
  header = {
    'method': 'post',
    'Content-Type': 'application/x-www-form-urlencoded',
    'payload': data
  }
  fetch("https://discordapp.com/api/oauth2/token", header)
  .then(res => res.json())
  .then(json => console.log(json))
};