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
<html>
  <head>
    <meta charset="utf-8">
    <title>MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/patreon.css">
    <link rel="stylesheet" href="css/nav.css">
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
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="js/ga.js"></script>
  </head>

  <body>
    <!--
    <div id="navMenu" class="navMenu">
      <div class="navTitleContainer">
        <p class="navTitle">NAVIGATE</p>
        <a href="javascript:void(0)" class="closebtn" id="closeNavBtn"><img src="src/close.png" class="navBtn"></a>
      </div>
      <div class="miniPlayerDiv">
        <div class="miniPlayer">
          <img src="src/avatars/avatar_default.jpg" class="avatar circleBorder">
          <div class="loginNameContainer">
            <img class="verified" src="src/verified.png">
            <p class="loginName">JamesDusky</p>
          </div>
          <div class="miniPlayerInfo">
            <img src="android-chrome-512x512.png" class="miniOrg circleBorder">
            <p>Something extra long</p>
          </div>
        </div>
        <div class="miniRep">
          <p class="rBold">Experienced</p>
          <p>Vouches: 54</p>
          <p>Unique Vouches: 54</p>
          <p>Contracts: 1</p>
        </div>
      </div>
      <div class="eleContainer">
        <a class="navEle navActive"><img src="src/repHub.png" class="menuIcon"/><p>Reputation Hub</p></a>
        <a href="/contracts" class="navEle"><img src="src/contracts.png" class="menuIcon"/><p>Contracts</p></a>
        <a href="/discord" class="navEle"><img src="src/discord.png" class="menuIcon"/><p>Discord</p></a>
        <a href="/faq" class="navEle"><img src="src/faq.png" class="menuIcon"/><p>FAQ</p></a>
        <a href="https://patreon.com/mobitracker" class="navEle"><img src="src/patreon.png" class="menuIcon"/><p>Patreon</p></a>
      </div>
    </div>
    -->
    <div id="navMenu" class="navMenu">
      <div class="navTitleContainer">
        <p class="navTitle">NAVIGATE</p>
        <a href="javascript:void(0)" class="closebtn" id="closeNavBtn"><img src="src/close.png" class="navBtn"></a>
      </div>
      <div class="miniPlayerDivOut">
        <div class="miniPlayerOut">
          <form class="mpLoginContainer" id="mpLoginContainer">
          </form>
        </div>
      </div>
      <div class="eleContainer">
        <a class="navEle navActive"><img src="src/repHub.png" class="menuIcon"/><p>Reputation Hub</p></a>
        <a href="/contracts" class="navEle"><img src="src/contracts.png" class="menuIcon"/><p>Contracts</p></a>
        <a href="/discord" class="navEle"><img src="src/discord.png" class="menuIcon"/><p>Discord</p></a>
        <a href="/faq" class="navEle"><img src="src/faq.png" class="menuIcon"/><p>FAQ</p></a>
        <a href="https://patreon.com/mobitracker" class="navEle"><img src="src/patreon.png" class="menuIcon"/><p>Patreon</p></a>
      </div>
    </div>
    <div id="navBackDrop" class="navBackDrop"></div> <!-- REQUIRED FOR NAV -->
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <a><img id="mtLogo" src="android-chrome-512x512.png" class="mtLogo"></a>
          <a id="mtTitle" class="mtTitle">MOBITRACKER</a>
          <?php
          if(!isset($_SESSION["loggedin"])){
            echo "<a id='lmLBtn' class='verify_btn lmBtn'>Login</a>";
            echo "<a id='lmSBtn' class='verify_btn'>Sign Up</a>";
          }
          if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
            echo "<a class='loginName lmBtn'><img class='verified' src='src/verified.png'>JamesDusky</a>";
          }
          ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>
      <div class="web-title">
        <img class="sc-logo" src="Star-Citizen.png" alt="">
        <p class="web-slogan">Reputation Hub</p>
      </div>
      <div class="inputContainer" id="iContainer">
        <input type="text" class="userInput" autofocus value="<?php echo $_SESSION['search'] ?>" placeholder="Enter a Star Citizen's Handle">
      </div>
      <div class="search-param-container" id="sPContainer">
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
        <div class="search-by">
          <span class="sbr-btn sb-btn">Ratings</span>
          <div class="sbr-content sb-content">
            <span class="player-min-name notSelected" href="#">0</span>
            <span class="player-min-name notSelected" href="#">1</span>
            <span class="player-min-name notSelected" href="#">2</span>
            <span class="player-min-name notSelected" href="#">3</span>
            <span class="player-min-name notSelected" href="#">4</span>
            <span class="player-min-name notSelected" href="#">5</span>
          </div>
        </div>
      </div>
      <p class='home hidden' id='moto'></p>
      <p class = 'disclaimer home fineprint'>Please leave reviews that are only relating to real ingame interactions.<br>We reserve the right to remove reviews that we believe to be fake or an attempt of harassment.<br/>We are not affiliated or associated with Roberts Space Industries or Cloud Imperium Games.<br>This is simply a fan website created by <a class='loginName by' target="_blank" href="https://robertsspaceindustries.com/citizens/JamesDusky">JamesDusky</a></p>
        <div class="container container-header" id="container">
          <div id="pageContainer" class="pageContainer">
          </div>
          <header class="playercard">
          </header>
          <div id="pageContainer" class="pageContainer">
          </div>
        </div>
        <div class="container container-section" id="container">
          <div id="pageContainer" class="pageContainer">
          </div>
          <section class="container-comments">
          </section>
          <div id="pageContainer" class="pageContainer">
          </div>
        </div>
    </div>
    <script type="text/javascript" src="js/socket.js" async></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "js/nav.js";}else{echo "js/nSession.js";} ?>"></script>
    <script type="text/javascript" src="js/events.js"></script>
  </body>
</html>
