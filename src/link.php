<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '/src/config.php');

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