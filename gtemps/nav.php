<?php
$base = basename($_SERVER['REQUEST_URI']);
if(strpos($base, "?option") !== false){
  $base = "contracts";
}
?>
<div id="navMenu" class="navMenu">
  <div class="navTitleContainer">
    <p class="navTitle">NAVIGATE</p>
    <a href="javascript:void(0)" class="closebtn" id="closeNavBtn"><img src="https://mobitracker.co/src/close.png" class="navBtn"></a>
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
    <?php
    if($_SESSION['privilage'] === true){
      if($_SESSION['username'] === "JamesDusky"){
        echo "<a href='https://mobitracker.co/admin'";
        echo " class='navEle ";
        if($base == "system"){echo "navActive";};
        echo "'><img src='https://mobitracker.co/src/system.png' class='menuIcon'/><p>Staff - Admin</p></a>";
      }

      echo "<a href='https://mobitracker.co/system'"; 
      echo " class='navEle ";
      if($base == "system"){echo "navActive";};
      echo "'><img src='https://mobitracker.co/src/system.png' class='menuIcon'/><p>Staff - Systems</p></a>";
    }
    ?>
    <a href="<?php if($base != ""){echo "https://mobitracker.co/";} ?>" class="navEle <?php if($base == ""){echo "navActive";} ?>"><img src="https://mobitracker.co/src/repHub.png" class="menuIcon"/><p>Reputation Hub</p></a>
    <!--<a href="<?php if($base != "contracts"){echo "";}?>" class="navEle <?php if($base == ""){echo "navActive";} ?>"><img src="https://mobitracker.co/src/contracts.png" class="menuIcon"/><p>Information Hub</p></a>-->
    <a href="<?php if($base != "contracts"){echo "https://mobitracker.co/contracts";}?>" class="navEle <?php if($base == "contracts"){echo "navActive";} ?>"><img src="https://mobitracker.co/src/contracts.png" class="menuIcon"/><p>Contracts</p></a>
    <a href="<?php if($base != "discord"){echo "https://mobitracker.co/discord";}?>" class="navEle <?php if($base == "discord"){echo "navActive";} ?>"><img src="https://mobitracker.co/src/discord.png" class="menuIcon"/><p>Discord</p></a>
    <a href="<?php if($base != "faq"){echo "https://mobitracker.co/faq";}?>" class="navEle <?php if($base == "faq"){echo "navActive";} ?>"><img src="https://mobitracker.co/src/faq.png" class="menuIcon"/><p>FAQ</p></a>
    <a href="https://finder.cornerstonebase.space/" class="navEle" target="_blank"><img src="https://mobitracker.co/src/UIF_mtco.png" class="menuIcon"/><p>Universal Item Finder</p></a>
    <a href="https://patreon.com/mobitracker" class="navEle" target="_blank"><img src="https://mobitracker.co/src/patreon.png" class="menuIcon"/><p>Patreon</p></a>
  </div>
</div>
<div id="navBackDrop" class="navBackDrop"></div> <!-- REQUIRED FOR NAV -->
