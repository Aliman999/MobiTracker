<?php
// Initialize the session
session_start();
define('include', TRUE);
header("location: ../");
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
$headers = $_SESSION['token'];
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  if($_SESSION['banned'] == 0){
    header("location: ../");
    exit;
  }else{
    $username_err = "Your account is banned.";
  }
}

// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
$len = 0;
if(!isset($_GET['ref'])){
  $_GET['ref'] = "login";
}
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Include config file
    include "../src/config.php";

    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }

    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT cID, username, password FROM players WHERE username = ?";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = $username;

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);

                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $cID, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            $sql = "SELECT JSON_EXTRACT(organization, '$**.sid') AS sid, JSON_EXTRACT(organization, '$**.rank') AS orgRank, verify, contracts, faction, daysleft, contractPref, banned, com_count, contractCD FROM players WHERE username = '$param_username'";
                            $result = mysqli_query($link, $sql);
                            $row = mysqli_fetch_assoc($result);
                            if($row['verify'] == 1){
                              $_SESSION["verified"] = 1;
                            }else {
                              $_SESSION["verified"] = 0;
                            }
                            if($row['contracts'] == 1){
                              $c = $row['contracts'];
                              $f = $row['faction'];
                              $dl = $row['daysleft'];
                              $pref = $row['contractPref'];
                            }
                            if($row['banned'] == 1){
                              $b = 1;
                              $username_err = "Your account is banned.";
                              session_start();
                              unset($_SESSION);
                              session_destroy();
                              session_write_close();
                            }else{
                              $b = 0;
                            }
                            if(!$row['contractCD']){
                              $contractCD = time();
                            }else{
                              $contractCD = $row['contractCD'];
                            }
                            require_once "../src/whitelist.php";

                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["cID"] = $cID;
                            $_SESSION["log"] = 1;
                            $_SESSION["username"] = $username;
                            $_SESSION['banned'] = $b;
                            $_SESSION['contract'] = $c;
                            $_SESSION['contractCD'] = $contractCD;
                            $_SESSION['faction'] = $f;
                            $_SESSION['daysleft'] = $dl;
                            $_SESSION['cPref'] = json_decode($pref, true);
                            require_once "../src/jwt/generate_jwt.php";
                            //unset($_SESSION['search']);

                            if($_SESSION['verified'] == 0){
                              $_SESSION['com_count'] = $row['com_count'];
                            }
                            unset($_SESSION['token']);

                            if (empty($_SESSION['token'])) {
                              $_SESSION['token'] = bin2hex(random_bytes(32));
                            }

                            if(strpos($staff, $_SESSION['username']) !== false){
                              $_SESSION['privilage'] = "staff";
                            }
                            $orgs = json_decode($row['sid'], true);
                            $ranks = json_decode($row['orgRank'], true);
                            $x=0;
                            foreach ($orgs as $org => $o) {
                              $_SESSION["org"][$x] = [
                                  "sid"=>$orgs[$x],
                                  "rank"=>$ranks[$x]
                                ];
                              $x++;
                            }
                            //var_dump($_SESSION);
                            // Redirect user to welcome page
                            if($_SESSION['banned'] == 0){
                              if($_GET['ref'] == "escrow"){
                                $_GET['ref'] = "contracts/escrow";
                              }
                              header("location: ../".$_GET['ref']);
                            }
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "No account found with that username.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }

    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login - MobiTracker</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/register.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo ucfirst($_GET['ref']); ?> - MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co/login" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
</head>
<body>
    <div class="wrapper">
        <h2>Login</h2>
        <a href="../" class="exit"><img src="../src/exit.png" alt=""></a>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"])."?ref=".$_GET['ref']; ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>RSI Handle</label><a href="../src/rsihandle.jpg" target="_blank" class="help"> Whats this?</a>
                <input autofocus type="text" name="username" class="form-control" value="<?php echo $username; ?>" autocomplete="username" maxlength="50">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" autocomplete="current-password">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Login">
            </div>
            <p>Forgot Password? <a href="../forgotpassword/" class="helplogin">Click Here</a></p>
            <p>Don't have an account? <a href="../register/" class="helplogin">Sign up now</a></p>
        </form>
    </div>
    <script type="text/javascript" src="../js/events.js"></script>
</body>
</html>
