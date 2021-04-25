<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function selectKey(){
  $apiKeys = array(
  "eb275472840a55ff74bcca0ba7baced0",
  "c032ae79fa8a389e5b6e2f17a191643e",
  "608c3b491aed563faca4bfef14f70c1c",
  "7d3192f880dee8c748ef4e02ee39b447",
  "c13b1badf9ccd433c90b4160c7664107"
  );

  return $apiKeys[array_rand($apiKeys, 1)];
}

$key = selectKey();

$updateOrgSID = "ASTROLLC";

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
    $orgMembers[$x] = [$m['handle']];
    $x++;
  }
}
var_dump($orgMembers);
echo "!search ".join(" ", $orgMembers);
?>
