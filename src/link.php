<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '/src/config.php');

$headers = "p529.FR^;N^h/2CI";
if(isset($headers)){
  if($_POST['token'] === $headers){
    $cid = json_encode(array($_POST['cid']));
    $username = json_encode(array($_POST['username']));
    $sql = "INSERT INTO `discord` (`discUser`, `discID`, `cID`, `username`, `priority`) VALUES (`".$_POST['disc']."`, `".$_POST['discid']."`, `".$cid."`, `".$username."`, `7`)";
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