<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'login');
define('DB_PASSWORD', 'Ninjaman');
define('DB_NAME', 'users');

$keyType = "Main";

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

function getKey(){
  global $id, $key, $count, $link;
  $sql = "SELECT id, apiKey FROM apiKeys WHERE note like '%main%' GROUP BY id, apiKey, count ORDER BY count desc LIMIT 1;";
  $result = mysqli_query($link, $sql);
  $key = mysqli_fetch_assoc($result);
  $id = $key['id'];
  $key = $key['apiKey'];
  $sql = "UPDATE apiKeys SET count = count-1 WHERE id = $id";
  $result = mysqli_query($link, $sql);
  return $key;
}

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$_SESSION['token'] = "p529.FR^;N^h/2CI";

$headers = "p529.FR^;N^h/2CI";
if(isset($headers)){
  var_dump($_GET);
  if($_GET['token'] === $headers){
    $cid = json_encode(array($_GET['cid']));
    $username = json_encode(array($_GET['username']));
    $sql = "INSERT INTO `discord` (`discUser`, `discID`, `cID`, `username`, `priority`) VALUES (`".$_GET['disc']."`, `".$_GET['discid']."`, `".$cid."`, `".$username."`, `7`)";
    if(mysqli_query($link, $sql)){
      echo "Success";
    }else{
      mysqli_error($link);
    }
  }else{

  }
}else{
  exit(json_encode(['error' => 'No token.']));
}