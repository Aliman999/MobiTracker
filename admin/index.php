<?php
// Initialize the session
session_start();
if (empty($_SESSION['token'])) {
  $_SESSION['token'] = bin2hex(random_bytes(32));
}
if(!$_SESSION['privilage']){
  unset($_SESSION);
  session_destroy();
  session_write_close();
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css?v=2.0">
    <link rel="stylesheet" href="../css/patreon.css">
    <link rel="stylesheet" href="../css/nav.css">
    <link rel="stylesheet" href="locale.css">

    <link rel="stylesheet" href="loading-bar.min.css" />

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
    ?>
    <?php
    if($_SESSION["loggedin"]){
      echo "<meta name='jwt' content=".$_SESSION['jwt'].">";
    }

    if (dirname($_SERVER['REQUEST_URI']) !== "beta") {
      echo '<script data-ad-client="ca-pub-9836061168141002" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
    }
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="../js/ga.js"></script>
  </head>

  <body>
    <?php include "../gtemps/nav.php"; ?>
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <?php include "../gtemps/titleBar.php" ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>

      <div class="titleContainer">
        <p class="webTitle">Systems</p>
      </div>
      <div class="container-header">
        <div class="centerCont">
          <div id="loadingContainer">
            <p><span class="rBold">Loading</span></p><img src="../../src/loading.png" class="loading">
          </div>
          <div class="conContainer">
            <p>DISCONNECTED</p><div class="offline"></div>
          </div>
          <div>
            <div class="players label-center"></div>
            <p>Player Scanner</p>
          </div>
          <div>
            <div class="crawler label-center"></div>
            <p>Org Crawler</p>
          </div>
          <div>
            <div class="scanner label-center"></div>
            <p>Org Scanner</p>
          </div>
        </div>
      </div>
    </div>
    <?php include "../gtemps/footer.php"; ?>
    <script src="loading-bar.min.js"></script>
    <script type="text/javascript" src="api.js"></script>
    <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "../js/nav.js";}else{echo "../js/nSession.js";} ?>" async></script>
  </body>
</html>
