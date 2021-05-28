<?php
// Initialize the session
session_start();
?>

<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/patreon.css">
    <link rel="stylesheet" href="../css/nav.css">
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
    <div id="navMenu" class="navMenu">
      <div class="navTitleContainer">
        <p class="navTitle">NAVIGATE</p>
        <a href="javascript:void(0)" class="closebtn" id="closeNavBtn"><img src="../src/close.png" class="navBtn"></a>
      </div>
      <div class="miniPlayerDivOut">
        <div class="miniPlayerOut">
          <?php
            if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
              echo "<div class='miniPlayer' id='miniPlayer'></div><div class='miniRep' id='miniRep'></div>";
            }else{
              echo "<div class='mpLoginContainer' id='mpLoginContainer'></div>";
            }
          ?>
        </div>
      </div>
      <div class="eleContainer">
        <a href="../" class="navEle"><img src="../src/repHub.png" class="menuIcon"/><p>Reputation Hub</p></a>
        <a href="contracts" class="navEle"><img src="../src/contracts.png" class="menuIcon"/><p>Contracts</p></a>
        <a class="navEle navActive"><img src="../src/discord.png" class="menuIcon"/><p>Discord</p></a>
        <a href="faq" class="navEle"><img src="../src/faq.png" class="menuIcon"/><p>FAQ</p></a>
        <a href="https://patreon.com/mobitracker" class="navEle"><img src="../src/patreon.png" class="menuIcon"/><p>Patreon</p></a>
      </div>
    </div>
    <div id="navBackDrop" class="navBackDrop"></div> <!-- REQUIRED FOR NAV -->
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <a><img id="mtLogo" src="../android-chrome-512x512.png" class="mtLogo"></a>
          <a id="mtTitle" class="mtTitle">MOBITRACKER</a>
          <?php
          if(!isset($_SESSION["loggedin"])){
            echo "<a id='lmLBtn' class='verify_btn lmBtn'>Login</a>";
            echo "<a id='lmSBtn' class='verify_btn'>Sign Up</a>";
          }
          if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
            echo "<div class='userContainer'><img class='verified' src='../src/verified.png'><p class='loginName'>".$_SESSION['username']."</p></div>";
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
        <p class="web-slogan">Discord</p>
      </div>
      <div class="container-header">
        <div class="dEmbedContainer">
          <div class="embedLeft">
            <table>
              <tr>
                <td class="eHeader"><img src="https://robertsspaceindustries.com/media/yghlu2ruwolagr/heap_infobox/Avatar.png"><a href="https://mobitracker.co/JamesDusky" target="_blank" class="eBold">JamesDusky#153021</a></td>
              </tr>
            </table>
            <table>
              <tr>
                <td><p>AKA Aliman</p></td>
              </tr>
              <tr>
                <th><p class="eBold">Badge</p></th>
                <th><p class="eBold">MobiTracker Vouchers</p></th>
                <th><p class="eBold">RSI Profile</p></th>
              </tr>
              <tr>
                <th><p>Vice Admiral</p></th>
                <th><p>Experienced (2)</p></th>
                <th><a href="https://robertsspaceindustries.com/citizens/JamesDusky">JamesDusky</a></th>
              </tr>
              <tr>
                <th><p class="eBold">Enlisted</p></th>
                <th><p class="eBold">Location</p></th>
                <th><p class="eBold">Languages</p></th>
              </tr>
              <tr>
                <th><p>06/24/2013</p></th>
                <th><p>New York, United States</p></th>
                <th><p>English</p></th>
              </tr>
            </table>
            <table>
              <tr>
                <th><p class="eBold">Main Organization</p></th>
              </tr>
              <tr>
                <td><p>Creator [5] in <a href="https://robertsspaceindustries.com/orgs/MOBI" target="_blank">MobiTracker</a></p></td>
              </tr>
              <tr>
                <th><p class="eBold">Affiliated Organizations</p></th>
              </tr>
              <tr>
                <td><p>Operator [2] in <a href="https://robertsspaceindustries.com/orgs/DSCREW" target="_blank">Deep Space Crew</a></p></td>
                <td><p>Raptor Fodder [0] in <a href="https://robertsspaceindustries.com/orgs/BMMOC" target="_blank">Banu Merchantman Owner's Club</a></p></td>
                <td><p>Board Member [5] in <a href="https://robertsspaceindustries.com/orgs/ASTROLLC" target="_blank">Asteroid</a></p></td>
              </tr>
            </table>
          </div>
          <div class="embedRight">
            <img src="https://robertsspaceindustries.com/media/yghlu2ruwolagr/heap_infobox/Avatar.png">
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="../js/socket.js"></script>
    <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "../js/nav.js";}else{echo "../js/nSession.js";} ?>" async></script>
    <script type="text/javascript" src="main.js" async></script>
  </body>
</html>
<!--
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
    //echo "<meta name='token' content=".$_SESSION['token'].">";
    ?>
</head>
<body>
  <?php
  /*
  if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    require_once "../register/checkHandle.php";
    require_once "../src/config.php";
    include "auth.php";
  }else{
    include "login.php";
  }
  */
  ?>
  <script type="text/javascript" src="main.js"></script>
</body>
</html>
