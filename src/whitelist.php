<?php
if ($headers !== $_SESSION['token']) {
  exit(json_encode(['error' => 'Wrong token.']));
}else{
  $staff = "JamesDusky Kindmiss sMattGuy";
}
?>
