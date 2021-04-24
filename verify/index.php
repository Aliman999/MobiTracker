<?php
// Initialize the session
session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true && $_SESSION["verified"] === 0){
  require_once "../register/checkHandle.php";
  require_once "../src/config.php";
  $obj = json_decode(file_get_contents($requestURL.$_SESSION['username']), true);
  $p_verify = "Verifying your username assures others that you're the owner of the account and <img class='pre_verified' src='../src/verified.png'> will be displayed next to your name";
  $p_howTo = 'Enter " mt.co " in your <a href="https://robertsspaceindustries.com/citizens/'.$_SESSION['username'].'" class="helplogin" target="_blank">RSI Bio</a> <br>then click <span class="highlight">Verify</span>';
  $p_showVerified = '<img class="pre_verified" src="../src/verified.png" alt=""> '.$_SESSION['username'];
  $b_verify = '<input type="submit" class="btn btn-primary verify" value="Verify">';

  if($_SERVER["REQUEST_METHOD"] == "POST"){
    $bio = $obj['data']['profile']['bio'];
    $username = $obj['data']['profile']['handle'];
    if(stristr($bio, 'mt.co') !== false){
      $sql = "UPDATE players SET verify = 1 WHERE username = ?";
      if($stmt = mysqli_prepare($link, $sql)){

        mysqli_stmt_bind_param($stmt, "s", $param_username);
        $param_username = $username;

        if(mysqli_stmt_execute($stmt)){
          $verify_Confirm = "Successfully Verified <br> Redirecting...";
          header("refresh:2;url=../");
          $_SESSION["verified"] = 1;
          if(isset($_SESSION['com_count'])){
            unset($_SESSION['com_count']);
          }
        }else{
          $verify_err = 'Failed';
        }
      }
    }else{
      $verify_err = "Could not find Verification in Bio";
    }
  }
}else if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true && $_SESSION["verified"] === 1){
  $p_verify = "You've already verified your account";
}else{
  $p_verify = "You need to be signed in";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login - MobiTracker</title>
    <link rel="stylesheet" href="https://mobitracker.co/bootstrap/css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/register.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Verify - MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co/verify" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
</head>
<body>
    <div class="wrapper">
        <h2>Verify</h2>
        <p><?php echo $p_verify ?></p>
        <p><?php echo $p_howTo ?></p>
        <p><?php echo $p_showVerified ?></p>
        <a href="../" class="exit"><img src="../src/exit.png" alt=""></a>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
          <div class="form-group verify-group">
              <?php echo $b_verify ?>
              <span class="help-block v-Error"><?php echo $verify_err; ?></span>
              <span class="confirm"><?php echo $verify_Confirm; ?></span>
          </div>
        </form>
    </div>
    <script type="text/javascript" src="../js/events.js"></script>
</body>
</html>
