<?php
session_start();
if(!isset($_SESSION['loggedin'])){
  //exit("403 Forbidden.");
}
$accepted = ["email", "password", "discord", "privacy", "displayname", "referrals"];
echo $_SERVER['HTTP_REFERER'];

if(!in_array($_SESSION['activeSetting'], $accepted)){
  //header('Location: https://mobitracker.co/');
}

if($_POST['setting'] == 'email'){

}elseif($_POST['setting'] == 'password'){

}elseif($_POST['setting'] == 'discord'){

}elseif($_POST['setting'] == 'privacy'){

}elseif($_POST['setting'] == 'displayname'){

}elseif($_POST['setting'] == 'referrals'){

}else{
  //exit("403 Forbidden.");
}
