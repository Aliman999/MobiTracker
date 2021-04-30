<?php
session_start();
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    mysqli_real_escape_string($link, $_GET['username']);
    $username = $_GET['username'];

    if(!$link ) {
       die('Could not connect: ' . mysqli_error());
    }
    $sql = "SELECT reviewed_count, crew, escort, explorer, miner, pirate, trader FROM players WHERE username = '$username';";
    $result = mysqli_query($link, $sql);

    if($row = mysqli_fetch_assoc($result)){
      echo json_encode($row);
    }

    mysqli_close($link);
  }
}else{
  exit();
}

?>
