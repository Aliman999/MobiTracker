<?php
session_start();

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    function init(){
    }

    changeSetting($_POST['job'], $setting);
    function changeSetting(job, setting){
      if($job === "email"){
        $sql = "UPDATE";
      }
      $result = mysqli_query($link, $sql);
      $emparray = array();
      while($row = mysqli_fetch_assoc($result)){
        $emparray[] = $row;
      }
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
