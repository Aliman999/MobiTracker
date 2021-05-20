<?php
  session_start();
  $ref = dirname($_SERVER['HTTP_REFERER']);
  var_dump($ref);
  //unset($_SESSION);
  //session_destroy();
  //session_write_close();
  //header('Location: ../');
  //die;
?>
