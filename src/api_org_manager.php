<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

session_start();
$headers = $_SERVER['HTTP_TOKEN'];
if ($headers == $_SESSION['token']) {
  require_once "config.php";

  if(isset($_GET['page'])){
    if($_GET['page']>1){
      $setPage = htmlentities($_GET['page'], ENT_QUOTES, 'UTF-8');
    }
  }else{
    $setPage = 0;
  }

  $org = "UEMC";
  $sql = "SELECT name, sid FROM organizations WHERE sid = '$org'";
  $result = mysqli_query($link, $sql);
  if(mysqli_num_rows($result) == 0){
    include "api_updateOrg.php";
    $updateStatus = "Updated";
  }else{
    $updateStatus = "Up to date";
  }
  $row = mysqli_fetch_assoc($result);

  $verified = 0;
  $sql = "SELECT JSON_EXTRACT(leaders, '$**.handle') AS leaders, JSON_EXTRACT(members, '$**.handle') AS members, name, logo, sid FROM organizations WHERE sid = '$org'";
  $result = mysqli_query($link, $sql);
  $registered = array();
  $row = mysqli_fetch_assoc($result);
  $orgName = $row['name'];
  $registered = json_decode($row['leaders'], true);
  $sqlLeaders = "";
  $leaderName = array();
  $x=1;
  foreach ($registered as $user => $u) {
    $sqlLeaders = $sqlLeaders."'".$u."',";
    $leaderName[$x] = $u;
    $x++;
  }

  $orgMem = array();
  $orgMem = json_decode($row['members'], true);
  $x=1;
  $sqlOrgMem = "";
  $sqlOrgMem = "'".$orgMem[0]."'";
  foreach ($orgMem as $oMem => $om) {
    $sqlOrgMem = $sqlOrgMem.", '".$orgMem[$x]."'";
    $x++;
  }
  //var_dump($orgMem);


  $logo = $row['logo'];
  $orgInfo = "<img class='orgInfoLogo' src='".$logo."'/><a class='orgInfoName linkme' target='_blank' href='https://robertsspaceindustries.com/orgs/$org'>".$orgName."</a>";
  $maxPages = ceil(count($orgMem)/32);

  $sql = "SELECT username, avatar, verify, signup from players where username IN (".substr($sqlLeaders, 0, -1).");";
  $result = mysqli_query($link, $sql);
  $registered = array();
  while($row = mysqli_fetch_assoc($result)){
    $registered[] = $row;
  }
  //Leaders
  $x=0;
  $rank5 = "";
  foreach ($leaderName as $members) {
    if($registered[$x]['username'] !== ""){
      if(isset($registered[$x]['avatar'])){
        $avatar = $registered[$x]['avatar'];
      }else{
        $avatar = "../src/avatars/avatar_default.jpg";
      }
      $rank5 = $rank5."<div class='bosscontainer sb'><img class='sba' src='".$avatar."'/>";
      if($registered[$x]['signup'] == 1){
        $notRegistered = "<span class='highlight-green'>Registered<span>";
      }else{
        $notRegistered = "<span class='highlight-red'>Not Registered</span>";
      }
      if($registered[$x]['verify'] == 1){
        $verified = "<img class='verified' src='../src/verified.png'>";
      }else{
        $verified = "";
      }
    }
    $rank5 = $rank5."<a href='https://www.mobitracker.co?search=".$members."' class='player-min-name'>".$verified."<p class='player-username'>".$members."</p></a>".$notRegistered."</div>";
    $x++;
  }
  //Leaders
  //Members
  $sql = "SELECT username, avatar, verify, signup from players where username IN (".substr($sqlOrgMem,0,-4).");";
  $result = mysqli_query($link, $sql);
  $registered = array();
  while($row = mysqli_fetch_assoc($result)){
    $registered[] = $row;
  }

  if($setPage>1){
    if($setPage>$maxPages){
      $setPage = ($maxPages-1)*32;
    }else{
      $setPage = ($setPage-1)*32;
    }
    $page = $setPage;
  }else{
    $setPage = 0;
    $page = 1;
  }

  $perPage = 32;
  //var_dump($orgMem);
  //var_dump($registered);
  $orgMembers = "";
  for($x=$setPage; $x<count($orgMem) && $x<($setPage+$perPage); $x++){
    $verified = "";
    for($y=0; $y<count($registered); $y++){
      if($orgMem[$x] == $registered[$y]['username']){
        //echo "<br>".$orgMem[$x].":".$registered[$y]['username']."<br>";
        $username = $orgMem[$x];
        $avatar = $registered[$y]['avatar'];
        if($registered[$y]['signup'] == 1){
          $signup = 1;
        }
        if($registered[$y]['verify'] == 1){
          $verify = 1;
        }
        //echo $username;
        break;
      }else{
        //echo "<br>".$orgMem[$x].":".$registered[$y]['username']."<br>";
        $username = $orgMem[$x];
        $signup = 0;
        $verify = 0;
      }
    }
    if($signup == 1){
      //echo $username;
      $orgMembers =  $orgMembers."<div class='sb'><img class='sba' src='".$avatar."'/>";
      $notRegistered = "<span class='highlight-green'>Registered<span>";
      if($verify == 1){
        $verified = "<img class='verified' src='../src/verified.png'>";
      }
    }else{
      $orgMembers =  $orgMembers."<div class='sb'><img class='sba' src='../src/avatars/avatar_default.jpg'/>";
      $notRegistered = "<span class='highlight-red'>Not Registered</span>";
    }
    $orgMembers =  $orgMembers."<a href='https://www.mobitracker.co?search=".$username."' class='player-min-name'>".$verified."<p class='player-username'>".$username."</p></a>".$notRegistered."</div>";
  }//
  //Members
  mysqli_close($link);
  $emparray = array("leaders" => $rank5, "pagecount" => $maxPages, "members" => $orgMembers, "orgInfo" => $orgInfo, "status" => $updateStatus);
  echo json_encode($emparray);
}else{
  exit();
}
?>
