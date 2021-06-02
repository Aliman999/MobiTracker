<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
require_once "services.php";
$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
      require_once "config.php";
      $u_creator = $_SESSION['username'];
      $u_cid = $_SESSION['cID'];
      $faction = $_SESSION['faction'];
      foreach ($_POST as $post => $p) {
        mysqli_real_escape_string($link, $p);
        $p = htmlentities($p, ENT_QUOTES, 'UTF-8');
      }
      $careertype = $_POST['careertype'];
      if(!in_array($careertype, $service)){
        exit();
      }
      $option = $_POST['option'];
      if($option == "Requesting"){
        $option = "R";
      }elseif ($option == "Offering"){
        $option = "O";
      }else{
        exit();
      }
      if($careertype == "Head Hunting"){
        if($option == "R"){
          $EI = "First come first serve";
        }else{
          $EI = "Payout per kill";
        }
      }else{
        $EI = "Payout per Hiree";
      }
      $price = $_POST['price'];
      if($price > 1000000){
        $price = 1000000;
      }
      if(!$price > 0){
        exit();
      }
      $target = $_POST['target'];
      if($target == $u_creator){
        exit();
      }
      $unsecure = addslashes($_POST['unsecure']);
      if(strlen($unsecure) > 500){
        exit();
      }
      $secure = addslashes($_POST['secure']);
      if(strlen($secure) > 100){
        exit();
      }
      $tempServicer = "MobiTracker";
      $_POST['escrow'] = intval($_POST['escrow']);
      if($option == "R"){
        $payee = "TBD";
        $payor = $u_creator;
        $ready = "Awaiting aUEC Confirmation from Escrow";
        $active = false;
      }elseif($option == "O"){
        $payee = $u_creator;
        $payor = "TBD";
        $ready = "Waiting for Transactions";
        $active = true;
      }
      if($_POST['escrow'] == 1){
        $escrow = array(
          "STATUS"=>$ready,
          "ACTIVE"=>$active,
          "SERVICER"=>"MobiTracker",
          "EI"=>$EI,
          "COE"=>"TBD",
          "PAYEE"=>$payee,
          "PAYOR"=>$payor,
          "ESCROW"=>$_POST['escrow']
        );
      }else{
        $EI = null;
        $escrow = array(
          "STATUS"=>"Opted out of Escrow",
          "ACTIVE"=>true,
          "SERVICER"=>"",
          "EI"=>"",
          "COE"=>"",
          "PAYEE"=>"",
          "PAYOR"=>"",
          "ESCROW"=>"0"
        );
      }
      if($active){
        $active = 1;
      }else{
        $active = 0;
      }
      $dispute = array(
        "INITIATOR"=>"",
        "PAYEE CLAIM" => "",
        "PAYEE EVIDENCE" => "",
        "PAYOR CLAIM" => "",
        "PAYOR EVIDENCE" => "",
        "STATUS" => ""
      );
      $dispute = json_encode($dispute);
      $payee = array($payee);
      $payee = json_encode($payee);
      $payor = array($payor);
      $payor = json_encode($payor);
      $escrow = json_encode($escrow);
      $cid = $_SESSION['cID'];
      // TODO: enable contract creation
      if($_SESSION['contractCD'] > time()){
        $sql = "INSERT INTO contracts ( cID, u_creator, careertype, escrow, price, target, faction, type, unsecure, secure, apps, acc, mods ) VALUES ( $cid, '$u_creator', '$careertype', '$escrow', '$price', '$target', '$faction', '$option', '$unsecure', '$secure', '{}', '{}', '{}' ); INSERT INTO escrow (  cID, u_creator, careertype, active, instructions, dispute, payee, payor, amount, status, servicer, notes ) VALUES ( $cid, '$u_creator', '$careertype', $active, '".$EI."', '$dispute', '$payee', '$payor', '$price', '$ready', '$tempServicer', '' ); UPDATE players SET contractCD = $contractCD WHERE username = '$u_creator' AND cid = $cid;";
        echo $sql;
        exit(json_encode(['error' => 'Too many contracts too fast!', 'cd' => $_SESSION['contractCD'], 'time' => time()]));
      }else{
        $_SESSION['contractCD'] = time()+(5*60); // 5 min cooldown from now.
        $contractCD = $_SESSION['contractCD'];
        $sql = "INSERT INTO contracts ( cID, u_creator, careertype, escrow, price, target, faction, type, unsecure, secure, apps, acc, mods ) VALUES ( $cid, '$u_creator', '$careertype', '$escrow', '$price', '$target', '$faction', '$option', '$unsecure', '$secure', '{}', '{}', '{}' ); INSERT INTO escrow (  cID, u_creator, careertype, active, instructions, dispute, payee, payor, amount, status, servicer, notes ) VALUES ( $cid, '$u_creator', '$careertype', $active, '".$EI."', '$dispute', '$payee', '$payor', '$price', '$ready', '$tempServicer', '' ); UPDATE players SET contractCD = $contractCD WHERE username = '$u_creator' AND cid = $cid;";
        echo $sql;
        mysqli_multi_query($link, $sql);
        echo mysqli_error($link);
      }
  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
?>
