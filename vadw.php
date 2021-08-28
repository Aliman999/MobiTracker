<?php
session_start();
if(!empty($_GET['search'])){
  $_SESSION['search'] = $_GET['search'];
}
?>
