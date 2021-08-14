<?php
if(!empty($_GET['token'])){
  echo isset($_SESSION['username']);
  define('include', TRUE);
  include "update.php";
}else{
  die("503 Forbidden. Turn around and make a left turn."); 
}
?>
<script src="main.js"></script>