<?php
session_start();
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
if (empty($_SESSION['loggedin'])) {
  header("location: https://mobitracker.co/contracts");
}else{
  require_once "../../src/services.php";
}
if(!in_array($_GET['service'], $service)){
  header("location: https://mobitracker.co/contracts");
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Contracts - MobiTracker</title>
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
    <meta property="og:title" content="Contracts - MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co/contracts" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php
    echo "<meta name='token' content=".$_SESSION['token'].">";
    if($_SESSION['loggedin'] == true){
      echo "<meta name='jwt' content=".$_SESSION['jwt'].">";
    }
    ?>
  </head>
  <body>
    <?php include "../../gtemps/nav.php"; ?>
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <a><img id="mtLogo" src="../../android-chrome-512x512.png" class="mtLogo"></a>
          <a id="mtTitle" class="mtTitle">MOBITRACKER</a>
          <?php include "../gtemps/titleBar.php" ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>
      <div class="titleContainer">
        <p class="webTitle">Contracts</p>
        <p class="webSlogan">Find your freelancing niche.</p>
      </div>

      <div class="container container-section">
        <section class="container-comments">
          <div class="jpFormContainer">
            <div class="jpForm jpFormHoldThePad">
              <p>I am</p>
              <p id="option"><?php echo $_GET['option']; ?></p>
              <p>a service</p>
            </div>
            <div class="jpForm jpFormHoldThePad">
              <p>in</p>
              <p id="service"><?php echo $_GET['service']; ?></p>
            </div>
          </div>
          <div class="jpFormContainer" style="display: block;">
            <div class="jpForm">
              <p>Price: </p>
              <input class="userInput numInput form-control" maxlength="7" type="number" name="" value="">
              <p>aUEC</p>
            </div>
            <?php
            if(($_GET['service'] == "VIP Smuggling" && $_GET['option'] == "Requesting" || $_GET['service'] == "Head Hunting" && $_GET['option'] == "Requesting") && $_SESSION['faction'] == 1){
              $hidden = "";
            }else{
              $hidden = "hidden";
            }
            if($_GET['option'] == "Providing"){
              $hiddenEscrow = "hidden";
            }else{
              $hiddenEscrow = "";
            }
            ?>
            <div class='jpForm <?php echo $hidden; ?>'>
              <p>Target: </p>
              <input class='userInput form-control' style='width: 15rem;' maxlength='50' type='text' name=''>
            </div>
            <div class="<?php echo $hiddenEscrow;?>">
              <input class="checkbox" id="escrow" type="checkbox"/>
              <label for="escrow">Opt-In for Escrow</label>
            </div>
            <div class="jpForm" style="display: block;">
              <p>Unsecure Information about the contract</p>
              <textarea maxlength="500" class="createComment form-control" name="comment" placeholder="Include non-sensitive information regarding the contract so contractors know what its about. This will direct your contract's expectation."></textarea>
              <p class="charCounter">0/500</p>
            </div>
            <div class="jpForm" style="display: block;">
              <p>Secure Information about the contract</p>
              <p>(Only applicants you've accepted will see this)</p>
              <textarea maxlength="100" class="createComment form-control" name="comment" placeholder="Include information such as Times, Locations, Requirements and anything else you believe will be needed to complete the contract."></textarea>
              <p class="charCounter">0/100</p>
            </div>
          </div>
          <div class="postContainer">
            <p class="error highlight-red hidden" style="font-size: 16px;"></p>
            <div class="postBtnContainer">
              <a class="post" style="margin-top: 0px; margin-bottom: 8px;">Create</a>
            </div>
          </div>
        </section>
      </div>
      <?php
      if($_SESSION['verified'] == 1 && $_SESSION['contract'] == 1){
        echo '<script type="text/javascript" src="main.js"></script>';
      }
      ?>
    </div>
    <?php include "../../gtemps/footer.php"; ?>
  </body>

  <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "../../js/nav.js";}else{echo "../../js/nSession.js";} ?>" async></script>
  <script type="text/javascript" src="../../js/socket.js"></script>
  <script type="text/javascript" src="main.js" async></script>
</html>
