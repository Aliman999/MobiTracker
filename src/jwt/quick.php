<?php
require 'bootstrap.php';

use Carbon\Carbon;

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
$filter = [];
if(!isset($type)){
    if($_GET['type'] === 'player'){
        $filter = [
            "username"
        ];
        $type = $_GET['type'];
        $username = $_GET['username'];
        if (in_array($_GET['filter'], $filter)) {
        }else{
            $filter = 'username';
        }
    }elseif($_GET['type'] === 'org'){
        $filter = [
            "sid"
        ];
        $type = $_GET['type'];
        $username = $_GET['username'];
        if (in_array($_GET['filter'], $filter)) {
        }else{
            $filter = 'sid';
        }
    }else{
        exit(json_encode(["errorCode" => 0000000]));
    }
}

$secret = $_ENV['QUICK'];

$header = json_encode([
    'typ' => 'JWT',
    'alg' => 'HS256'
]);

$payload = json_encode([
    'cid' => $_SESSION['cID'],
    'username' => $_SESSION['username'],
    'privilage' => 0, //Disabled
    'prio' => $_SESSION['prio'],
    'type' => $type,
    'filter' => $filter,
    'query' => $username,
    'iat' => time() + (30 * 60)
]);

$base64UrlHeader = base64UrlEncode($header);

$base64UrlPayload = base64UrlEncode($payload);

$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);

$base64UrlSignature = base64UrlEncode($signature);

$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

if (isset($output)) {
    echo $jwt;
} else {
    $_SESSION['apiToken'] = $jwt;
}
