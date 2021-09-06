<?php
session_start();

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
      var_dump($_SESSION);
    $sql = "UPDATE discord SET (`username`, `cID`) VALUES (null, null) WHERE discUser = '%".$_SESSION["username"]."%';";
    echo $sql;
    //mysqli_query($link, $sql);
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
