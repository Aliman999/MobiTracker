<?php
session_start();
require 'bootstrap.php';
use Carbon\Carbon;

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
    if( $_GET['c'] == -1 && $_GET['a'] == -1 && $_GET['r'] == -1 ){
      exit();
    }elseif( !isset($_GET['c']) || !isset($_GET['a']) || !isset($_GET['r']) ){
      exit();
    }

    $secret = $_ENV['SECRET'];

    $header = json_encode([
        'typ' => 'JWT',
        'alg' => 'HS256'
    ]);
    $payload = json_encode([
        'cid' => $_SESSION['cID'],
        'username' => $_SESSION['username'],
        'faction' => $_SESSION['faction'],
        'contracts' => $_GET['c'],
        'escrow' => $_GET['a'],
        'applicants' => $_GET['a'],
        'reviews' => $_GET['r'],
        'exp' => time()+(60*5)
    ]);

    $base64UrlHeader = base64UrlEncode($header);

    $base64UrlPayload = base64UrlEncode($payload);

    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);

    $base64UrlSignature = base64UrlEncode($signature);

    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

    echo $jwt;
  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
?>
