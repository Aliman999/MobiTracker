<?php
session_start();
header('Content-Type: application/json');

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    $sql = "UPDATE players SET verified = 1 WHERE username = '".$_SESSION['username']."';";
    if(mysqli_query($link, $sql)){
        $_SESSION['verified'] = 1;
    }
  }
} else {
    exit(json_encode(['error' => 'No token.']));
}
?>