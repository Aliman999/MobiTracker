<?php
session_start();

$headers = $_SESSION['token'];

if(isset($headers)){
    function init(){
      $sql = "SELECT * FROM players WHERE username = '".$_SESSION['username']."';";
      $result = mysqli_query($link, $sql);
      $emparray = array();
      while($row = mysqli_fetch_assoc($result)){
        $emparray[] = $row;
      }
      var_dump($emparray);
    }
    init();
}else{
   exit(json_encode(['error' => 'No token.']));
}
