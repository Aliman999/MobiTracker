<?php
session_start();
require_once "../src/services.php";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Contracts - MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <?php
    if(empty($_SESSION['loggedin'])){
      echo '<link rel="stylesheet" href="https://mobitracker.co/bootstrap/css/bootstrap.css">';
      echo '<link rel="stylesheet" href="https://mobitracker.co/css/register.css">';
      echo '<link rel="stylesheet" href="reflogin.css">';
    }else{
      echo '<link rel="stylesheet" href="../css/style.css">';
      echo '<link rel="stylesheet" href="locale.css">';
    }
    ?>
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Contracts - MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co/contracts" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php echo "<meta name='token' content=".$_SESSION['token'].">"; ?>
    <?php echo "<meta name='jwt' content=".$_SESSION['jwt'].">"; ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="../js/ga.js"></script>
  </head>
  <body>
    <?php
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
      include "auth.php";
    }
    ?>
  </body>
</html>
