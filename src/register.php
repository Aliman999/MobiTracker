<?php
session_start();

// Include config file
require_once "../src/config.php";
$requestURL = '';

if($_POST['tcpp'] == 0){
  exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define variables and initialize with empty values
$username = $password = $email = $avatar = "";
$username_err = $password_err = $email_err = "";
$update = 0;
$cID = 0;

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
  // Validate username
  if(empty(trim($_POST["username"]))){
    $username_err = "Please enter a username.";
  }else{
    // Prepare a select statement
    $param_username = trim($_POST["username"]);
    $sql = "SELECT id, username, signup FROM players WHERE (username = '$param_username' AND signup = 1)";
    // Attempt to execute the prepared statement
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    var_dump($row);
    if(isset($row)){
      if(count($row)>0){
        $username_err = "This RSI Handle has already been taken.";
      }else{
        $obj = file_get_contents("https://api.dustytavern.com/user/".$param_username);//json_decode();
        var_dump($obj);
        $cID = $obj['data']['profile']['id'];
        if($cID == "n/a"){
          $cID = 0;
        }else{
          $cID = substr($cID, 1);
        }

        $sql = "SELECT id, username, signup FROM players WHERE (username = '$param_username' AND signup = 0);";
        if($obj['data']['profile']){
          $result = mysqli_query($link, $sql);
          $row = mysqli_fetch_assoc($result);
          if(count($row)>0){
            $username_err = "This RSI Handle has already been taken.";
          }
        }else{
          $username_err = "This is not a RSI Handle";
        }

        $res = $obj['data']['profile']['badge'];
        if($res == "Developer" || $res == "Administrator" || $res == "Moderator" || $res == "Staff" || $res == "Creator"){
          $username_err = "You cannot use this Handle";
          $username = "";
        }
        $avatar = $obj['data']['profile']['image'];
        $username = $obj['data']['profile']['handle'];


        $sql = "SELECT cID FROM players WHERE cID = $cID";
        if($result = mysqli_query($link, $sql)){
          $row = mysqli_fetch_assoc($result);
          if(count($row) > 0){
            $sql = "SELECT players WHERE cID = $cID AND signup = 1;";

            if($result = mysqli_query($link, $sql)){
              $sql = "UPDATE players SET username = '$username' WHERE cID = $cID AND signup = 1;";

              $result = mysqli_query($link, $sql);
              $username_err = "You changed your username. <br>Login with your new username.";
            }else{
              $update = 1;
            }
          }else{
            $update = 0;
          }
        }
      }
    }
  }

  // Validate password
  if(empty(trim($_POST["password"]))){
      $password_err = "Please enter a password.";
  } elseif(strlen(trim($_POST["password"])) < 6){
      $password_err = "Password must have atleast 6 characters.";
  } else{
      $password = trim($_POST["password"]);
  }

  // Validate confirm password
  if(empty(trim($_POST["email"]))){
      $email_err = "Please enter an Email";
  }

  // Check input errors before inserting in database
  if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 0){
      // Prepare an insert statement
      $cID = $cID;
      $param_username = $username;
      $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
      $param_email = $email; // email hash
      $param_avatar = $avatar;
      $sql = "INSERT INTO players (cID, username, password, email, organization, avatar, signup) VALUES ($cID, '$param_username', '$param_password', '$param_email', '{}', '$param_avatar', 1);";
      echo $sql;
      mysqli_query($link, $sql);
  }
  if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 1){

    $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
    $sql = "UPDATE players SET password = '$param_password', email = '$emai'l, avatar = '$avatar', signup = 1 WHERE username = '$username'";
    mysqli_query($link, $sql);
  }

  // Close connection
  mysqli_close($link);
  $errors = array(
    'username' => $username_err,
    'email' => $email_err,
    'password' => $password_err
  );
  echo json_encode($errors);
}
?>
