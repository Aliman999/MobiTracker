<?php
session_start();
define('include', TRUE);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$headers = $_SERVER['HTTP_TOKEN'];
if (isset($headers)) {
  if ($headers !== $_SESSION['token']) {
      exit(json_encode(['error' => 'Wrong CSRF token.']));
  }else{
    $privilage = $_SESSION['privilage'];

    if($privilage == "staff" || $privilage == "escrow"){

      require_once "config.php";
      $faction = $_SESSION['faction'];
      $echo = "";

      //Racing, Delivery, Security, Scouting, Medical, Charting Regular, Charting Luxury, Head Hunting, VIP Smuggling, Rating
      /*
      $r = $d = $s = $st = $md = $cr = $cl = $hh = $vip = $rt = $user = $setPage = $string = $secret = "";
      foreach ($_GET as $get => $g) {
        mysqli_real_escape_string($link, $g);
        $g = htmlentities($g, ENT_QUOTES, 'UTF-8');
      }
      if($pref['cType'] == 0){
        $pref['cType'] = " AND type = 'O'";
      }elseif($pref['cType'] == 1){
        $pref['cType'] = " AND type = 'R'";
      }else{
        $pref['cType'] = "";
      }
      $search = true;
      $showAll = false;
      if($pref['cOwn'] == 0){
        $pref['cOwn'] = "u_creator = '".$_SESSION['username']."'";
      }elseif($pref['cOwn'] == 1){
        $pref['cOwn'] = "u_creator = '".$_SESSION['username']."' OR";
        $showAll = true;
      }else{
        $pref['cOwn'] = "u_creator != '".$_SESSION['username']."' AND";
        $showAll = true;
      }
      //var_dump($pref);
      //$rt = $_GET['rt'];
      if(isset($_GET['page'])){
        if($_GET['page']>1){
          $setPage = $_GET['page'];
        }
      }else{
        $setPage = 1;
      }
      if(isset($_GET['perpage'])){
        $perPage = $_GET['perpage'];
      }else{
        $perPage = 16;
      }

      if($faction == 0){
        $selected = array($r, $d, $s, $st, $md, $cr, $cl, $rt);
      }elseif($faction == 1){
        $selected = array($r, $d, $s, $st, $md, $hh, $vip, $rt);
      }

      for($x = 0; $x<count($selected); $x++){
        $selected[$x] = intval($selected[$x]);
      }

      if($faction == 0){
        $types = array("Racing", "Delivery", "Security", "Scouting", "Medical", "Charting Regular", "Charting Luxury");
      }elseif($faction == 1){
        $types = array("Racing", "Delivery", "Security", "Head Hunting", "Scouting", "Medical", "VIP Smuggling");
      }
      if(!$showAll){
        $faction = "";
      }else{
        $faction = " AND t1.faction = ".$_SESSION['faction'];
      }

      for($x = 0; $x<count($selected)-1; $x++){
        if($selected[$x] == 1){
          $career[$x] = $types[$x];
          $search = false;
        }
      }

      if($user != ""){
        $user = "AND u_creator LIKE '%".$user."%'";
      }
      $showCareers = "";
      if($search && $showAll){
        for($x = 0; $x<count($selected)-1; $x++){
          $career[$x] = $types[$x];
        }
        $career = "'".join("', '", $career)."'";
        $showCareers = " t1.careertype IN (".$career.") ";
      }
      $echo = "";
      */
      $username = $_SESSION['username'];
      //$string = $pref['cOwn'].$showCareers.$pref['cType']." AND t1.archived = 0 ".$faction." AND t1.target != '".$_SESSION['username']."'".$user." ORDER BY t1.created_at DESC";
      //t1 = escrow, t2 = contracts
      $sql = "SELECT t1.id, t2.secure, t2.unsecure, t3.avatar, t1.cID, t1.u_creator, t2.completed, t1.careertype, active, paid, instructions, closeDate, dispute, payee, payor, amount, status, servicer, notes, t1.created_at FROM escrow t1, contracts t2, players t3 WHERE t2.id = t1.id AND t1.u_creator = t3.username;";
      if($result = mysqli_query($link, $sql)){

      }else{
        mysqli_error($link);
      }
      while($row = mysqli_fetch_assoc($result)){
        $escrow[] = $row;
      }
      $names = array();
      $pending = array();
      $inProgress = array();
      $completed = array();
      //$echo = var_dump($escrow);
      for($x = 0; $x < count($escrow); $x++){
        if($escrow[$x]["completed"] == 0 && $escrow[$x]["active"] == 0){
          array_push($pending, $escrow[$x]);
        }elseif ($escrow[$x]["completed"] == 0 && $escrow[$x]["active"] == 1 && $escrow[$x]["paid"] == 1) {
          array_push($inProgress, $escrow[$x]);
        }elseif ($escrow[$x]["completed"] == 1 && $escrow[$x]["active"] == 1 && $escrow[$x]["paid"] == 1) {
          array_push($completed, $escrow[$x]);
        }
      }
      /*
      $contracts = array();
      while($row = mysqli_fetch_assoc($result)){
        $contracts[] = $row;
      }
      $maxPages = ceil(count($contracts)/$perPage);

      if($setPage>1){
        if($setPage>$maxPages){
          $setPage = ($maxPages-1)*$perPage;
        }else{
          $setPage = ($setPage-1)*$perPage;
        }
        $page = $setPage;
      }else{
        $setPage = 0;
        $page = 1;
      }
      $emparray = array();
      $temp = array();
      for($x=$setPage; $x<count($contracts) && $x<($setPage+$perPage); $x++){
        if($contracts[$x]['u_creator'] != $username){
          $contracts[$x]['escrow'] = json_decode($contracts[$x]['escrow'], true);
          if($contracts[$x]['escrow']['ACTIVE']){
            if($contracts[$x]['escrow']['ESCROW'] == 1){
              $contracts[$x]['escrow'] = array("ESCROW"=>1, "EI"=>$contracts[$x]['escrow']['EI']);
            }elseif($contracts[$x]['escrow']['ESCROW'] == 0){
              $contracts[$x]['escrow'] = array("ESCROW"=>0);
            }
            $contracts[$x]['escrow'] = json_encode($contracts[$x]['escrow']);
          }else{
            unset($contracts[$x]);
          }
        }
      }
      $contracts = array_values($contracts);
      for($x=$setPage; $x<count($contracts) && $x<($setPage+$perPage); $x++){
        $applicantNames = array();
        if($contracts[$x]['apps'] != NULL){
          $applicants = json_decode($contracts[$x]['apps'], true);
          foreach ($applicants as $apps => $ap) {
            array_push($applicantNames, $ap['handle']);
          }
        }else{
          $applicants = array();
        }
        $acceptedNames = array();
        if($contracts[$x]['acc'] != NULL){
          $accepted = json_decode($contracts[$x]['acc'], true);
          foreach ($accepted as $acc => $ac) {
            array_push($acceptedNames, $ac['handle']);
          }
        }else{
          $accepted = array();
        }
        if($contracts[$x]['u_creator'] != $username){
          if(in_array($username, $acceptedNames)){
            $contracts[$x]['acc'] = $username;
            //var_dump($contracts[$x]['acc']);
          }else{
            unset($contracts[$x]['markComplete']);
            unset($contracts[$x]['secure']);
          }
          if(in_array($username, $applicantNames)){
            $contracts[$x]['apps'] = $username;
          }else{
            unset($contracts[$x]['apps']);
          }
          unset($contracts[$x]['mods']);
        }else{
          $contracts[$x]['apps'] = $applicants;
          $contracts[$x]['acc'] = $accepted;
        }
        array_push($temp, $contracts[$x]);
      }
      $emparray['data'] = $temp;
      $emparray['pages'] = $maxPages;
      $emparray['dump'] = $echo;
      //echo $sql;
      */
      $emparray['pending'] = $pending;
      $emparray['progress'] = $inProgress;
      $emparray['completed'] = $completed;
      $emparray['dump'] = $echo;
      echo json_encode($emparray);

    }else{
      exit();
    }
  }
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
