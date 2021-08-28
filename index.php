<?php
    // Initialize the session
    session_start();
    include "vadw.php";
    if (empty($_SESSION['token'])) {
        $_SESSION['token'] = bin2hex(random_bytes(32));
    }
    if($_SESSION['banned'] == 1){
      header("location: signout");
    }
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Reputation Hub - MobiTracker </title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css?v=2.0">
    <link rel="stylesheet" href="css/patreon.css">
    <link rel="stylesheet" href="css/nav.css">
    <link rel="stylesheet" href="css/stars.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <link href="src/opensearch.xml" rel="search" title="Search MobiTracker" type="application/opensearchdescription+xml">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Reputation Hub - MobiTracker.co"/>
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <meta name="description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php
    echo "<meta name='token' content=".$_SESSION['token'].">";
    ?>
    <?php
    if($_SESSION["loggedin"]){
      echo "<meta name='jwt' content=".$_SESSION['jwt'].">";
    }
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="js/ga.js"></script>
  </head>

  <body>
    <?php include "gtemps/nav.php"; ?>
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <?php include "gtemps/titleBar.php" ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>
      <div class="titleContainer">
        <img class="sc-logo" src="Star-Citizen.png" alt="">
        <p class="webTitle">Reputation Hub</p>
      </div>
      <div class="inputContainer padded" id="iContainer">
        <input type="text" class="userInput" autofocus value="<?php echo $_SESSION['search'] ?>" placeholder="Enter a Star Citizen's Handle">
      </div>
      <div class="search-param-container padded" id="sPContainer">
        Search By:
        <div class="search-by">
          <span class="sbc-btn sb-btn">Careers</span>
          <div class="sbc-content sb-content">
            <img class="sbc-img notSelected" src="../src/crew.png" alt="">
            <img class="sbc-img notSelected" src="../src/escort.png" alt="">
            <img class="sbc-img notSelected" src="../src/explorer.png" alt="">
            <img class="sbc-img notSelected" src="../src/miner.png" alt="">
            <img class="sbc-img notSelected" src="../src/pirate.png" alt="">
            <img class="sbc-img notSelected" src="../src/trader.png" alt="">
          </div>
        </div>
      </div>
      <p class='home hidden' id='moto'></p>
      <p class = 'disclaimer home fineprint'>Please leave reviews that are only relating to real ingame interactions.<br>We reserve the right to remove reviews that we believe to be fake or an attempt of harassment.<br/>We are not affiliated or associated with Roberts Space Industries or Cloud Imperium Games.<br>This is simply a fan website created by <a class='loginName by' target="_blank" href="https://mobitracker.co/JamesDusky">JamesDusky</a></p>
      <div class="container container-header padded" id="hContainer">
        <div id="pageContainer" class="pageContainer">
        </div>
        <header class="playercard">
        </header>
        <div id="pageContainer" class="pageContainer">
        </div>
      </div>
      <div class="container container-section padded" id="sContainer">
        <div id="pageContainer" class="pageContainer">
        </div>
        <section class="container-comments">
        </section>
        <div id="pageContainer" class="pageContainer">
        </div>
      </div>
    </div>
    <?php include "gtemps/footer.php"; ?>
    <?php 
      if(isset($_GET['code'])){
        echo '<script src="oauth.js"></script>';
      }
    ?>
    <script type="text/javascript" src="js/socket.js?date=8/28"></script>
    <script type="text/javascript" src="js/main.js?date=8/28" async></script>
    <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "js/nav.js?date=8/28";}else{echo "js/nSession.js?date=8/28";} ?>" async></script>
  </body>
</html>
