<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$_SESSION['token'] = "SET";
require_once "src/config.php";

$key = $count = $id = "";

function getKey(){
  global $id, $key, $count, $link;
  $sql = "SELECT id, apiKey, count FROM apiKeys WHERE note like '%index0.php%' GROUP BY apiKey, count ORDER BY count desc LIMIT 1;";
  $result = mysqli_query($link, $sql);
  $key = mysqli_fetch_assoc($result);
  $id = $key['id'];
  $count = $key['count'];
  $key = $key['apiKey'];
  return $key;
}

function setKey(){
  global $id, $key, $count, $link;
  if($key != ""){
    $count = $count-1;
    $sql = "UPDATE apiKeys SET count = $count WHERE id = $id";
    mysqli_query($link, $sql);
  }else{
    return "No Key";
  }
}

$updateOrgSID = "MONGOOSE";

$json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/auto/organization/".$updateOrgSID);
$xmlResult = json_decode($json, true);

$memberCount = $xmlResult['data']['members'];

$grossPages = ceil($memberCount/32);

$x=0;
$orgMembers = array();
for($i=0;$i<$grossPages;$i++){
  $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/live/organization_members/".$updateOrgSID."?page=".$i);
  setKey();
  $xmlResult = json_decode($json, true);
  foreach ($xmlResult['data'] as $member => $m){
    $orgMembers[$x] = $m['handle'];
    $x++;
  }
}
echo "!search ".join("\n", $orgMembers);
