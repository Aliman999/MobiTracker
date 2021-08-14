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

if($decrypt = safeDecrypt(base64_decode($_GET['token']), $key)){
  $decrypt = json_decode($decrypt);
  var_dump($decrypt);
  if($decrypt->iat < time()){
    die("Token Expired.");
  }else{
    require_once "../src/config.php";
  }

  if(!$link ) {
      die('Could not connect: ' . mysqli_error());
  }
  $sql = "UPDATE players SET email = '".strtolower($decrypt->email)."' WHERE id = '".$decrypt->id."';";
  if(mysqli_query($link, $sql)){
    session_start();
    $sql = "SELECT players.username AS username, players.cid AS cid, players.id AS id, JSON_EXTRACT(organization, '$**.sid') AS sid, JSON_EXTRACT(organization, '$**.rank') AS orgRank, avatar, verify, contracts, players.faction, daysleft, avatar, tcpp, contractPref, banned, com_count, contractCD, reviewed_count, COUNT(contracts.markComplete) AS completed, SUM(IFNULL(priority, 8)) AS prio FROM players LEFT JOIN contracts ON username = u_creator LEFT JOIN discord ON discord.username LIKE CONCAT('%', players.username, '%') WHERE players.id = '".$decrypt->id."' GROUP BY sid, orgRank, verify, contracts, players.faction, daysleft, avatar, contractPref, banned, com_count, contractCD, reviewed_count, avatar, tcpp, priority, players.id;";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    if($row['verify'] == 1){
      $_SESSION["verified"] = 1;
    }else {
      $_SESSION["verified"] = 0;
    }
    if($row['contracts'] == 1){
      $c = $row['contracts'];
      $f = $row['faction'];
      $dl = $row['daysleft'];
      $pref = $row['contractPref'];
    }
    if($row['banned'] == 1){
      $b = 1;
      $username_err = "Your account is banned.";
      session_start();
      unset($_SESSION);
      session_destroy();
      session_write_close();
    }else{
      $b = 0;
    }
    if(!$row['contractCD']){
      $contractCD = time();
    }else{
      $contractCD = $row['contractCD'];
    }
    require_once "../src/whitelist.php";

    // Store data in session variables
    $_SESSION["loggedin"] = true;
    $_SESSION["cID"] = $row['cid'];
    $_SESSION["log"] = 1;
    $_SESSION["username"] = $row['username'];
    $_SESSION['banned'] = $b;
    $_SESSION['contract'] = $c;
    $_SESSION['contractCD'] = $contractCD;
    $_SESSION['faction'] = $f;
    $_SESSION['daysleft'] = $dl;
    $_SESSION['cPref'] = json_decode($pref, true);
    $_SESSION['vouchers'] = $row['reviewed_count'];
    $_SESSION['completed'] = $row['completed'];
    $_SESSION['avatar'] = $row['avatar'];
    $_SESSION['tcpp'] = $row['tcpp'];
    $_SESSION['prio'] = $row['prio'];
    $_SESSION['id'] = $row['id'];

    //$_SESSION['debug'] = $sql;
    require_once "../src/jwt/generate_jwt.php";

    if($_SESSION['verified'] == 0){
      $_SESSION['com_count'] = $row['com_count'];
    }
    unset($_SESSION['token']);

    if (empty($_SESSION['token'])) {
      $_SESSION['token'] = bin2hex(random_bytes(32));
    }
    
    if(in_array($_SESSION['username'], $staff)){
      $_SESSION['privilage'] = true;
    }else{
      $_SESSION['privilage'] = false;
    }
    $orgs = json_decode($row['sid'], true);
    $ranks = json_decode($row['orgRank'], true);
    $x=0;
    foreach ($orgs as $org => $o) {
      $_SESSION["org"][$x] = [
          "sid"=>$orgs[$x],
          "rank"=>$ranks[$x]
        ];
      $x++;
    }
    header('Location: https://mobitracker.co/beta/settings/email/');
  }
}
mysqli_close($link);
?>
