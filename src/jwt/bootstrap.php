<?php
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

function base64UrlEncode($text)
{
    return str_replace(
      ['+', '/', '='],
      ['-', '_', ''],
      base64_encode($text)
    );
}
?>
