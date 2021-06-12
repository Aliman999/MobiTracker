<?php
// ------------------------------  THIS IS FOR UPDATING INDIVIDUAL PLAYERS ORG AND AFFIL
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    $playerOrgs = array();
    if($countOrgs>0){
      for($i=0;$i<$countOrgs;$i++){
        $playerOrgs[$i] = [
            "sid"=>$orgSID[$i]['sid'],
            "rank"=>$orgSID[$i]['rank']
        ];
      }
    }
    if($countOrgs>0){
      $orgInjext = stripslashes(json_encode($playerOrgs, JSON_FORCE_OBJECT));
      $sql = "UPDATE players SET organization = '$orgInjext' WHERE cID = $userID;";
      mysqli_query($link, $sql);
      mysqli_close($link);
      //echo $sql;
    }
  }
}else{
 exit();
}
?>
