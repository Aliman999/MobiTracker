<?php
if(!empty($_GET['token'])){
  var_dump($_GET);
  die("503 Forbidden. Turn around and make a left turn."); 
}else{
  define('include', TRUE);
  include "update.php";
}