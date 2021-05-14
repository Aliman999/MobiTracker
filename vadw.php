<?php
session_start();
echo $_SESSION['search'];
if(isset($_GET['search'])){
  $_SESSION['search'] = $_GET['search'];
}else{
  $_SESSION['search'] = "";
}
?>
