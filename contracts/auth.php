<div id="login_status" class="login_menu">
  <?php
  if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    if($_SESSION['verified'] === 1){
      echo '<img class="verified" src="../src/verified.png"></a>';
    }
    echo "<p class='loginName'>".$_SESSION["username"]." </p>";

    if($_SESSION['daysleft'] == 0){
      echo '<a href="changefaction.php" class="verify_btn home_btn">Change Faction</a>';
    }
    echo '<a href="../" class="verify_btn home_btn">Home</a>';
    echo '<a class="verify_btn breadCrumbNav">Contracts</a>';
    echo '<a href="../discord" class="verify_btn">Discord Bot</a>';
    echo '<a href="../faq" class="verify_btn">FAQ</a>';
    echo '<div class="loggedinDiv"></div>';
    echo '<a href="../signout" class="logout_btn">Sign out</a>';
  }
  ?>
</div>
<div class="web-title">
  <p class="web-name">MobiTracker Contracts</p>
</div>

<?php
require_once "contract.php";
?>
