<?php
session_start();
if(isset($_GET['search'])){
  $_SESSION['search'] = $_GET['search'];
}else{
  $_SESSION['search'] = "";
}
echo "New Search - ".$_SESSION['search'];
?>
