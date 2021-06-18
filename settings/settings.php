<?php
session_start();

$headers = $_SESSION['token'];

if(isset($headers)){
  $sql = "SELECT * FROM players WHERE username = '".$_SESSION['username']."';";
  $result = mysqli_query($link, $sql);
  $row = mysqli_fetch_assoc($result);
  var_dump($row);
}else{
   exit(json_encode(['error' => 'No token.']));
}
