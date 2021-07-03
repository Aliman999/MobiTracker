<?php
session_start();

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.'.$headers]));
  }else{
    require_once "config.php";
    $c = $e = $x = $m = $p = $t = $career = $order =  "";
    foreach ($_GET as $get => $g) {
      mysqli_real_escape_string($link, $g);
      $g = htmlentities($g, ENT_QUOTES, 'UTF-8');
    }
    $c = $_GET['c'];
    $e = $_GET['e'];
    $x = $_GET['x'];
    $m = $_GET['m'];
    $p = $_GET['p'];
    $t = $_GET['t'];

    if(isset($_GET['page'])){
      if($_GET['page']>1){
        $setPage = htmlentities($_GET['page'], ENT_QUOTES, 'UTF-8');
      }
    }else{
      $setPage = 1;
    }
    if(isset($_GET['perpage'])){
      $perPage = htmlentities($_GET['perpage'], ENT_QUOTES, 'UTF-8');
    }else{
      $perPage = 24;
    }

    //ini_set('display_errors', 1);
    //ini_set('display_startup_errors', 1);
    //error_reporting(E_ALL);
    $count = array($c, $e, $x, $m, $p, $t);

    if(!$link ) {
       die('Could not connect: ' . mysqli_error());
    }

    $types = array("crew", "escort", "explorer", "miner", "pirate", "trader");
    $career = array();
    $order = array();

    for($xx = 0; $xx<count($count); $xx++){
      if($count[$xx] == 1){
        $career[$xx] = $types[$xx]." = 1";
      }
      $order[$xx] = $types[$xx]." DESC";
    }
    if(count($career) > 0){
      $career = join(" OR ", $career);
      $career = 'AND ('.$career.')';
    }else{
      $career = "";
    }
    $order = join(", ", $order);
    $sql = "SELECT username, avatar, verify, avgRating, reviewed_count, crew, escort, explorer, miner, pirate, trader FROM players WHERE (signup = 1) $career ORDER BY verify DESC, reviewed_count DESC, $order;";

    $result = mysqli_query($link, $sql);
    $searchResult = array();

    while($row = mysqli_fetch_assoc($result)){
      $searchResult[] = $row;
    }

    $maxPages = ceil(count($searchResult)/$perPage);

    //Calculates the amount of pages that are generated and can be changed when the file receives _GET['perPage']
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

    for($x=$setPage; $x<count($searchResult) && $x<($setPage+$perPage); $x++){
      $emparray[$x] = $searchResult[$x];
    }
    $emparray = array_values($emparray);
    $emparray["pages"] = $maxPages;
    //$emparray["sql"] = $sql;

    mysqli_close($link);
    echo json_encode($emparray);
    //echo $sql;
  }
}else{
  exit();
}
?>
