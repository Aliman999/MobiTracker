<?php
echo ltrim($_SERVER['REQUEST_URI'], '/beta');;

?>
<div id="navMenu" class="navMenu">
  <div class="navTitleContainer">
    <p class="navTitle">NAVIGATE</p>
    <a href="javascript:void(0)" class="closebtn" id="closeNavBtn"><img src="https://mobitracker.co/beta/src/close.png" class="navBtn"></a>
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
    <a href="/" class="navEle"><img src="https://mobitracker.co/beta/src/repHub.png" class="menuIcon"/><p>Reputation Hub</p></a>
    <a href="" class="navEle"><img src="https://mobitracker.co/beta/src/contracts.png" class="menuIcon"/><p>Contracts</p></a>
    <a href="" class="navEle"><img src="https://mobitracker.co/beta/src/discord.png" class="menuIcon"/><p>Discord</p></a>
    <a href="" class="navEle"><img src="https://mobitracker.co/beta/src/faq.png" class="menuIcon"/><p>FAQ</p></a>
    <a href="https://patreon.com/mobitracker" class="navEle"><img src="https://mobitracker.co/beta/src/patreon.png" class="menuIcon"/><p>Patreon</p></a>
  </div>
</div>
<div id="navBackDrop" class="navBackDrop"></div> <!-- REQUIRED FOR NAV -->
