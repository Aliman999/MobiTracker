window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

  fetch('https://discord.com/api/users/@me', {
    headers: {
      method: 'post',
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then(result => result.json())
    .then(response => {
      const { username, discriminator } = response;
      document.getElementById('info').innerText += ` ${username}#${discriminator}`;
    })
    .catch(console.error);
};