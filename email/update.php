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
$ciphertext = $_GET['token'];
$cipher = "aes-128-gcm";
$key = "Ke7CF6gytaMufbSL-cwEFA";
$decrypted = null;
if (in_array($cipher, openssl_get_cipher_methods())){
  $ivlen = openssl_cipher_iv_length($cipher);
  $iv = openssl_random_pseudo_bytes($ivlen);
  $decrypted = openssl_decrypt($ciphertext, $cipher, $key, $options=0, $iv, $tag);
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
