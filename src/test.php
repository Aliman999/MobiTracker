<?php
/*
require_once "config.php";

if(!$link ) {
  die('Could not connect: ' . mysqli_error());
}

  $sql = "SELECT username FROM players";
  $result = mysqli_query($link, $sql);
  $emparray = array();
  $x=0;
  while($row = mysqli_fetch_assoc($result)){
    $emparray[$x] = $row['username'];
    echo $emparray[$x]."<br>";
    file_get_contents("https://mobitracker.co/src/api.php?username=$emparray[$x]");
  }

  mysqli_close($link);
?>
