<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'login');
define('DB_PASSWORD', 'Ninjaman');
define('DB_NAME', 'users');

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

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
      echo "Failed";
      echo "\n".$sql;
      mysqli_error($link);
    }
  }else{

  }
}else{
  exit(json_encode(['error' => 'No token.']));
}