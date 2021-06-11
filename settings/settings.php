<?php
session_start();

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    $sql = "";
    $result = mysqli_query($link, $sql);
    $emparray = array();
    $row = mysqli_fetch_assoc($result);
    foreach ($registered as $user => $u) {
      $sqlLeaders = $sqlLeaders."'".$u."',";
      $leaderName[$x] = $u;
      $x++;
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
