<?php
if(isset($_GET['search'])){
  $_SESSION['search'] = $_GET['search'];
}else{
  $_SESSION['search'] = "";
}
echo $_SESSION['search'];
?>
