<?php
if (isset($_SESSION['token'])) {
  define('DB_SERVER', 'localhost');
  define('DB_USERNAME', 'login');
  define('DB_PASSWORD', 'Ninjaman');
  define('DB_NAME', 'users');



  function selectKey(){
    $apiKeys = array(
    "eb275472840a55ff74bcca0ba7baced0",
    "c032ae79fa8a389e5b6e2f17a191643e",
    "608c3b491aed563faca4bfef14f70c1c",
    "7d3192f880dee8c748ef4e02ee39b447",
    "c13b1badf9ccd433c90b4160c7664107"
    );

    return $apiKeys[array_rand($apiKeys, 1)];
  }

  $key = selectKey();

  $link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

  if($link === false){
      die("ERROR: Could not connect. " . mysqli_connect_error());
  }
}else{
  $var = preg_split("#/#", $_SERVER['REQUEST_URI']);
  foreach ($var as $var => $v) {
    if(!empty($v) && $v != "beta"){
      header("Location: ../login?ref=".$v);
    }
  }
}
?>
