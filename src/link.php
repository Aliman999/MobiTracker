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
    $sql = "SELECT username, cID FROM `discord` WHERE discID = " . $_GET['discid'] . ";";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    if(count($row) > 0){
      $username = $_SESSION['username'];
      $discID = $_GET['discid'];
      $cid = $_SESSION['cID'];
      $row['username'] = json_decode($row['username'], true);
      $row['cID'] = json_decode($row['cID'], true);
      if (!in_array($username, $row['username'])) {
        array_push($row['username'], $username);
        array_push($row['cID'], $cid);
      }
      $row['username'] = json_encode($row['username']);
      $row['cID'] = json_encode($row['cID']);
      $sql = "UPDATE `discord` SET username = '" . $row['username'] . "', cID = '" . $row['cID'] . "' WHERE discID = " . $discID . "; UPDATE `priority` SET value = (SELECT priority FROM discord WHERE discID = " . $discID . ");";
      if(mysqli_multi_query($link, $sql)){
        echo "Success 001";
      }else {
        echo "Failed 002";
        //echo mysqli_error($link);
      }
    }else{
      $cid = json_encode(array($_SESSION['cID']));
      $username = json_encode(array($_SESSION['username']));
      $discord = $_GET['disc'] . "#" . $_GET['discriminator'];
      $sql = "INSERT INTO `discord` (`discUser`, `discID`, `cID`, `username`) VALUES ('" . $discord . "', " . $_GET['discid'] . ", '" . $cid . "', '" . $username . "'); INSERT INTO `priority` (`discID`, `cID`, `value`) VALUES (" . $_GET['discid'] . ", " . $_GET['cid'] . ", 8);";
      echo $sql;
      if (mysqli_multi_query($link, $sql)) {
        echo "Success 003";
        //echo $sql;
      } else {
        echo "Failed 004";
        //echo mysqli_error($link);
      }
    }
  }else{

  }
}else{
  exit(json_encode(['error' => 'No token.']));
}