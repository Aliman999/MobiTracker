<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '/src/config.php');

$headers = $_SESSION['token'];
if(isset($headers)){
  $sql = "SELECT *, players.username username, players.cID cID, discord.cID dcID, discord.username dusername  FROM players LEFT JOIN discord ON discord.username LIKE CONCAT('%', '".$_SESSION['username']."', '%') WHERE players.username = '".$_SESSION['username']."';";
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
    $row['faction'] = "Lawful";
  }else{
    $row['faction'] = "Unlawful";
  }
  if($row['verify'] === '1'){
    $row['verifyClass'] = 'highlight-green';
    $row['verify'] = 'Verified';
  }else{
    $row['verifyClass'] = 'highlight-red';
    $row['verify'] = 'Not Verified';
  }
  $row['dusername'] = json_decode($row['dusername']);
  $row['dcID'] = json_decode($row['dcID']);
  if(strpos($row['email'], "$2y$10$") !== false){
    $row['email'] = "Encrypted";
  }
  $row['career'] = array();
  if($row['crew'] == 1){
    $row['crew'] = "Crew";
    array_push($row['career'], "Crew");
  }
  if($row['escort'] == 1){
    array_push($row['career'], "Escort");
  }
  if($row['explorer'] == 1){
    array_push($row['career'], "Explorer");
  }
  if($row['miner'] == 1){
    array_push($row['career'], "Miner");
  }
  if($row['pirate'] == 1){
    array_push($row['career'], "Pirate");
  }
  if($row['trader'] == 1){
    array_push($row['career'], "Trader");
  }
  //echo json_encode($row);
  var_dump($row);
}else{
   exit(json_encode(['error' => 'No token.']));
}
