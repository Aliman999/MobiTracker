<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "../src/config.php";
$headers = $_SESSION['token'];
if(isset($headers)){
  $sql = "SELECT * FROM players WHERE username = '".$_SESSION['username']."';";
  $result = mysqli_query($link, $sql);
  $row = mysqli_fetch_assoc($result);
  function xp($rep){
    $rep = intval($rep);
    if($rep < 0){
      if($rep < -5){
        return "Dangerous";
      }else if ($rep < 0) {
        return "Sketchy";
      }
    }else{
      if($rep == 0){
        return "Newbie";
      }else if ($rep <= 30) {
        return "Experienced";
      }else if ($rep <= 100) {
        return "Reliable";
      }
    }
  }
  $row['xp'] = xp($row['reviewed_count'])." (".$row['reviewed_count'].")";
  var_dump($row);
}else{
   exit(json_encode(['error' => 'No token.']));
}
