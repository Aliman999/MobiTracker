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
echo "<p class='loginName'>".$_SESSION['username']."</p></div>";
}
?>