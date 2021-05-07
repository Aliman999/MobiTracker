<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$_SESSION['token'] = "SET";
require_once "src/config.php";

$key = $count = $id = "";

function getKey(){
  global $id, $key, $count, $link;
  $sql = "SELECT id, apiKey, count FROM apiKeys WHERE note like '%Reserved%' GROUP BY id, apiKey, count ORDER BY count desc LIMIT 1;";
  $result = mysqli_query($link, $sql);
  $key = mysqli_fetch_assoc($result);
  $id = $key['id'];
  $count = $key['count'];
  $key = $key['apiKey'];
  $sql = "UPDATE apiKeys SET count = count-1 WHERE id = $id";
  $result = mysqli_query($link, $sql);
  return $key;
}

if(isset($_GET['id'])){
  $updateOrgSID = $_GET['id'];

  $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/auto/organization/".$updateOrgSID);
  $xmlResult = json_decode($json, true);

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
  if(count($orgMembers) == 0){
    echo "All members of ".$updateOrgSID." are redacted/hidden";
    echo "https://api.starcitizen-api.com/".getKey()."/v1/live/organization_members/".$updateOrgSID;
  }else{
    echo "!search ".join("\n", $orgMembers);
  }
}else{
  echo "Add '?id=ORGNAME' to the url";
}
