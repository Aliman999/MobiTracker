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
    $cID = $_SESSION['cID'];
    $username = $_SESSION['username'];
    $sql = "UPDATE players SET tcpp = 1 WHERE cID = $cID AND username = '$username';";
    $result = mysqli_query($link, $sql);
    echo $sql;
  }
}else{
 exit();
}
?>
