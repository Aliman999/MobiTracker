<?php
session_start();
define('include', TRUE);
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
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

      $id = htmlentities($_POST['id'], ENT_QUOTES, 'UTF-8');
      
      if(!$link ) {
        die('Could not connect: ' . mysqli_error());
      }
      $sql = "UPDATE comments SET flag = 0 WHERE id = $id;";
      mysqli_query($link, $sql);
      mysqli_close($link);
    }
} else {
    exit(json_encode(['error' => 'No CSRF token.']));
}
?>
