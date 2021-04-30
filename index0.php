<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$apiKeys = array(
  array("741aec657e32c60effa94d49cca33813", 1000),
  array("db46886588f0f62b4a6c63b20473ce99", 1000),
  array("7e153d95cd2292706273d3927b1a1725", 1000),
  array("4ec889f8fce000f725603ad5fcd4f34b", 1000),
  array("7160193d04bdacf39cbbed64becb061a", 1000)
);

function selectKey(){
  $key = "";
  for($i = 0, $i < length($apiKeys), $i++){
    echo min(array_column($apiKeys, 1));
  }
  return $apiKeys[array_rand($apiKeys, 1)];
}

$key = selectKey();

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
