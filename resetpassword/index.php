<?php
session_start();
define('include', TRUE);
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
// Include config file
require_once "../src/config.php";

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Define variables and initialize with empty values
$email = $param_email = $email_err = "";
$verification = $param_verification = $verification_err = $verification_check = $verification_holder = "";
$password = $param_password = $password_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){


    // Validate username
    if(empty(trim($_POST["verification"]))){
        $verification_err = "Enter your verification code";
    } else{
        // Prepare a select statement
        $sql = "SELECT id, password, email FROM players WHERE (password = ?)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_verification);

            // Set parameters
            $param_verification = trim($_POST["verification"]);

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
                  $verification = trim($_POST["verification"]);
                }else{
                  $verification_err = "This code isnt recognized";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    }
    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Check input errors before inserting in database
    if(empty($verification_err) && empty($password_err)){
      $sql = "UPDATE players SET password = ? WHERE password = ?";

      if($stmt = mysqli_prepare($link, $sql)){
        mysqli_stmt_bind_param($stmt, "ss",$param_password,$param_verification);

        $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

        if(mysqli_stmt_execute($stmt)){
            // Redirect to login page
            header("location: ../login");
        } else{
            echo "Something went wrong. Please try again later.";
            echo "Prepare error: " . mysqli_error($stmt);
        }
        // Close statement
        mysqli_stmt_close($stmt);
      }
      // Close connection
      mysqli_close($link);
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Password - MobiTracker</title>
    <link rel="stylesheet" href="https://mobitracker.co/bootstrap/css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/register.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
</head>
<body>
    <div class="wrapper">
      <a href="../" class="exit"><img src="../src/exit.png" alt=""></a>
        <h2>Reset</h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($verification_err)) ? 'has-error' : ''; ?>">
                <label>Enter your Verfication Code</label>
                <input autofocus type="text" name="verification" class="form-control" value="<?php echo $verification; ?>">
                <span class="help-block"><?php echo $verification_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Enter your new Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Reset Password">
            </div>
        </form>
    </div>
    <script type="text/javascript" src="../js/events.js"></script>
</body>
</html>
