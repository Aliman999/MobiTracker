<?php
session_start();
if(!isset($_SESSION['loggedin'])){
  exit();
}
$accepted = ["email", "password", "discord", "privacy", "displayname", "referrals"];
if(in_array($_SESSION['activeSetting'], $accepted)){

}
