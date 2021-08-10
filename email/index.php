<?php
if(!empty($_GET['token'])){
  session_start();
  echo isset($_SESSION['username']);
  define('include', TRUE);
  include "update.php";
}else{
  die("503 Forbidden. Turn around and make a left turn."); 
}