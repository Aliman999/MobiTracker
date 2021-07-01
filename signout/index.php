<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
if(dirname($_SERVER['HTTP_REFERER']) != "beta"){
  $ref = dirname($_SERVER['HTTP_REFERER']);
}else{
  $ref = "";
}
unset($_SESSION);
session_destroy();
session_write_close();
header('Location: ../'.$ref);
die;
?>
