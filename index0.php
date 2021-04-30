<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$_SESSION['token'] = "SET";
require_once "src/config.php";

$sql = "SELECT apiKey FROM apiKeys where note like '%index0.php%' GROUP BY apiKey, count ORDER BY count desc LIMIT 1;";
$result = mysqli_query($link, $sql);
$key = mysqli_fetch_assoc($result);
var_dump($key);



$updateOrgSID = "EVILORG";
/*
$json = file_get_contents("https://api.starcitizen-api.com/".$key."/v1/auto/organization/".$updateOrgSID);
$xmlResult = json_decode($json, true);

$memberCount = $xmlResult['data']['members'];

$grossPages = ceil($memberCount/32);

$x=0;
$orgMembers = array();
for($i=0;$i<$grossPages;$i++){
  $json = file_get_contents("https://api.starcitizen-api.com/".$key."/v1/live/organization_members/".$updateOrgSID."?page=".$i);
  $xmlResult = json_decode($json, true);
  foreach ($xmlResult['data'] as $member => $m){
    $orgMembers[$x] = $m['handle'];
    $x++;
  }
}
echo "!search ".join("\n", $orgMembers);
