<?php
session_start();
if(isset($_GET['search'])){
  $_SESSION['search'] = $_GET['search'];
}
?>
