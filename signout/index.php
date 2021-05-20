<?php
  session_start();
  $ref = basename($_SERVER['HTTP_REFERER']);
  //unset($_SESSION);
  //session_destroy();
  //session_write_close();
  //header('Location: ../'.$ref);
  //die;
?>
