<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(empty($_SESSION['loggedin']) || $_SESSION['loggedin'] === false){
  header("location: ../");
}else{
  $_SESSION['activeSetting'] = basename($_SERVER['REQUEST_URI']);
  include "../settings.php";
}

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Settings - MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/style.css?v=2.0">
    <link rel="stylesheet" href="../../css/patreon.css">
    <link rel="stylesheet" href="../../css/nav.css">
    <link rel="stylesheet" href="../locale.css">
    <link rel="stylesheet" href="locale.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta property="og:type" content="website">
    <meta property="og:title" content="MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php
    echo "<meta name='token' content=".$_SESSION['token'].">";

    if($_SESSION["loggedin"]){
      echo "<meta name='jwt' content=".$_SESSION['jwt'].">";
    }
    ?>
  </head>
  <body>
    <?php include "../../gtemps/nav.php"; ?>
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <?php include "../../gtemps/titleBar.php" ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>
      <div class="titleContainer">
        <p class="webTitle">Settings</p>
      </div>
      <div class="container container-header">
        <div class="settingsNav">
          <a href="../" class="highlight nactive">Overview</a>
          <a class="highlight active">RSI Profile</a>
          <a href="../email" class="highlight nactive">Email</a>
          <a href="../password" class="highlight nactive">Password</a>
          <a href="../discord" class="highlight nactive">Discord</a>
          <a href="../referrals" class="highlight nactive">Referrals</a>
        </div>
        <hr>
        <div class="setting">
          <div id="loadingContainer">
            <p><span class="rBold">Loading</span></p><img src="../../src/loading.png" class="loading">
          </div>
        </div>
      </div>
    </div>
    <?php include "../../gtemps/footer.php"; ?>
    <script type="text/javascript" src="main.js"></script>
    <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "../../js/nav.js";}else{echo "../../js/nSession.js";} ?>"></script>
    <script type="text/javascript" src="../../js/api.js"></script>
  </body>
</html>
