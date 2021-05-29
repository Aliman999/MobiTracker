<?php
/*
require_once "../src/sessionverify.php";
require_once "clearnoti.php";
*/
?>
<div class="inputContainer">
  <input type="text" class="contractSearch" autofocus="" value="" placeholder="Search for a Creator">
</div>
<div class="search-param-container" style="position: relative">
  Search By:
  <div>
    <span class="sbt-btn sb-btn">Type</span>
    <div class="sbt-content sb-content">
      <span class="player-min-name sbt-btn sb-btn notSelected">Offering</span>
      <span class="player-min-name sbt-btn sb-btn notSelected">Requesting</span>
    </div>
  </div>
  <div>
    <span class="sbc-btn sb-btn">Career</span>
    <div class="sbc-content sb-content">
      <img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/racing.png">
      <img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/trader.png">
      <img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/escort.png">
      <?php
        if($_SESSION['faction'] == 1){
          echo '<img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/pirate.png">';
        }
      ?>
      <img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/explorer.png">
      <img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/medical.png">
      <?php
        if($_SESSION['faction'] == 0){
          echo '<img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/charterRegular.png">';
          echo '<img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/charterLuxury.png">';
        }
      ?>
      <?php
        if($_SESSION['faction'] == 1){
          echo '<img class="sbc-img notSelected" src="https://mobitracker.co/beta/src/smuggling.png">';
        }
      ?>
    </div>
  </div>
  <div>
    <span class="sbm-btn sb-btn">My Contracts</span>
    <div class="sbm-content sb-content">
      <span class="player-min-name sbt-btn sb-btn notSelected">Only Mine</span>
      <span class="player-min-name sbt-btn sb-btn notSelected">Combined</span>
    </div>
  </div>
  <!--
  <div class="search-by" style="display:none">
    <span class="sbr-btn">Ratings</span>
    <div class="sbr-content">
      <span class="player-min-name notSelected">0</span>
      <span class="player-min-name notSelected">1</span>
      <span class="player-min-name notSelected">2</span>
      <span class="player-min-name notSelected">3</span>
      <span class="player-min-name notSelected">4</span>
      <span class="player-min-name notSelected">5</span>
    </div>
  </div>
  -->
</div>
<div class="container container-section">
  <section class="container-comments">
  <div class="postContainer">
  <div class="jpFormContainer hidden">
    <div class="jpForm">
      <p>I am</p>
      <div class='custom-select' style='width: 140px;'>
        <select class='userInput'>
          <option value="">&nbsp;</option>
          <option value="Requesting">Requesting</option>
          <option value="Offering">Offering</option>
        </select>
      </div>
      <p>a service</p>
    </div>
    <div class="jpForm">
      <p>in</p>
      <div class='custom-select' style='width: 175px;'>
        <select class='userInput'>
          <option value=''>Select Job</option>
          <?php
          if($_SESSION['faction'] == 0){
            foreach ($service as $ser => $s) {
              echo "<option>$s</option>";
            }
          }elseif($_SESSION['faction'] == 1){
            foreach ($service as $ser => $s) {
              echo "<option>$s</option>";
            }
          }
          ?>
        </select>
      </div>
    </div>
  </div>
    <p class="error highlight-red hidden" style="font-size: 16px;">Please fill out the above.</p>
    <div class="postBtnContainer">
      <a class="post">Post a Contract</a>
    </div>
  </div>
  <div id="pageContainer" class="pageContainer">
  </div>
  <div class="section">

  </div>
  <div id="pageContainer" class="pageContainer">
  </div>

  </section>
</div>
<script type="text/javascript" src="main.js" async></script>
<script type="text/javascript" src="../js/push.js" async></script>
