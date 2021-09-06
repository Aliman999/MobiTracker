<a href="https://mobitracker.co"><img id="mtLogo" src="https://mobitracker.co/android-chrome-512x512.png" class="mtLogo"></a>
<a href="https://mobitracker.co" id="mtTitle" class="mtTitle">MOBITRACKER</a>
<?php
if(!isset($_SESSION["loggedin"])){
echo "<a id='lmLBtn' class='verify_btn lmBtn'>Login</a>";
echo "<a id='lmSBtn' class='verify_btn'>Sign Up</a>";
}
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
echo "<div class='userContainer'>";
if($_SESSION['verified'] == 1){
    echo "<img class='verified' src='https://mobitracker.co/src/verified.png'>";
}
echo "<a class='loginName' href='https://mobitracker.co/".$_SESSION['username']."'>".$_SESSION['username']."</a></div>";
}
?>