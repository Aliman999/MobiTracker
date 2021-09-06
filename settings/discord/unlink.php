<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    $sql = "SELECT username, cID FROM discord WHERE username LIKE '%" . $_SESSION["username"] . "%';";
    $result = mysqli_query($link, $sql);
    echo $sql;
    $row = mysqli_fetch_assoc($result);
    $row = json_decode($row['username'], true);
    var_dump($row);
    //$sql = "UPDATE discord SET (`username`, `cID`) VALUES (null, null) WHERE discUser LIKE '%".$_SESSION["username"]."%';";

    //
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
