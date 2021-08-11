<?php
session_start();
define('include', TRUE);

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require_once "../src/config.php";
$username = $_SESSION['username'];
$sql = "UPDATE players SET noti = -1 WHERE username = '$username';";
mysqli_query($link, $sql);

  echo mysqli_error($link);
