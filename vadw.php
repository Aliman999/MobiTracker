<?php
session_start();
if(!empty($_GET['search'])){
  $_SESSION['search'] = $_GET['search'];
}
if(!empty($_GET['register'])){
  $_SESSION['navRegister'] == true;
}
?>
