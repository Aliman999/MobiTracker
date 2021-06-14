<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
    require_once "config.php";
    require_once "services.php";
    foreach ($_POST as $post => $p) {
      mysqli_real_escape_string($link, $p);
      $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
    }
    $username = $_SESSION['username'];
    if(empty($username)){
      exit();
    }
    $id = $_POST['id'];
    if(isset($_POST['desc'])){
      $description = $_POST['desc'];
    }else{
      $description = "";
    }

    $sql = "SELECT apps->'$.*' AS apps, acc->'$.*' AS acc FROM contracts WHERE id = $id";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    if($row['apps'] == NULL){
      $apps = array();
    }else{
      $apps = json_decode($row['apps'], true);
    }
    if($row['acc'] == NULL){
      $acc = array();
    }else{
      $acc = json_decode($row['acc'], true);
    }
    $y=0;
    foreach ($apps as $a){
      if($apps[$y]['handle'] == $username){
        unset($apps[$y]);
        $apps = array_values($apps);
        $apps = json_encode($apps,  JSON_FORCE_OBJECT);
        $sql = "UPDATE contracts SET apps = '$apps' WHERE id = $id";
        $result = mysqli_query($link, $sql);
        echo "Removed";
        $check = true;
        break;
      }else{
        $check = false;
      }
      $y++;
    }
    $y=0;
    foreach ($acc as $ac) {
      if($acc[$y]['handle'] == $username){
        unset($acc[$y]);
        $acc = array_values($acc);
        $acc = json_encode($acc,  JSON_FORCE_OBJECT);
        $sql = "UPDATE contracts SET acc = '$acc' WHERE id = $id";
        $result = mysqli_query($link, $sql);
        echo "Removed";
        $check = true;
        break;
      }else{
        $check = false;
      }
      $y++;
    }
    if($check == false){
      $apps[count($apps)]['handle'] = $username;
      $apps[count($apps)-1]['desc'] = $description;
      $apps = json_encode($apps,  JSON_FORCE_OBJECT);
      $sql = "UPDATE contracts SET apps = '$apps' WHERE id = $id";
      $result = mysqli_query($link, $sql);
      echo "Applied";
    }


  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
?>
