<?php
require 'bootstrap.php';
use Carbon\Carbon;

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

$secret = $_ENV['SECRET'];

$header = json_encode([
    'typ' => 'JWT',
    'alg' => 'HS256'
]);

$payload = json_encode([
    'cid' => $_SESSION['cID'],
    'username' => $_SESSION['username'],
    'privilage' => $_SESSION['privilage'],
    'prio' => $_SESSION['priority'],
    'iat' => time()+(60*60*4)
]);

$base64UrlHeader = base64UrlEncode($header);

$base64UrlPayload = base64UrlEncode($payload);

$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);

$base64UrlSignature = base64UrlEncode($signature);

$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

$_SESSION['jwt'] = $jwt;
?>
