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
//echo $_SESSION['contract']." | ".$_SESSION['daysleft']." | ".$_SESSION['faction'];
if($_SESSION['daysleft']<=7 && $_SESSION['daysleft'] > 1){
  echo "You can change your faction in: ".$_SESSION['daysleft']." Days.";
}elseif($_SESSION['daysleft'] == 1){
  echo "You can change your faction in: ".$_SESSION['daysleft']." Day.";
}
if($_SESSION['verified'] == 0){
  require_once "notverified.php";
}else{
  if($_SESSION['contract'] == 0 || empty($_SESSION['contract']) || $_SESSION['faction'] == -1){
    require_once "disc.php";
  }else{
    if($_SESSION['verified'] == 1 && $_SESSION['contract'] == 1 && $_SESSION['faction'] != -1){
      $verify = 1;
      require_once "contract.php";
    }
  }
}
?>
