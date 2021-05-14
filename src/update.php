<?php
session_start();
header('Content-Type: application/json');

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
    if ($headers !== $_SESSION['token']) {
        exit(json_encode(['error' => 'Wrong token.']));
    }else{
      require_once "config.php";
      foreach ($_POST as $post => $p) {
        mysqli_real_escape_string($link, $p);
        $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
      }
      $id = $_POST['id'];
      $rating = $_POST['rating'];
      $comment = $_POST['comment'];

      //ini_set('display_errors', 1);
      //ini_set('display_startup_errors', 1);
      //error_reporting(E_ALL);

      $param_id = $param_rating = $param_comment = '';

      $sql = "SELECT r_player, u_creator FROM comments WHERE id = $id;";
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      $username = $row['r_player'];
      $u_creator = $row['u_creator'];
      if($u_creator !== $_SESSION['username']){
        exit();
      }else{
        $sql = "UPDATE comments SET rating = $rating, comment = '$comment', created_at = current_timestamp WHERE (id = $id);";
        echo $sql;
        $result = mysqli_query($link, $sql);
      }
    }
} else {
    exit(json_encode(['error' => 'No token.']));
}
?>
