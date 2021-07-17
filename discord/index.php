<?php
// Initialize the session
session_start();
if (empty($_SESSION['token'])) {
  $_SESSION['token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css?v=2.0">
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
    <script type="text/javascript" src="../js/ga.js"></script>
  </head>

  <body>
    <?php include "../gtemps/nav.php"; ?>
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
            echo "<div class='userContainer'>";
            if($_SESSION['verify'] == 1){
              echo "<img class='verified' src='../src/verified.png'>";
            }
            echo "<p class='loginName'>".$_SESSION['username']."</p></div>";
          }
          ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>

      <div class="titleContainer">
        <p class="webTitle">Essential to your Organization!</p>
        <p class="webSlogan">Easily access StarCitizen's player Reputation Hub through discord!</p>
      </div>
      <div class="container-header">
        <div class="dEmbedContainer">
          <div class="dEmbed">
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
                  <th>
                    <p class="eBold">Badge</p>
                    <p>Vice Admiral</p>
                  </th>
                  <th>
                    <p class="eBold">MobiTracker Vouchers</p>
                    <p>Experienced (2)</p>
                  </th>
                  <th>
                    <p class="eBold">RSI Profile</p>
                    <p><a href="https://robertsspaceindustries.com/citizens/JamesDusky">JamesDusky</a></p>
                  </th>
                </tr>
                <tr>
                  <th>
                    <p class="eBold">Enlisted</p>
                    <p>06/24/2013</p>
                  </th>
                  <th>
                    <p class="eBold">Location</p>
                    <p>New York, United States</p>
                  </th>
                  <th>
                    <p class="eBold">Languages</p>
                    <p>English</p>
                  </th>
                </tr>
              </table>
              <table>
                <tr>
                  <th>
                    <p class="eBold">Main Organization</p>
                    <p>Creator [5] in <a href="https://robertsspaceindustries.com/orgs/MOBI" target="_blank">MobiTracker</a></p>
                  </th>
                </tr>
                <tr>
                  <th>
                    <p class="eBold">Affiliated Organizations</p>
                    <p>Operator [2] in <a href="https://robertsspaceindustries.com/orgs/DSCREW" target="_blank">Deep Space Crew</a></p>
                    <p>Raptor Fodder [0] in <a href="https://robertsspaceindustries.com/orgs/BMMOC" target="_blank">Banu Merchantman Owner's Club</a></p>
                    <p>Board Member [5] in <a href="https://robertsspaceindustries.com/orgs/ASTROLLC" target="_blank">Asteroid</a></p>
                  </th>
                </tr>
              </table>
            </div>
            <div class="embedRight">
              <img src="https://robertsspaceindustries.com/media/yghlu2ruwolagr/heap_infobox/Avatar.png">
            </div>
          </div>
        </div>
        <div class="aBot">
          <a href="https://discord.com/oauth2/authorize?client_id=751252617451143219&permissions=67135488&scope=bot" class="rButton" id="leftBtn"><img src="../src/discord.png" class="discord">Add to Discord</a>
          <a href="#learnMore" class="rButton" id="rightBtn">Learn More</a>
        </div>
      </div>
      <div id="learnMore" class="lMore">
        <div class="lmCont">
          <div class="lmLeft">
            <h3>Easily search any citizen at your fingertips.</h3>
            <p>The MobiTracker bot mirrors the website's functionality and adds more. Search for users anywhere anytime. When you join our <a href="https://www.patreon.com/mobitracker" target="_blank" class="inlineHyper">Patreon</a>, you'll have access to search in batches!</p>
          </div>
          <div class="lmRight">
            <img src="../src/botSearch.png">
          </div>
        </div>
        <div class="lmCont">
          <div class="lmLeft">
            <h3>Register on MobiTracker through discord.</h3>
            <p>The MobiTracker bot lets you quickly link your RSI accounts with Discord for access to extra features. You can also use any of your registered handles to login to <a href="https://mobitracker.co/" target="_blank" class="inlineHyper">MobiTracker</a></p>
          </div>
          <div class="lmRight">
            <img src="../src/botRegister.png">
          </div>
        </div>
        <div class="lmCont">
          <div class="lmLeft">
            <h3>Discover player contracts.</h3>
            <p>The MobiTracker bot allows you to browse player-made contracts connecting you with freelancers across the verse. Protected by an escrow system developed in-house, your gaurenteed to receive your aUEC for the work you've completed.</p>
          </div>
          <div class="lmRight">
            <img src="../src/botContracts.png">
          </div>
        </div>
        <div class="lmCont">
          <div class="lmLeft">
            <h3>Keep up to date with MobiTracker</h3>
            <p>MobiTracker will send you personalized updates straight to your DM's and let you know who is vouching for you, applying to your contracts, and creating new ones.</p>
          </div>
          <div class="lmRight">
            <img src="../src/botAlerts.png">
          </div>
        </div>
      </div>
    </div>
    <?php include "../gtemps/footer.php"; ?>
    <script type="text/javascript" src="../js/socket.js"></script>
    <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "../js/nav.js";}else{echo "../js/nSession.js";} ?>" async></script>
  </body>
</html>
