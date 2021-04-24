<?php
  session_start();
  if (empty($_SESSION['loggedin'])) {
    header("location: https://mobitracker.co/login");
  }else{
    if($_SESSION['daysleft']>0){
      exit();
    }
    unset($_SESSION['contract']);
    require_once "../src/config.php";
    
    $sql = "UPDATE players SET faction = -1, daysleft = 90 WHERE cid = '".$_SESSION['cID']."'";
    $result = mysqli_query($link, $sql);
  }

  header('Location: ../contracts');
  die;
?>
