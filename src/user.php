<?php
session_start();
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    $user = array();
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
      $user['session'] = 1;
      $user['sessionUser'] = $_SESSION['username'];
      if(isset($_SESSION['com_count'])){
        $user['comcount'] = $_SESSION['com_count'];
      }else{
        $user['comcount'] = "";
      }
    }else{
      $user['session'] = 0;
      $user['sessionUser'] = "";
    }
    if(isset($_SESSION['search'])){
      $user['search'] = $_SESSION['search'];
    }else{
      $user['search'] = "";
    }
    if($_SESSION['com_count'] == 3){
      $user['limited'] = true;
    }else{
      $user['limited'] = false;
    }
    if(isset($_SESSION['verified'])){
      $user['verified'] = $_SESSION['verified'];
    }else{
      $user['verified'] = 0;
    }
    if(isset($_SESSION['flag'])){
      $user['flagged'] = $_SESSION['flag'];
    }else{
      $user['flagged'] = "";
    }
    if(isset($_SESSION['faction'])){
      $user['faction'] = $_SESSION['faction'];
    }
    // TODO: $_SESSION['cPref'] takes JSON object cType |0 = Freelancers, 1 = Requests, 2 = Both| and cOwn |0 = Hide Own, 1 = Exclusively Own Contracts, 2 = Combined Contracts|
    if(isset($_SESSION['cPref'])){
      $user['cPref'] = $_SESSION['cPref'];
    }else{
      $user['cPref'] = array('cType' => 2, 'cOwn' => 1);
    }
    echo json_encode($user);
  }
}else{
 exit(json_encode(['error' => 'No CSRF Token.']));
}
?>
