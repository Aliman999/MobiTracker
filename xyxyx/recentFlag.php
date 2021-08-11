<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
session_start();
define('include', TRUE);
require_once "../src/config.php";

$sql = "SELECT t1.id AS id, rating, u_creator, comment, r_player, flag, t1.created_at AS created_at, avatar, verify FROM comments t1 INNER JOIN players t2 ON t1.u_creator = t2.username WHERE flag = 1 ORDER BY t1.created_at DESC;";
$result = mysqli_query($link, $sql);
$emparray = array();
while($row = mysqli_fetch_assoc($result)){
  $emparray[] = $row;
}
echo json_encode($emparray);

mysqli_close($link);
?>
