<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'login');
define('DB_PASSWORD', 'Ninjaman');
define('DB_NAME', 'users');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if($link === false){
  die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "SELECT * FROM apiKeys;";

$result = mysqli_query($link, $sql);
$keys = array();
while($row = mysqli_fetch_assoc($result)){
  $keys[] = $row;
}
for($i = 0; $i < count($keys); $i++){
  $json = file_get_contents("https://api.starcitizen-api.com/".$keys[$i]['apiKey']."/v1/me");
  $json = json_decode($json, true);
  if($json['data']['value'] !== $keys[$i]['count']){
    $sql = "UPDATE apiKeys SET count = ".$json['data']['value']." WHERE apiKey = '".$keys[$i]['apiKey']."'";
    echo $sql;
    mysqli_query($link, $sql);
  }
}
