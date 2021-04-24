<?php
session_start();
if (isset($_SESSION['token'])) {
}else{
  exit(json_encode(['error' => 'No CSRF token.']));
}
?>
