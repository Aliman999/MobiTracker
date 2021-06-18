<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "../src/config.php";
$headers = $_SESSION['token'];
if(isset($headers)){
  $sql = "SELECT *, players.username username, players.cID cID FROM players LEFT JOIN discord ON discord.username LIKE CONCAT('%', '".$_SESSION['username']."', '%') WHERE players.username = '".$_SESSION['username']."';";
  echo $sql."\n\n";
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
  unset($row['password']);
  $row['xp'] = xp($row['reviewed_count'])." (".$row['reviewed_count'].")";
  if($row['faction'] === '0'){
    $row['faction'] = "Legal";
  }else{
    $row['faction'] = "Illegal";
  }
  if($row['verify'] === '1'){
    $row['verifyClass'] = 'highlight-green';
    $row['verify'] = 'Verified';
  }else{
    $row['verifyClass'] = 'highlight-red';
    $row['verify'] = 'Not Verified';
  }
  if(strpos($row['email'], "$2y$10$") !== false){
    $row['email'] = "Encrypted";
  }
  echo json_encode($row);
}else{
   exit(json_encode(['error' => 'No token.']));
}
