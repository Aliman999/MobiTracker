<?php
session_start();
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//VERIFICATION
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
    if ($headers !== $_SESSION['token']) {
        exit(json_encode(['error' => 'Wrong CSRF token.']));
    }else{
//VERIFICATION
      include "config.php";
      foreach ($_POST as $post => $p) {
        mysqli_real_escape_string($link, $p);
        $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
      }
      var_dump($_POST);
      $u_player = $_POST['u_player'];
      $r_player = $_POST['r_player'];
      $avatar = $_POST['avi'];
      $rating = $_POST['rating'];
      $comment = $_POST['comment'];
      if($u_player !== $_SESSION['username']){
        exit();
      }elseif ($u_player == $r_player) {
        exit();
      }else{

        $param_u_player = $param_r_player = $param_password = $param_email = $param_avatar = $param_rating = $param_comment = $r_player_err = '';

        $sql = "SELECT id, username FROM players WHERE (username = ? AND signup = 1) OR (username = ? AND signup = 0)";

        if($stmt = mysqli_prepare($link, $sql)){

          mysqli_stmt_bind_param($stmt, "ss", $param_r_player , $param_r_player_dupe);

          $param_r_player = $r_player;
          $param_r_player_dupe = $r_player;

          if(mysqli_stmt_execute($stmt)){

            mysqli_stmt_store_result($stmt);

            if(mysqli_stmt_num_rows($stmt) == 1){

                $r_player_err = 0;

            }else{
                $sql = "SELECT verify, com_count FROM players WHERE username = '$r_player';";
                $result = mysqli_query($link, $sql);
                $row = mysqli_fetch_assoc($result);
                $r_player_err = 1;

                $json = file_get_contents("https://api.starcitizen-api.com/".$key."/v1/auto/user/".$r_player);
                $xmlResult = json_decode($json, true);

                if($xmlResult['data']['profile']['id'] != "n/a"){
                  $userID = substr($xmlResult['data']['profile']['id'], 1);
                }else{
                  $userID = null;
                }

                $param_r_player = $r_player;
                $param_password = "mobiTrackerTemporaryPassword";
                $param_email = '';
                $param_avatar = $avatar;
                $param_rating = $rating;

                $sql = "INSERT INTO players (cID, username, password, email, avatar, avgRating, signup) VALUES ($userID, '$param_r_player', '$param_password', '$param_email', '$param_avatar', $param_rating, 0);";
                echo $sql;
                if(!mysqli_query($link, $sql)){
                  echo "Something went wrong. Please try again later.";
                  echo "Prepare error: " . mysqli_error($link);
                }else{
                  $ver_check = $row['verify'];
                  $com_count = $row['com_count'];
                  $u_check = $_SESSION['username'];
                  $sql = "SELECT u_creator FROM comments WHERE u_creator = '$u_check' AND r_player = '$r_player'";
                  $result = mysqli_query($link, $sql);
                  if(mysqli_fetch_assoc($result)){
                    $r_player_err = 1;
                  }else{
                    $r_player_err = 0;
                  }
                  if($ver_check == 0){
                    if($com_count == 3){
                      $r_player_err = 1;
                    }
                  }
                  echo "works";
                }

              }
          }
        }

        if($r_player_err == 0){
          $sql = "INSERT INTO comments (rating, u_creator, comment, r_player) VALUES (?, ?, ?, ?) ";
          if($stmt = mysqli_prepare($link, $sql)){

            mysqli_stmt_bind_param($stmt, "ssss", $param_rating, $param_u_player, $param_comment, $param_r_player);
            $param_rating = $rating;
            $param_u_player = $u_player;
            $param_comment = $comment;
            $param_r_player = $r_player;

            if(mysqli_stmt_execute($stmt)){
              $username = $r_player;
              $sql = "SELECT AVG(rating) AS rating FROM comments WHERE r_player = '$username';";
              $result = mysqli_query($link, $sql);
              $row = mysqli_fetch_assoc($result);

              $sql = "UPDATE players SET avgRating = ? WHERE (username = ?)";
              if($stmt = mysqli_prepare($link, $sql)){
                mysqli_stmt_bind_param($stmt, "ss", $param_rating, $param_r_player);
                $param_rating = $row['rating'];
                $param_r_player = $r_player;

                $sql = "UPDATE players SET com_count = com_count + 1 WHERE username = '$param_u_player';";
                $result = mysqli_query($link, $sql);
                $sql = "UPDATE players SET reviewed_count = reviewed_count + 1 WHERE username = '$param_r_player';";
                $result = mysqli_query($link, $sql);

                if(isset($_SESSION['com_count'])){
                  $_SESSION['com_count']++;
                }

                if(mysqli_stmt_execute($stmt)){
                }else{
                  echo "Something went wrong. Please try again later.";
                  echo "Prepare error: " . mysqli_error($stmt);
                }
              }
            }else{
              echo "Something went wrong. Please try again later.";
              echo "Prepare error: " . mysqli_error($stmt);
            }

          }

        }
        mysqli_close($link);
      }
    }
//VERIFICATION
} else {
    exit(json_encode(['error' => 'No CSRF token.']));
}
//VERIFICATION
?>
