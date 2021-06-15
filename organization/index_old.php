<?php
  // Initialize the session
  session_start();
  if (empty($_SESSION['token']) || empty($_SESSION['loggedin'])) {
    header("location: ../");
  }
  require_once "vadw.php";
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>MobiTracker - Org Management</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css?v=2.0">
    <link rel="stylesheet" href="locale.css">
    <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
    <link rel="manifest" href="../site.webmanifest">
    <link rel="mask-icon" href="../safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php
    echo "<meta name='token' content=".$_SESSION['token'].">";
    ?>
  </head>
  <body>
    <div id="login_status" class="login_menu">
      <?php
      if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
        if($_SESSION['verified'] === 1){
          echo '<img class="verified" src="../src/verified.png"></a>';
        }
        echo "<p class='loginName' onclick='clickUser(this.innerText)'>".$_SESSION["username"]." </p>";
        echo '<a href="../" class="verify_btn home_btn">Home</a>';
        echo '<div class="loggedinDiv"></div>';
        echo '<a href="../signout" class="logout_btn">Sign out</a>';
      }else{
        echo '<a href=../login class="login_btn">Sign in</a><div class="loginDiv"></div> <a href=../register class="login_btn"> Sign up</a><a href="../" class="verify_btn home_btn">Home</a>';
      }
      ?>
    </div>
    <div class="web-title">
      <p class="web-name">MobiTracker Organization Manager</p>
    </div>
    <p class="home" id="moto">This page is for organization leaders with rank 5.
      If you'd like to expand this functionality to other ranks please DM <a class="linkme" href="https://www.mobitracker.co?search=JamesDusky">JamesDusky</a><br/>Discord: Aliman#5518</p>
    <div id="orgInfo">
      <span class="highlight-red">If this is your first time and your org is large this may take some time...</span>
      Loading...
    </div>
    <div class="container container-section">
      <div class="collapseB">
        <p>Leaders</p>
        <p class="collapse"></p>
      </div>
      <section class="container-comments">
        <div id="bossContainer" class="bossContainer bC">
        </div>
      </section>
    </div>

    <div class="container container-header">
      <div class="collapseB">
        <p>Members</p>
        <p class="collapse"></p>
      </div>
      <div id="inputContainer" class="memSearch">
        <input id="userInput" type="text" class="userInput" autofocus="" onclick="this.select()" value="" placeholder="Enter a Star Citizen's Handle">
      </div>
      <div id="pageContainer" class="pageContainer">
      </div>
      <header class="playercard">
      </header>
      <div id="pageContainer" class="pageContainer">
      </div>
    </div>
    <script type="text/javascript" src="main.js" async></script>
  </body>
</html>
