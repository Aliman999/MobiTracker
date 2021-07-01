<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

$oldname = $oldavatar = "";
session_start();
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    $sql = "UPDATE players SET tcpp = 1 WHERE cID = $_SESSION['cID'] AND username = $_SESSION['username'];";
    $result = mysqli_query($link, $sql);
  }
}else{
 exit();
}
?>
