<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '../vendor/autoload.php');

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    if(!empty($_POST['password']) && !empty($_POST['encrypt'])){
      if($_POST['encrypt'] = filter_var($_POST['encrypt'], FILTER_VALIDATE_BOOLEAN)){
        $password = mysql_real_escape_string($_POST["password"]);

        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);

        if(!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
            echo 'Your password should be at least 8 characters in length, include at least one upper case letter and one number.';
        }

        if($_POST["encrypt"] === true){
          $password = password_hash($password, PASSWORD_DEFAULT);
        }
        $sql = "UPDATE players SET password = '$password' WHERE username = '$_SESSION['username']'";
        if(mysqli_query($link, $sql)){
          echo 'Password Changed.';
        }
      }else{
        exit();
      }
    }else{
      exit(json_encode(['error' => 'Invalid Args.']));
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}