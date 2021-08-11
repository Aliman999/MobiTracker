<?php
// --------------------------- THIS IS FOR UPDATING ORGANIZATION MEMBERS
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
define('include', TRUE);
$headers = $_SERVER['HTTP_TOKEN'];
if ($headers == $_SESSION['token']) {
  if(isset($_SESSION['loggedin'])){
    require_once "config.php";
    include "api_unique.php";
    if(!$link ) {
      die('Could not connect: ' . mysqli_error());
    }

    $user = "Stesig";
    $rank = 5;

    $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/auto/user/".$user);

    $xmlResult = json_decode($json, true);
    $updateOrgSID = $xmlResult['data']['organization']['sid'];

    $sql = "SELECT sid FROM organizations WHERE sid = '$updateOrgSID'";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);

    if($row['sid'] !== $updateOrgSID){
      $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/auto/organization/".$updateOrgSID);
      $xmlResult = json_decode($json, true);

      $memberCount = $xmlResult['data']['members'];
      $updateOrgName = $xmlResult['data']['name'];
      $updateOrgLogo = $xmlResult['data']['logo'];

      $grossPages = ceil($memberCount/32);

      $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/live/organization_members/".$updateOrgSID."?rank=1");
      $xmlResult = json_decode($json, true);

      $updateOrgLeaders = array();
      $updateOrgMembers = array();
      $x=0;
      foreach ($xmlResult['data'] as $leader => $l) {
        $updateOrgLeaders[$x] = [
            "handle"=>$l['handle'],
            "rank"=>$l['stars']
          ];
          $x++;
      }


      $x=0;
      for($i=0;$i<$grossPages;$i++){
        $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/live/organization_members/".$updateOrgSID."?page=".$i);
        $xmlResult = json_decode($json, true);
        foreach ($xmlResult['data'] as $member => $m){
          if($m['stars'] < $rank){
            $updateOrgMembers[$x] = [
                "handle"=>$m['handle'],
                "rank"=>$m['stars']
              ];
              $x++;
          }
        }
      }
      $supLeaders = new UniqueValues($updateOrgLeaders,"handle");
      $supMembers = new UniqueValues($updateOrgMembers,"handle");
      $leaderInjext = stripslashes(json_encode($supLeaders->getFiltered(), JSON_FORCE_OBJECT));
      $memberInjext = stripslashes(json_encode($supMembers->getFiltered(), JSON_FORCE_OBJECT));
      $sql = "INSERT INTO organizations (name, sid, logo, leaders, members) VALUES ('$updateOrgName', '$updateOrgSID', '$updateOrgLogo', '$leaderInjext', '$memberInjext')";
      mysqli_query($link, $sql);
      mysqli_close($link);
    }
  }else{
    exit();
  }
}else{
  exit();
}
?>
