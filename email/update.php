<?php
if(!defined('include')) {
   die('Direct access not permitted');
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/**
 * Decrypt a message
 * 
 * @param string $encrypted - message encrypted with safeEncrypt()
 * @param string $key - encryption key
 * @return string
 * @throws Exception
 */
function safeDecrypt(string $encrypted, string $key): string
{   
    $decoded = base64_decode($encrypted);
    $nonce = mb_substr($decoded, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, '8bit');
    $ciphertext = mb_substr($decoded, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, null, '8bit');
    
    $plain = sodium_crypto_secretbox_open(
        $ciphertext,
        $nonce,
        $key
    );
    if (!is_string($plain)) {
        throw new Exception('Invalid MAC');
    }
    sodium_memzero($ciphertext);
    sodium_memzero($key);
    return $plain;
}

$key = base64_decode("ICHsU01ezVaEaCpT+3AMvaSLWAaQco4Bm/fodkIbJCU=");

if($decrypt = safeDecrypt($_GET['token'], $key)){
  echo $key;
}
require_once "";

require_once "../src/config.php";

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
