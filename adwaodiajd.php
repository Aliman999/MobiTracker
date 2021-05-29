<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
$_SESSION['token'] = "SET";
require_once "src/config.php";

$key = $count = $id = "";

if(isset($_GET['id'])){
  $updateOrgSID = $_GET['id'];

  $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/auto/organization/".$updateOrgSID);
  $xmlResult = json_decode($json, true);
  if($xmlResult['data'] == null){
    exit("API Returned Null");
  }
  $memberCount = $xmlResult['data']['members'];

  $grossPages = ceil($memberCount/32);

  $x=0;
  $orgMembers = array();
  for($i=0;$i<$grossPages;$i++){
    $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/live/organization_members/".$updateOrgSID."?page=".$i);
    $xmlResult = json_decode($json, true);
    foreach ($xmlResult['data'] as $member => $m){
      $orgMembers[$x] = $m['handle'];
      $x++;
    }
  }
  $orgMembers = array_unique($orgMembers);
  $orgMembers = array_values($orgMembers);
  if(count($orgMembers) == 0){
    echo "All members of ".$updateOrgSID." are redacted/hidden";
  }else{
    echo "!search ".join("\n", $orgMembers);
  }
}else{
  echo "Add '?id=ORGNAME' to the url";
}
