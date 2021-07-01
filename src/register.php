<?php
session_start();

// Include config file
require_once "../src/config.php";
$requestURL = 'https://api.starcitizen-api.com/'.getKey().'/v1/live/user/';

if($_POST['tcpp'] == 0){
  exit();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define variables and initialize with empty values
$username = $password = $email = $avatar = "";
$username_err = $password_err = $email_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
  // Validate username
  if(empty(trim($_POST["username"]))){
    $username_err = "Please enter a username.";
  }else{
    // Prepare a select statement
    $sql = "SELECT id, username, signup FROM players WHERE (username = ? AND signup = 1)";
    if($stmt = mysqli_prepare($link, $sql)){
      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param($stmt, "s", $param_username);

      // Set parameters
      $param_username = trim($_POST["username"]);
      // Attempt to execute the prepared statement
      if(mysqli_stmt_execute($stmt)){
        /* store result */
        mysqli_stmt_store_result($stmt);

        if(mysqli_stmt_num_rows($stmt) == 1){
          echo "Running name";
          $username_err = "This handle has been taken";
        }else{
          echo "Running name";
          $obj = json_decode(file_get_contents($requestURL.$_POST['username']), true);
          $sql = "SELECT id, username, signup FROM players WHERE (username = ? AND signup = 0)";
          if($obj['data']['profile']){
            if($stmt = mysqli_prepare($link, $sql)){

              mysqli_stmt_bind_param($stmt, "s", $param_username);
              $param_username = trim($_POST["username"]);

              if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
                  $update = 1;
                }
              }
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

          $sql = "SELECT cID FROM players WHERE cID = ?";

          if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $cID);
            $cID = $obj['data']['profile']['id'];
            $cID = substr($cID, 1);

            if(mysqli_stmt_execute($stmt)){

              mysqli_stmt_store_result($stmt);

              if(mysqli_stmt_num_rows($stmt) == 1){
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
      } else{
        echo "Oops! Something went wrong. Please try again later.";
      }

      // Close statement
      mysqli_stmt_close($stmt);
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
  }else{
    $sql = "SELECT email FROM players WHERE (email = ?)";
    if($stmt = mysqli_prepare($link, $sql)){
      mysqli_stmt_bind_param($stmt, "s", $param_email);
      $param_email = trim($_POST["email"]);

      if(mysqli_stmt_execute($stmt)){
        mysqli_stmt_store_result($stmt);
        if(mysqli_stmt_num_rows($stmt) == 1){
          $email_err = "This email has already been used";
        }else{
          $email = trim($_POST["email"]);
        }
      }
    }
  }

  // Check input errors before inserting in database
  if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 0){
      // Prepare an insert statement
      $param_username = $username;
      $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
      $param_email = $email; // email hash
      $param_avatar = $avatar;
      $sql = "INSERT INTO players (cID, username, password, email, organization, avatar, signup) VALUES ($cID, '$param_username', '$param_password', '$param_email', '{}', '$param_avatar', 1);";
      mysqli_query($link, $sql);
      // Close statement
      mysqli_stmt_close($stmt);
  }
  if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 1){
          // Prepare an insert statement
          $sql = "UPDATE players SET password = ?, email = ?, avatar = ?, signup = 1 WHERE username = ?";

          if($stmt = mysqli_prepare($link, $sql)){
              // Bind variables to the prepared statement as parameters
              mysqli_stmt_bind_param($stmt, "ssss",  $param_password, $param_email, $param_avatar, $param_username);

              // Set parameters
              $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
              $param_email = $email;
              $param_avatar = $avatar;
              $param_username = $username;

              // Attempt to execute the prepared statement
              mysqli_stmt_execute($stmt);

              // Close statement
              mysqli_stmt_close($stmt);
          }
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
