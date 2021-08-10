<?php
if(!empty($_GET['token'])){
  exit("503 Forbidden. Turn around and make a left turn."); 
}else{
  define('include', TRUE);
  include "update.php";
}