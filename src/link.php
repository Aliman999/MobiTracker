<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'login');
define('DB_PASSWORD', 'Ninjaman');
define('DB_NAME', 'users');

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$headers = "p529.FR^;N^h/2CI";
if(isset($headers)){
  if($_GET['token'] === $headers){
    $cid = json_encode(array($_GET['cid']));
    $username = json_encode(array($_GET['username']));
    $discord = $_GET['disc']."#".$_GET['discriminator'];
    $sql = "SELECT username, cID FROM `discord` WHERE discID = " . $_GET['discid'] . ";";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    if(count($row) > 0){
      $row['username'] = json_decode($row['username']);
      $row['cID'] = json_decode($row['cID']);
      if(!in_array($_GET['username'], $row['username'])){
        array_push($row['username'], $_GET['username']);
        array_push($row['cID'], $_GET['cid']);
      }
      $row['username'] = json_encode($row['username']);
      $row['cID'] = json_encode($row['cID']);
      $sql = "UPDATE `discord` SET username = '".$row['username']."', cID = '".$row['cID']."';";
      echo $sql;
    }

    /*
    $sql = "INSERT INTO `discord` (`discUser`, `discID`, `cID`, `username`) VALUES ('".$discord."', ".$_GET['discid'].", '".$cid."', '".$username."'); INSERT INTO `priority` (`discID`, `cID`, `value`) VALUES (".$_GET['discid'].", ".$_GET['cid'].", 8);";
    echo $sql;
    if(mysqli_multi_query($link, $sql)){
      echo "Success";
      //echo $sql;
    }else {
      echo mysqli_error($link);
      $sql = "UPDATE `priority` SET value = (SELECT priority FROM discord WHERE discID = ".$_GET['discid'].");";
      echo $sql;
    }
    */
  }else{

  }
}else{
  exit(json_encode(['error' => 'No token.']));
}