<?php
session_start();
var_dump($_SESSION);
if(isset($_SESSION['loggedin'])){
  unset($_SESSION['access_token']);
  setcookie("Login", json_encode($_SESSION), time()+3600, "/", "mobitracker.co", 1, 1);
  sleep(10);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('max_execution_time', 300); //300 seconds = 5 minutes. In case if your CURL is slow and is loading too much (Can be IPv6 problem)
error_reporting(E_ALL);
$ch = curl_init();

define('OAUTH2_CLIENT_ID', '751252617451143219');
define('OAUTH2_CLIENT_SECRET', 'a7p2OQShjYQApq99f9zv2rjsz2_6Dg1Q');

$authorizeURL = 'https://discord.com/api/oauth2/authorize';
$tokenURL = 'https://discord.com/api/oauth2/token';
$apiURLBase = 'https://discord.com/api/users/@me';

// Start the login process by sending the user to Discord's authorization page
if(get('action') == 'login') {
  $params = array(
    'client_id' => OAUTH2_CLIENT_ID,
    'redirect_uri' => 'https://mobitracker.co/settings/discord/oauth.php',
    'response_type' => 'code',
    'scope' => 'identify'
  );

  // Redirect the user to Discord's authorization page
  header('Location: https://discord.com/api/oauth2/authorize' . '?' . http_build_query($params));
}


// When Discord redirects the user back here, there will be a "code" and "state" parameter in the query string
if(get('code')) {
  // Exchange the auth code for a token
  $token = apiRequest($tokenURL, array(
    "grant_type" => "authorization_code",
    'client_id' => OAUTH2_CLIENT_ID,
    'client_secret' => OAUTH2_CLIENT_SECRET,
    'redirect_uri' => 'https://mobitracker.co/settings/discord/oauth.php',
    'code' => get('code')
  ));
  $logout_token = $token->access_token;
  $_SESSION['access_token'] = $token->access_token;

  var_dump($_SESSION);
  $user = apiRequest($apiURLBase);

  echo '<meta name="dusername" content="'.$user->username.'">';
  
  echo '<meta name="discriminator" content="'.$user->discriminator.'">';
  echo '<meta name="discid" content="'.$user->id.'">';

  echo '<script src="close.js?id=3"></script>';
  //header('Location: ' . $_SERVER['PHP_SELF']);
}

if(session('access_token')) {
  
} else {
  echo '<p><a href="?action=login" target="_blank">Log In</a></p>';
}


if(get('action') == 'logout') {
  // This must to logout you, but it didn't worked(

  $params = array(
    'access_token' => $logout_token
  );

  // Redirect the user to Discord's revoke page
  header('Location: https://discord.com/api/oauth2/token/revoke' . '?' . http_build_query($params));
  die();
}

function apiRequest($url, $post=FALSE, $headers=array()) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

  $response = curl_exec($ch);


  if($post)
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));

  $headers[] = 'Accept: application/json';

  if(session('access_token'))
    $headers[] = 'Authorization: Bearer ' . session('access_token');

  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  $response = curl_exec($ch);
  return json_decode($response);
}

function get($key, $default=NULL) {
  return array_key_exists($key, $_GET) ? $_GET[$key] : $default;
}

function session($key, $default=NULL) {
  return array_key_exists($key, $_SESSION) ? $_SESSION[$key] : $default;
}
?>