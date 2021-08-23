<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '../vendor/autoload.php');

var_dump($_POST);

//$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    if(!empty($_POST['email'])){
      /**
       * Encrypt a message
       * 
       * @param string $message - message to encrypt
       * @param string $key - encryption key
       * @return string
       * @throws RangeException
       */
      function safeEncrypt(string $message, string $key): string
      {
          if (mb_strlen($key, '8bit') !== SODIUM_CRYPTO_SECRETBOX_KEYBYTES) {
              throw new RangeException('Key is not the correct size (must be 32 bytes).');
          }
          $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
          
          $cipher = base64_encode(
              $nonce.
              sodium_crypto_secretbox(
                  $message,
                  $nonce,
                  $key
              )
          );
          sodium_memzero($message);
          sodium_memzero($key);
          return $cipher;
      }
      $_POST['encrypt'] = filter_var($_POST['encrypt'], FILTER_VALIDATE_BOOLEAN);
      $password = mysql_real_escape_string($_POST["password"]);
      if($_POST["encrypt"] == true){

      }else{

      }
      if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $emailErr = "Invalid email format";
        exit(json_encode([
          'status' => 0,
          'data' => $emailErr
        ]));
      }
      $key = base64_decode("ICHsU01ezVaEaCpT+3AMvaSLWAaQco4Bm/fodkIbJCU=");      

      $encryptEmail = base64_encode(safeEncrypt(json_encode(["id" => $_SESSION['id'], "email" => strtolower($email), "iat" => (time() + (24 * 60 * 60))]), $key));
    }else{
      exit(json_encode(['error' => 'Invalid Args.']));
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}