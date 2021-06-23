<?php
session_start();
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "config.php";
    $sql = "SELECT faction FROM contracts WHERE faction = 0 OR faction = 1 AND archived = 0 AND completed = 0";
    $result = mysqli_query($link, $sql);
    $emparray = array( "lawful"=>0, "unlawful"=>0, "total"=>0 );
    while($row = mysqli_fetch_assoc($result)){
      if($row['faction'] == 0){
        $emparray['lawful']++;
      }else{
        $emparray['unlawful']++;
      }
      $emparray['total']++;
    }
    echo json_encode($emparray);
  }
}else{
  exit();
}
