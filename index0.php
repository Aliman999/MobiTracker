<?php
  require_once "config.php";
  if(!$link ) {
    die('Could not connect: ' . mysqli_error());
  }

  $user = "Stesig";
  $rank = 5;
  $json = file_get_contents("https://api.starcitizen-api.com/".$key."/v1/auto/organization/EVILORG");
  $xmlResult = json_decode($json, true);

  $memberCount = $xmlResult['data']['members'];
  $updateOrgName = $xmlResult['data']['name'];
  $updateOrgLogo = $xmlResult['data']['logo'];

  $grossPages = ceil($memberCount/32);

  $json = file_get_contents("https://api.starcitizen-api.com/".$key."/v1/live/organization_members/".$updateOrgSID."?rank=1");
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
    $json = file_get_contents("https://api.starcitizen-api.com/".$key."/v1/live/organization_members/".$updateOrgSID."?page=".$i);
    $xmlResult = json_decode($json, true);
    foreach ($xmlResult['data'] as $member => $m){
      if($m['stars'] < $rank){
        $updateOrgMembers[$x] = [$m['handle']];
        $x++;
      }
    }
  }
  echo "!search ".join(" ", $updateOrgMembers);
?>
