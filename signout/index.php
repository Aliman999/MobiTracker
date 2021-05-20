<?php
  session_start();
  var_dump($_SERVER['HTTP_REFERER']);
  $ref = explode("/", $_SERVER['HTTP_REFERER']);
  var_dump($ref);
  //unset($_SESSION);
  //session_destroy();
  //session_write_close();
  //header('Location: ../');
  //die;
?>
