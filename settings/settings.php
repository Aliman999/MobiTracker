<?php
define('include', TRUE);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/*
if(!$_SESSION['privilage']){
  exit("503 Forbidden. This is not publicly accessible at this time.");
}
*/


include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '/src/config.php');

$headers = $_SESSION['token'];
if(isset($headers)){
  $debug = "";
  if(!isset($_GET['debug'] )){
    $debug = $_SESSION['username'];
  }else{
    $debug = $_GET['debug'];
  }
  $sql = "SELECT *, players.username username, players.cID cID, discord.cID dcID, discord.username dusername  FROM players LEFT JOIN discord ON discord.username LIKE CONCAT('%', '".$debug."', '%') WHERE players.username = '".$debug."';";
  $result = mysqli_query($link, $sql);
  $row = mysqli_fetch_assoc($result);
  unset($row['password']);
  
  $row['rating'] = $row['avgRating']."/5 Stars (".$row['reviewed_count'].")";
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
  $row['dusername'] = json_decode($row['dusername'], true);
  $row['dcID'] = json_decode($row['dcID'], true);
  if($row['dcID']){
    if(count($row['dcID']) > 0){
      $x = 0;
      foreach($row['dcID'] as $cid){
        if($cid === ""){
          $row['dcID'][$x] = "N/A";
        }else{
          $row['dcID'][$x] = '#'.$cid;
        }
        $x++;
      }
    }
  }
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
  //var_dump($row);
}else{
   exit(json_encode(['error' => 'No token.']));
}
