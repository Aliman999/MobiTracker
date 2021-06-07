<?php
session_start();
if(!isset($_SESSION['loggedin'])){
  exit();
}
