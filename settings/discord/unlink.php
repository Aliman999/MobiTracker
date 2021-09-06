<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('include', TRUE);

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . DIRECTORY_SEPARATOR . '..'. '/src/config.php');
    $sql = "SELECT username, cID FROM discord WHERE username LIKE '%" . $_SESSION["username"] . "%';";
    $result = mysqli_query($link, $sql);
    echo $sql;
    $row = mysqli_fetch_assoc($result);
    $row->username = json_decode($row->username, true);
    //$sql = "UPDATE discord SET (`username`, `cID`) VALUES (null, null) WHERE discUser LIKE '%".$_SESSION["username"]."%';";

    //
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
