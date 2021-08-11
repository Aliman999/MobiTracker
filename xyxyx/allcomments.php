<?php
session_start();
define('include', TRUE);
require_once "../src/config.php";
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
if(!$link ) {
   die('Could not connect: ' . mysqli_error());
}
$sql = "SELECT t1.id AS id, rating, u_creator, comment, r_player, flag, t1.created_at AS created_at, avatar, verify FROM comments t1 INNER JOIN players t2 ON t1.u_creator = t2.username WHERE flag = 0 ORDER BY t1.created_at DESC LIMIT 10;";
$result = mysqli_query($link, $sql);
$emparray = array();
while($row = mysqli_fetch_assoc($result)){
  $emparray[] = $row;
}
echo json_encode($emparray);

mysqli_close($link);
?>
