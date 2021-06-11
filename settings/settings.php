<?php
session_start();

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    if($_POST['setting'] == 'email'){

    }elseif($_POST['setting'] == 'password'){

    }elseif($_POST['setting'] == 'discord'){

    }elseif($_POST['setting'] == 'privacy'){

    }elseif($_POST['setting'] == 'displayName'){

    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
