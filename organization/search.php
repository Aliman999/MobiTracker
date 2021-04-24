<?php
session_start();
$headers = $_SERVER['HTTP_TOKEN'];
if ($headers == $_SESSION['token']) {
  require_once "config.php";

  //ini_set('display_errors', 1);
  //ini_set('display_startup_errors', 1);
  //error_reporting(E_ALL);


  $inputName = htmlentities($_GET['member'], ENT_QUOTES, 'UTF-8');

  if(isset($_GET['page'])){
    if($_GET['page']>1){
      $setPage = htmlentities($_GET['page'], ENT_QUOTES, 'UTF-8');
    }
  }else{
    $setPage = 0;
  }

  $org = "EVILORG";
  $sql = "SELECT members->'$**.handle' AS members FROM organizations WHERE sid = '$org'";
  $result = mysqli_query($link, $sql);
  $row = mysqli_fetch_assoc($result);

  $orgMem = array();
  $orgMem = json_decode($row['members'], true);
  $sqlMemberName = "";
  $memberName = array();
  $x=0;
  foreach ($orgMem as $oMem => $om) {
    if(strpos($om, $inputName) !== false){
      $sqlMemberName = $sqlMemberName."'".$om."',";
      $memberName[$x] = $om;
      $x++;
    }
  }
  $resultCount = $x;
  $maxPages = ceil($x/32);
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
  //Members
  $sql = "SELECT username, avatar, verify, signup from players where username IN (".substr($sqlMemberName, 0, -1).");";
  $result = mysqli_query($link, $sql);
  $registered = array();
  while($row = mysqli_fetch_assoc($result)){
    $registered[] = $row;
  }
  //var_dump($orgMem);
  //var_dump($registered);
  $orgMembers = "";
  $verified = "";
  for($x=$setPage; $x<$resultCount && $x<($setPage+$perPage); $x++){
    if($memberName[$x] != ""){
      if($registered[$x]['username'] == $memberName[$x]){
        //echo "<br>".$orgMem[$x].":".$registered[$y]['username']."<br>";
        $username = $registered[$x]['username'];
        $avatar = $registered[$x]['avatar'];
        if($registered[$x]['signup'] == 1){
          $signup = 1;
        }
        if($registered[$x]['verify'] == 1){
          $verify = 1;
        }
        //echo $username;
      }else{
        //echo "<br>".$orgMem[$x].":".$registered[$y]['username']."<br>";
        $username = $memberName[$x];
        $signup = 0;
        $verify = 0;
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

    }
  }
  $output = array("result" => $orgMembers, "pageCount" => $maxPages);
  echo json_encode($output);
  //Members
}else{
  exit();
}
?>
