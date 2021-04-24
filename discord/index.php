<?php
// Initialize the session
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Link with Discord - MobiTracker</title>
    <link rel="stylesheet" href="https://mobitracker.co/bootstrap/css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/register.css">
    <link rel="stylesheet" href="locale.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php
    echo "<meta name='token' content=".$_SESSION['token'].">";
    ?>
</head>
<body>
  <?php
  if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    require_once "../register/checkHandle.php";
    require_once "../src/config.php";
    include "auth.php";
  }else{
    include "login.php";
  }
  ?>
  <script type="text/javascript" src="main.js"></script>
</body>
</html>
