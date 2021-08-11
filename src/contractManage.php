<?php
session_start();

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

define('include', TRUE);
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
require_once "config.php";
require_once "services.php";
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
    foreach ($_POST as $post => $p) {
      mysqli_real_escape_string($link, $p);
      $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
    }
    $username = $_SESSION['username'];
    $command = $_POST['c']; //Operation the user wants to do to a contract
    $cid = $_POST['cid']; //Contract ID
    if(isset($_POST['id'])){
      $id = $_POST['id']; //Index of Applicants or Accepted depending on the operation
    }
    if(isset($_POST['editUnsecure']) && isset($_POST['editSecure']) && isset($_POST['editPrice']) && $command == "edit"){ //If they want to edit their contract
      $unsecure = $_POST['editUnsecure'];
      $secure = $_POST['editSecure'];
      $price = $_POST['editPrice'];
    }
    if($command == "accept"){
      $sql = "SELECT apps->'$.*' AS apps, acc->'$.*' AS acc, escrow, type FROM contracts WHERE id = $cid AND u_creator = '$username'";
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      $apps = json_decode($row['apps'], true);
      $escrow = json_decode($row['escrow'], true);
      if($row['acc']){
        $accepted = json_decode($row['acc'], true);
      }else{
        $accepted = array();
      }
      if(count($apps) == 0 || count($row) == 0){
        exit();
      }
      $accepted[count($accepted)] = $apps[$id];
      $temp = array();
      if($escrow['ESCROW'] == 1){
        foreach ($accepted as $acc => $a) {
          $temp[] = $a['handle'];
        }
        if($row['type'] == "O"){
          $escrow['PAYOR'] = join(", " ,$temp);
          $payor = "payor = '[".json_encode($escrow['PAYOR'])."]'";
        }elseif($row['type'] == "R"){
          $escrow['PAYEE'] = join(", " ,$temp);
          $payee = "payee = '[".json_encode($escrow['PAYEE'])."]'";
        }


        unset($apps[$id]);
        echo $id;
        $apps = array_values($apps);
        var_dump($apps);
        $apps = json_encode($apps,  JSON_FORCE_OBJECT);

        $escrow = json_encode($escrow);
        $accepted = json_encode($accepted,  JSON_FORCE_OBJECT);
        $sql = "UPDATE contracts SET acc = '$accepted', escrow = '$escrow', apps = '$apps' WHERE id = $cid AND u_creator = '$username'; UPDATE escrow SET $payee $payor WHERE id = $cid AND u_creator = '$username';";
        if($result = mysqli_multi_query($link, $sql)){
          echo "Success";
          echo $sql;
        }else{
          echo mysqli_error($link);
        }
      }else{
        unset($apps[$id]);
        echo $id;
        $apps = array_values($apps);
        var_dump($apps);
        $apps = json_encode($apps,  JSON_FORCE_OBJECT);

        $accepted = json_encode($accepted,  JSON_FORCE_OBJECT);
        $sql = "UPDATE contracts SET acc = '$accepted', apps = '$apps' WHERE id = $cid AND u_creator = '$username';";
        if($result = mysqli_multi_query($link, $sql)){
          echo "Success";
        }
      }
      mysqli_close($link);
    }

    if($command == "deny"){
      $sql = "SELECT apps->'$.*' AS apps FROM contracts WHERE id = $cid AND u_creator = '$username'";
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      $apps = json_decode($row['apps'], true);
      if(count($apps) == 0){
        exit();
      }
      unset($apps[$id]);
      $apps = array_values($apps);
      $apps = json_encode($apps,  JSON_FORCE_OBJECT);
      $sql = "UPDATE contracts SET apps = '$apps' WHERE id = $cid AND u_creator = '$username'";
      if($result = mysqli_query($link, $sql)){
        echo "Success";
      }
      mysqli_close($link);
    }

    if($command == "delete"){
      $sql = "DELETE FROM contracts WHERE id = $cid AND u_creator = '$username'";
      if(mysqli_query($link, $sql)){
        echo "Success";
        mysqli_close($link);
      }else{
        echo mysqli_error($link);
      }
    }

    if($command == "retract"){
      $sql = "SELECT acc->'$.*' AS acc, type, escrow, payee FROM contracts c, escrow e WHERE c.id = $cid AND completed = 0 AND markComplete = 0 AND c.u_creator = '$username';";
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      $accepted = json_decode($row['acc'], true);
      unset($accepted[$id]);
      $accepted = array_values($accepted);
      $escrow = json_decode($row['escrow'], true);
      $temp = array();
      if($escrow['ESCROW'] == 1){
        foreach ($accepted as $acc => $a) {
          $temp[] = $a['handle'];
        }
        if($row['type'] == "O"){
          if(empty($temp)){
            $escrow['PAYOR'] = "TBD";
            $payor = "payor = '[".$escrow['PAYOR']."]'";
          }else{
            $escrow['PAYOR'] = join(", " ,$temp);
            $payor = "payor = '[".json_encode($escrow['PAYOR'])."]'";
          }
        }elseif($row['type'] == "R"){
          if(empty($temp)){
            $escrow['PAYEE'] = "TBD";
          }else{
            $escrow['PAYEE'] = join(", " ,$temp);
            $payee = "payee = '[".json_encode($escrow['PAYEE'])."]'";
          }
        }
        $escrow = json_encode($escrow);
        $accepted = json_encode($accepted,  JSON_FORCE_OBJECT);
        $sql = "UPDATE contracts SET acc = '$accepted', escrow = '$escrow' WHERE id = $cid AND u_creator = '$username'; UPDATE escrow SET $payee $payor WHERE id = $cid AND u_creator = '$username';";
        if($result = mysqli_multi_query($link, $sql)){
          echo "Success";
          //echo $sql;
          mysqli_close($link);
        }else{
          echo mysqli_error($link);
        }
      }else{
        $sql = "UPDATE contracts SET acc = '$accepted' WHERE id = $cid AND u_creator = '$username';";
        mysqli_query($link, $sql);
      }
    }
    if($command == "edit"){
      $sql = "SELECT apps->'$.*' AS apps, acc->'$.*' AS acc FROM contracts WHERE id = $cid AND completed = 0 AND u_creator = '$username'";
      $result = mysqli_query($link, $sql);
      $row = mysqli_fetch_assoc($result);
      if($row['apps'] != NULL || $row['acc'] != NULL){
        exit("Failed");
      }
      $sql = "UPDATE contracts SET  price = $price, unsecure = '$unsecure', secure = '$secure' WHERE id = $cid AND u_creator = '$username'";
      if($result = mysqli_query($link, $sql)){
        echo "Success";
      }
      mysqli_close($link);
    }

    if($command == "complete"){
      $sql = "SELECT acc->'$**.handle' as acc, apps->'$**.handle' as apps FROM contracts WHERE id = $cid AND u_creator = '$username'";
      if($result = mysqli_query($link, $sql)){
        $row = mysqli_fetch_assoc($result);
        $apps = json_decode($row['apps']);
        $acc = json_decode($row['acc']);
        $tempArray = array();
        foreach ($apps as $apps => $ap) {
          array_push($tempArray, "'".$ap."'");
        }
        foreach ($acc as $acc => $ac) {
          array_push($tempArray, "'".$ac."'");
        }
        $noti = join(', ', $tempArray);
        $sql = "UPDATE players SET noti = noti + 1 WHERE username IN ($noti);";
        if($result = mysqli_query($link, $sql)){
          $sql = "UPDATE contracts SET  apps = '{}', completed = 1, markComplete = 0 WHERE id = $cid AND u_creator = '$username'";
          if($result = mysqli_query($link, $sql)){
            echo "Success";
          }
        }
      }
      mysqli_close($link);
    }

    if($command == "markComplete"){
      $sql = "SELECT u_creator FROM contracts WHERE id = $cid AND JSON_SEARCH(acc, 'one', '$username')";
      if($result = mysqli_query($link, $sql)){
        $row = mysqli_fetch_assoc($result);
        $u_creator = json_decode($row['u_creator']);
        $sql = "UPDATE contracts SET markComplete = 1, completeDate = DATE_ADD(NOW(), INTERVAL 7 DAY), escrow = JSON_SET(escrow, '$.STATUS', '$username has requested to mark this contract complete. If you disagree you have 7 days to dispute this with your Servicer.') WHERE id = $cid AND u_creator = '".$row['u_creator']."'";
        var_dump($sql);
        if($result = mysqli_query($link, $sql)){
          var_dump($sql);
          $sql = "UPDATE players SET noti = noti + 1 WHERE username = '$u_creator';";
          if($result = mysqli_query($link, $sql)){
          }
        }
      }
      mysqli_close($link);
    }
  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
?>
