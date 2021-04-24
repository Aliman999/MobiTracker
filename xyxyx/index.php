<?php
session_start();
$headers = $_SESSION['privilage'];
if (isset($headers)) {
    if ($headers !== "staff") {
        exit(json_encode(['error' => 'You dont belong here']));
    }
} else {
    exit(json_encode(['error' => 'You dont belong here']));
}
$_SESSION['search'] = "";
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/style.css">
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
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="../js/ga.js"></script>
  </head>

  <body>
    <div id="login_status" class="login_menu">
      <?php
        echo '<img class="verified" src="../src/verified.png"></a>';
        echo "<p class='loginName' onclick='clickUser(this.innerText)' style='margin-left: 2px;'>".$_SESSION["username"]." </p>";
        echo '<a href="../" class="verify_btn">Home Page</a>';
        echo '<div class="loggedinDiv"></div>';
        echo '<a href="../signout" class="logout_btn">Sign out</a>';
      ?>
    </div>
    <div class="web-title">
      <a href="./" class="webLink"><p class="web-name">MobiTracker</p></a>
    </div>
    <p id='moto'>Moderator Panel</p>
    <input type="text" class="userInput" value="" placeholder="Enter a Star Citizen's Handle">
    <?php
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true && $_SESSION['verified'] === 1 && $_SESSION['privilage'] === "staff"){

    }
    ?>
      <div class="container container-header" id="container">
        <header class="playercard">
        </header>
      </div>

      <div class="container container-section" id="container">
        <section class="container-comments">
        </section>
      </div>
    <script type="text/javascript" src="main.js"></script>


  </body>
</html>
