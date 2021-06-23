<?php
session_start();

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

require_once 'config.php';

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
    if(isset($_POST['faction'])){
      foreach ($_POST as $post => $p) {
        mysqli_real_escape_string($link, $p);
        $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
      }
      $f = $_POST['faction'];

      $_SESSION['contract'] = 1;

      if($f == "Lawful"){
        $f = 0;
        $_SESSION['faction'] = $f;
      }elseif($f == "Unlawful") {
        $f = 1;
        $_SESSION['faction'] = $f;
      }

      $_SESSION['daysleft'] = 30;
      $sql = "UPDATE players SET contracts = 1, faction = $f, daysleft = 30 WHERE cid = ".$_SESSION['cID'];
      if($result = mysqli_query($link, $sql)){
        echo "Success";
      }else{
        echo "Failure";
      }
    }
  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
?>
