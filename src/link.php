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
  if($_GET['token'] === $headers){
    $cid = json_encode(array($_GET['cid']));
    $username = json_encode(array($_GET['username']));
    $discord = $_GET['disc']."#".$_GET['discriminator'];
    $sql = "INSERT INTO `discord` (`discUser`, `discID`, `cID`, `username`) VALUES ('".$discord."', ".$_GET['discid'].", '".$cid."', '".$username."'); INSERT INTO `priority` (`discID`, `cID`, `value`) VALUES (".$_GET['discid'].", ".$_GET['cid'].", 8);";
    if(mysqli_multi_query($link, $sql)){
      echo "Success";
      //echo $sql;
    }else{
      echo "Failed";
      //mysqli_error($link);
    }
  }else{

  }
}else{
  exit(json_encode(['error' => 'No token.']));
}