<?php
  session_start();
  if(basename($_SERVER['HTTP_REFERER'] != "beta")){
    $ref = basename($_SERVER['HTTP_REFERER']);
  }
  var_dump($ref);
  //unset($_SESSION);
  //session_destroy();
  //session_write_close();
  //header('Location: ../'.$ref);
  //die;
?>
