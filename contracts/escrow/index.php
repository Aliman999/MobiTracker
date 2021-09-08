<?php
session_start();
if ($_SESSION["privilage"] == "staff" || $_SESSION["privilage"] == "escrow" || $_SESSION["privilage"] == "dispute"){
  require_once "../../src/services.php";
}else{
  header("Location: ../");
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Escrow - MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/style.css?v=2.0">
    <link rel="stylesheet" href="../locale.css">
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
    echo "<meta name='jwt' content=".$_SESSION['jwt'].">";

    if (dirname($_SERVER['REQUEST_URI']) !== "beta") {
      echo '<script data-ad-client="ca-pub-9836061168141002" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
    }
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="../../js/ga.js"></script>
  </head>
  <body>
    <div id="login_status" class="login_menu">
      <img class="verified" src="../../src/verified.png"></a>
      <p class='loginName'><?php echo $_SESSION["username"] ?> </p>
      <a href="../../" class="verify_btn home_btn">Home</a>
      <a class="verify_btn breadCrumbNav">Contracts</a>
      <a href="../../discord" class="verify_btn">Discord Bot</a>
      <a href="../../faq" class="verify_btn">FAQ</a>
      <div class="loggedinDiv"></div>
      <a href="../../signout" class="logout_btn">Sign out</a>
    </div>
    <div class="web-title">
      <p class="web-name">MobiTracker Escrow Management</p>
    </div>
    <!--
    <div class="container container-section">
      <div class="collapseB" data-control="accounts"><p class="pointer highlight">Escrow Accounts</p><p class="collapse pointer">▲</p></div>
      <section class="container-comments hidden" id="accounts">
        <div class="player-review">
          <div class="commentContainer">
            <p class="comment"><span class="highlight">Kindmiss</span></br>Balance: <span>0</span>aUEC</p>
            <p class="comment">Recent Transactions:</br></br>ID 1 | Authorizer JamesDusky | Amount 26,500 aUEC</p>
          </div>
          <div class="commentContainer">
            <p class="comment"><span class="highlight">JamesDusky</span></br>Balance: <span>0</span>aUEC</p>
            <p class="comment">Recent Transactions:</br></br>ID 1 | Authorizer JamesDusky | Amount 26,500 aUEC</p>
          </div>
          <div class="commentContainer">
            <p class="comment"><span class="highlight">Mobitracker</span></br>Balance: <span>0</span>aUEC</p>
            <p class="comment">Recent Transactions:</br></br>ID 1 | Authorizer JamesDusky | Amount 26,500 aUEC</p>
          </div>
          <div class="manageContract">
            <a class="rButton highlight-green">Update Balance</a>
          </div>
          <p class="highlight-green">Confirm the ingame escrow account contains 26500 aUEC</p>
        </div>
      </section>
    </div>
    -->
    <div class="container container-section">
      <div class="collapseB" data-control="pending"><p class="pointer highlight">Awaiting Processing</p><p class="collapse pointer">▼</p></div>
      <section class="container-comments" id="pending">
      </section>
    </div>
    <div class="container container-section">
      <div class="collapseB" data-control="progress"><p class="pointer highlight">In Progress</p><p class="collapse pointer">▲</p></div>
      <section class="container-comments hidden" id="progress">
      </section>
    </div>
    <div class="container container-section">
      <div class="collapseB" data-control="completed"><p class="pointer highlight">Completed</p><p class="collapse pointer">▲</p></div>
      <section class="container-comments hidden" id="completed">
      </section>
    </div>
    <!--
    <div class="container container-section">
      <div class="collapseB" data-control="disputes"><p class="pointer highlight">Disputes</p><p class="collapse pointer">▲</p></div>
      <section class="container-comments hidden" id="disputes">
        <div class="player-review">
          <div class="player-min-container jobposting">
            <div class="player-min">
              <img class="player-min-avatar" src="https://robertsspaceindustries.com/media/yghlu2ruwolagr/heap_infobox/Avatar.png">
              <a class="player-min-name" href="https://mobitracker.co/JamesDusky"><img src="../../src/verified.png" class="verified"><p class="player-username">JamesDusky</p></a>
            </div>
            <div class="commentContainer">
              <p class="comment">Contract ID: 1</br>Delivery</br>Escrow Instructions: Payout per Hiree<br>Close of Escrow: TBD<br><span class="highlight">Price: 25000</span><br><span class="highlight">Paid: False</span><br>Payee: TBD<br>Payor: JamesDusky<br>Status: Awaiting aUEC Confirmation from Escrow<br>Servicer: MobiTracker</p>
              <p class="comment">Unsecure - Test</p>
              <p class="comment">Secure - Test</p>
              <p class="comment">Claimant</p>
            </div>
          </div>
          <div class="manageContract">
            <p>Notes:</p>
            <textarea class="createComment form-control"></textarea>
          </div>
          <div class="manageContract">
            <a class="rButton highlight-green">Confirm Payment</a>
            <a class="rButton highlight-green">Activate Contract</a>
          </div>
          <p class="highlight-red">Confirm the ingame escrow account contains 26500 aUEC</p>
        </div>
      </section>
    </div>
    -->
  </body>
  <script type="text/javascript" src="main.js"></script>
  <script type="text/javascript" src="../../js/push.js" async></script>
</html>
