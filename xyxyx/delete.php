<?php
session_start();
header('Content-Type: application/json');

//VERIFICATION
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
//VERIFICATION
    require_once "../src/config.php";

    //ini_set('display_errors', 1);
    //ini_set('display_startup_errors', 1);
    //error_reporting(E_ALL);
    foreach ($_POST as $post => $p) {
      mysqli_real_escape_string($link, $p);
      $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
    }
    $id = $_POST['id'];

    if(!$link ) {
       die('Could not connect: ' . mysqli_error());
    }
    $sql = "SELECT r_player, u_creator FROM comments WHERE id = $id;";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    $r_player = $row['r_player'];
    $u_creator = $row['u_creator'];
    if(isset($_SESSION['privilage'])){
      $sql = "DELETE FROM comments WHERE id = $id;";
      $result = mysqli_query($link, $sql);

      $sql = "SELECT AVG(rating) AS avgRating FROM comments WHERE (r_player = '$r_player');";
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      $rating = round($row['avgRating']);
      if($rating == 0){
        $rating = -1;
      }

      $sql = "UPDATE players SET avgRating = $rating, reviewed_count = reviewed_count - 1 WHERE (username = '$r_player');";
      $result = mysqli_query($link, $sql);
      $sql = "UPDATE players SET com_count = com_count - 1 WHERE username = '$u_creator';";
      $result = mysqli_query($link, $sql);


      mysqli_close($link);
    }
//VERIFICATION
  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
//VERIFICATION
?>
