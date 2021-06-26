<?php
session_start();
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
require_once "src/config.php";

$key = $count = $id = "";

if(isset($_GET['id'])){
  $updateOrgSID = $_GET['id'];

  $json = file_get_contents("https://api.starcitizen-api.com/".getKey("reserved")."/v1/live/organization/".$updateOrgSID);
  $xmlResult = json_decode($json, true);
  if($xmlResult['data'] == null){
    exit("API Returned Null");
  }
  $memberCount = $xmlResult['data']['members'];

  $grossPages = ceil($memberCount/32);

  $x=0;
  $orgMembers = array();
  for($i=0;$i<$grossPages;$i++){
    $json = file_get_contents("https://api.starcitizen-api.com/".getKey("reserved")."/v1/live/organization_members/".$updateOrgSID."?page=".$i);
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
  }
}else{
  echo "Add '?id=ORGNAME' to the url";
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div style="display: flex; flex-direction: column; width:600px;">
      <p id="status">Connecting</p>
      <input type="text" name="" value="" id="input">
      <textarea id="output" rows="8" cols="80"></textarea>
    </div>
  </body>
  <script type="text/javascript" src="adwaodiajd.js"></script>
</html>
