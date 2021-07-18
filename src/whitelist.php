<?php
if ($headers !== $_SESSION['token']) {
  unset($_SESSION['token']);
  exit(json_encode(['error' => 'Wrong token.']));
}else{
  $staff = ["JamesDusky", "Kindmiss", "Bo-Fone"];
}
?>
