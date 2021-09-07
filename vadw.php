<?php
if(!isset($_SESSION['search'])){
  $_SESSION['search'] = "";
}
if (!empty($_GET['search'])) {
  $_SESSION['search'] = $_GET['search'];
}
?>
