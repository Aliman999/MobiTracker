<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'login');
define('DB_PASSWORD', 'Ninjaman');
define('DB_NAME', 'users');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if($link === false){
  die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "SELECT * FROM apiKeys;";

$result = mysqli_query($link, $sql);
$keys = array();
while($row = mysqli_fetch_assoc($result)){
  $keys[] = $row;
}
var_dump($keys);
