<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('include', TRUE);

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    if(!empty($_POST['password'])){    
      include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '../src/config.php');
      $password = mysqli_real_escape_string($link, $_POST["password"]);

      $uppercase = preg_match('@[A-Z]@', $password);
      $lowercase = preg_match('@[a-z]@', $password);
      $number    = preg_match('@[0-9]@', $password);

      if(!$uppercase || !$lowercase || !$number || strlen($password) < 8) {
        echo json_encode([
          "status" => 0,
          "data" => 'Your password should be at least 8 characters in length, include at least one upper case letter and one number.'
        ]);
      }

      $password = password_hash($password, PASSWORD_DEFAULT);
      $sql = "UPDATE players SET password = '$password' WHERE username = '".$_SESSION['username']."'";
      if(mysqli_query($link, $sql)){
        echo json_encode([
          "status" => 1,
          "data" => 'Password Changed.'
        ]);
      }
    }else{
      exit(json_encode(['error' => 'Invalid Args.']));
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}