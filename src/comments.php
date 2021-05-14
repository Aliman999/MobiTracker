<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    foreach ($_GET as $get => $g){
      mysqli_real_escape_string($link, $g);
      $g = htmlentities($g, ENT_QUOTES, 'UTF-8');
    }
    $username = $_GET['username'];

    if(!$link ) {
       die('Could not connect: ' . mysqli_error());
    }

    $sql = "SELECT t1.id AS id, rating, u_creator, comment, r_player, flag, t1.created_at AS created_at, avatar, verify, reviewed_count FROM comments t1 INNER JOIN players t2 ON t1.u_creator = t2.username WHERE r_player = '$username' ORDER BY t1.created_at DESC;";
    $result = mysqli_query($link, $sql);
    $emparray = array();
    while($row = mysqli_fetch_assoc($result)){
      $emparray[] = $row;
    }

    echo json_encode($emparray);


    mysqli_close($link);
  }
}else{
  exit();
}
?>
