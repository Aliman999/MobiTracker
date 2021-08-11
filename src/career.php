<?php
session_start();
define('include', TRUE);
header('Content-Type: application/json');

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    foreach ($_POST as $post => $p){
      mysqli_real_escape_string($link, $p);
      $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
    }
    $username = $_POST['username'];
    $oldCareer = $_POST['career'];
    //ini_set('display_errors', 1);
    //ini_set('display_startup_errors', 1);
    //error_reporting(E_ALL);

    $newCareer = "";
    if($username !== $_SESSION['username']){
      exit();
    }else{
      $sql = "SELECT crew, escort, explorer, pirate, miner, trader FROM players WHERE username = '$username';";
      //echo $sql;
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      if($oldCareer == 0){
        if($row['crew'] == 0){
          $newCareer = 1;
        }else{
          $newCareer = 0;
        }
        $sql = "UPDATE players SET crew = $newCareer WHERE username = '$username';";
        mysqli_query($link, $sql);
      }elseif($oldCareer == 1) {
        if($row['escort'] == 0){
          $newCareer = 1;
        }else{
          $newCareer = 0;
        }
        $sql = "UPDATE players SET escort = $newCareer WHERE username = '$username';";
        mysqli_query($link, $sql);
      }elseif($oldCareer == 2) {
        if($row['explorer'] == 0){
          $newCareer = 1;
        }else{
          $newCareer = 0;
        }
        $sql = "UPDATE players SET explorer = $newCareer WHERE username = '$username';";
        mysqli_query($link, $sql);
      }elseif($oldCareer == 3) {
        if($row['miner'] == 0){
          $newCareer = 1;
        }else{
          $newCareer = 0;
        }
        $sql = "UPDATE players SET miner = $newCareer WHERE username = '$username';";
        mysqli_query($link, $sql);
      }elseif($oldCareer == 4) {
        if($row['pirate'] == 0){
          $newCareer = 1;
        }else{
          $newCareer = 0;
        }
        $sql = "UPDATE players SET pirate = $newCareer WHERE username = '$username';";
        mysqli_query($link, $sql);
      }elseif($oldCareer == 5) {
        if($row['trader'] == 0){
          $newCareer = 1;
        }else{
          $newCareer = 0;
        }
        $sql = "UPDATE players SET trader = $newCareer WHERE username = '$username';";
        mysqli_query($link, $sql);
      }
      mysqli_close($link);
    }
  }
} else {
    exit(json_encode(['error' => 'No token.']));
}
?>
