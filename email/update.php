<?php
echo isset($_SESSION['username']);
if(!defined('include')) {
   die('Direct access not permitted');
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../src/config.php";
foreach ($_GET as $get => $g){
  mysqli_real_escape_string($link, $g);
  $g = htmlentities($g, ENT_QUOTES, 'UTF-8');
}

//Encrypt Email
$c = base64_decode($_GET['token']);
$key = "Ke7CF6gytaMufbSL-cwEFA";
$ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
$iv = substr($c, 0, $ivlen);
$hmac = substr($c, $ivlen, $sha2len=32);
$ciphertext_raw = substr($c, $ivlen+$sha2len);
$original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
$calcmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
if (hash_equals($hmac, $calcmac))// timing attack safe comparison
{
    echo $original_plaintext."\n";
}


if(!$link ) {
    die('Could not connect: ' . mysqli_error());
}
/*
$sql = "SELECT t1.id AS id, rating, u_creator, comment, r_player, flag, approval, t1.created_at AS created_at, avatar, verify, reviewed_count FROM comments t1 INNER JOIN players t2 ON t1.u_creator = t2.username WHERE r_player = '$username' ORDER BY t1.created_at DESC;";
$result = mysqli_query($link, $sql);
$emparray = array();
while($row = mysqli_fetch_assoc($result)){
  $emparray[] = $row;
}
echo json_encode($emparray);
*/


mysqli_close($link);
?>
