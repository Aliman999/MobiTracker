<?php
session_start();
header('Content-Type: application/json');

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
    if ($headers !== $_SESSION['token']) {
        exit(json_encode(['error' => 'Wrong CSRF token.']));
    }else{
      require_once "config.php";

      //ini_set('display_errors', 1);
      //ini_set('display_startup_errors', 1);
      //error_reporting(E_ALL);
      foreach ($_POST as $post => $p) {
        mysqli_real_escape_string($link, $p);
        $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
      }
      $id = $_POST['id'];
      $bool = $_POST['bool'];


      if(isset($_SESSION['flag'])){
        if (strpos($_SESSION['flag'], $id) !== false) {
          $collect = $_SESSION['flag'];
          $collect = str_replace($id,"",$collect);
          $_SESSION['flag'] = $collect;
        }else{
          $collect = $_SESSION['flag'].$id;
          $_SESSION['flag'] = $collect;
        }
      }else{
        $_SESSION['flag'] = $id;
      }

      if(!$link ) {
        die('Could not connect: ' . mysqli_error());
      }
      if($bool == 1){
        $sql = "UPDATE comments SET flag = flag + 1 WHERE id = $id;";
        mysqli_query($link, $sql);
      }else{
        $sql = "UPDATE comments SET flag = flag - 1 WHERE id = $id;";
        mysqli_query($link, $sql);
      }
      mysqli_close($link);
    }
} else {
    exit(json_encode(['error' => 'No CSRF token.']));
}
?>
