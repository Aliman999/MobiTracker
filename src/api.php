<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$oldname = $oldavatar = "";
session_start();
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    foreach ($_GET as $get => $g) {
      mysqli_real_escape_string($link, $g);
    }
    if(isset($_GET['username'])){
      $username = htmlentities($_GET['username'], ENT_QUOTES, 'UTF-8');
    }else{
      $username = $_SESSION['username'];
    }
    if(isset($_GET['v'])){
      $version = htmlentities($_GET['v'], ENT_QUOTES, 'UTF-8');
    }else{
      $version = "auto";
    }
    if(isset($_GET['force'])){
      $forceOrgRefresh = htmlentities($_GET['force'], ENT_QUOTES, 'UTF-8');
    }else{
      $forceOrgRefresh = false;
    }

    $orgs = "";
    $json = file_get_contents("https://api.starcitizen-api.com/".getKey()."/v1/".$version."/user/".$username);

    $xmlResult = json_decode($json, true);

    echo $json;

    $userID = substr($xmlResult['data']['profile']['id'], 1);
    $username = $xmlResult['data']['profile']['handle'];
    $avatar = $xmlResult['data']['profile']['image'];


    $sql = "SELECT username, avatar, organization->'$**.*' as organization FROM players WHERE cID = $userID;";
    $result = mysqli_query($link, $sql);
    $emparray = array();
    $row = mysqli_fetch_assoc($result);
    $oldname = $row['username'];
    $oldavatar = $row['avatar'];
    $orgSID = array();

    $countOrgs = 0;

    if(isset($xmlResult['data']['organizations'])){
      $orgSID[$countOrgs]['sid'] = $xmlResult['data']['organization']['sid'];
      $orgSID[$countOrgs]['rank'] = $xmlResult['data']['organization']['stars'];
      $countOrgs++;
    }
    foreach ($xmlResult['data']['affiliation'] as $affil => $a) {
      if($a['name'] !== ""){
        $orgSID[$countOrgs]['sid'] = $a['sid'];
        $orgSID[$countOrgs]['rank'] = $a['stars'];
        $countOrgs++;
      }
    }
    var_dump($orgSID);
    include "api_userOrg.php";

    if($oldname !== $username){
      $sql = "UPDATE players SET username = '$username', avatar = '$avatar' WHERE cID = $userID;";
      $result = mysqli_query($link, $sql);

      $sql = "SELECT u_creator, r_player FROM comments WHERE u_creator = '$oldname' OR r_player = '$oldname';";
      if($result = mysqli_query($link, $sql)){
        $row = mysqli_fetch_assoc($result);
        while($row = mysqli_fetch_assoc($result)){
          $emparray[] = $row;
        }
        if(count($emparray)>0){
          $sql = "UPDATE comments SET u_creator = '$username' WHERE u_creator = '$oldname';";
          $result = mysqli_query($link, $sql);
          $sql = "UPDATE comments SET r_player = '$username' WHERE r_player = '$oldname';";
          $result = mysqli_query($link, $sql);
        }
      }
    }elseif ($oldavatar !== $avatar) {
      $sql = "UPDATE players SET avatar = '$avatar' WHERE cID = $userID;";
      $result = mysqli_query($link, $sql);
    }
    mysqli_close($link);
  }
}else{
 exit();
}
?>
