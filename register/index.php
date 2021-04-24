<?php
session_start();
if (empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32));
}
// Include config file
require_once "../src/config.php";
require_once "checkHandle.php";

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Define variables and initialize with empty values
$username = $password = $email = $avatar = "";
$username_err = $password_err = $email_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter a username.";
    }else{
        // Prepare a select statement
        $sql = "SELECT id, username, signup FROM players WHERE (username = ? AND signup = 1)";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = trim($_POST["username"]);
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                  $username_err = "This handle has been taken";
                }else{
                  $obj = json_decode(file_get_contents($requestURL.$_POST['username']), true);
                  $res = $obj['data']['profile']['badge'];
                  $ptitles = array("Scout", "Mercenary", "Bounty Hunter", "Colonel", "Freelancer", "Rear Admiral", "Vice Admiral", "High Admiral", "Grand Admiral", "Lt. Commander", "Space Marshal", "Wing Commander", "Completionist", "Praetorian", "Legatus");
                  if($res == "Developer" || $res == "Administrator" || $res == "Moderator" || $res == "Staff" || $res == "Creator"){
                    $username_err = "You cannot use this Handle";
                    $username = "";
                  }
                  if(array_search($res, $ptitles)){
                    $avatar = $obj['data']['profile']['image'];
                    $username = $obj['data']['profile']['handle'];

                    $sql = "SELECT cID FROM players WHERE cID = ?";

                    if($stmt = mysqli_prepare($link, $sql)){
                      mysqli_stmt_bind_param($stmt, "s", $cID);
                      $cID = $obj['data']['profile']['id'];
                      $cID = substr($cID, 1);

                      if(mysqli_stmt_execute($stmt)){

                        mysqli_stmt_store_result($stmt);

                        if(mysqli_stmt_num_rows($stmt) == 1){
                          $sql = "SELECT players WHERE cID = $cID AND signup = 1;";
                          if($result = mysqli_query($link, $sql)){
                            $sql = "UPDATE players SET username = '$username' WHERE cID = $cID AND signup = 1;";
                            $result = mysqli_query($link, $sql);
                            $username_err = "You changed your username. <br>Login with your new username.";
                          }else{
                            $update = 1;
                          }
                        }else{
                          $sql = "SELECT id, username, signup FROM players WHERE (username = ? AND signup = 0)";
                          if(isset($username)){
                            if($stmt = mysqli_prepare($link, $sql)){

                              mysqli_stmt_bind_param($stmt, "s", $param_username);
                              $param_username = trim($_POST["username"]);

                              if(mysqli_stmt_execute($stmt)){
                                mysqli_stmt_store_result($stmt);
                                if(mysqli_stmt_num_rows($stmt) == 1){
                                  $update = 1;
                                }
                              }
                            }
                          }else{
                            $username_err = "This is not a RSI Handle";
                          }
                          $update = 0;
                        }
                      }
                    }
                  }else{
                    $username_err = "You need to display your <a class='helplogin backerTitle' href='https://starcitizen.tools/Titles#Backer_titles' target='_blank'>backer title</a> to sign up ";
                  }
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

    // Validate confirm password
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter an Email";
    }else{
      $sql = "SELECT email FROM players WHERE (email = ?)";
      if($stmt = mysqli_prepare($link, $sql)){
        mysqli_stmt_bind_param($stmt, "s", $param_email);
        $param_email = trim($_POST["email"]);

        if(mysqli_stmt_execute($stmt)){
          mysqli_stmt_store_result($stmt);
          if(mysqli_stmt_num_rows($stmt) == 1){
            $email_err = "This email has already been used";
          }else{
            $email = trim($_POST["email"]);
          }
        }
      }
    }

    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 0){
        // Prepare an insert statement
        $param_username = $username;
        $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
        $param_email = password_hash($email, PASSWORD_DEFAULT); // email hash
        $param_avatar = $avatar;
        $sql = "INSERT INTO players (cID, username, password, email, organization, avatar, signup) VALUES ($cID, '$param_username', '$param_password', '$param_email', '{}', '$param_avatar', 1);";
        if(mysqli_query($link, $sql)){
          header("location: ../login");
        }else{
          echo $sql;
        }
        // Close statement
        mysqli_stmt_close($stmt);
    }
    if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 1){
            // Prepare an insert statement
            $sql = "UPDATE players SET password = ?, email = ?, avatar = ?, signup = 1 WHERE username = ?";

            if($stmt = mysqli_prepare($link, $sql)){
                // Bind variables to the prepared statement as parameters
                mysqli_stmt_bind_param($stmt, "ssss",  $param_password, $param_email, $param_avatar, $param_username);

                // Set parameters
                $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
                $param_email = password_hash($email, PASSWORD_DEFAULT);
                $param_avatar = $avatar;
                $param_username = $username;

                // Attempt to execute the prepared statement
                if(mysqli_stmt_execute($stmt)){
                    // Redirect to login page
                    header("location: ../login");
                } else{
                    echo "Something went wrong. Please try again later. PT3";
                    echo "Prepare error: " . mysqli_error($stmt);
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
    <title>Sign Up - MobiTracker</title>
    <link rel="stylesheet" href="https://mobitracker.co/bootstrap/css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/register.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Register - MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co/register" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
</head>
<body>
    <div class="wrapper">
        <h2>Sign Up</h2>
        <span style="color: #FF5A5A; text-shadow: 0px 0px 5px #FF5A5A;"><p>Disclaimer: This website does not require or want your RSI login credentials, only your ingame name/RSI Handle <br>
          And please make sure your <a class='helplogin backerTitle' href='https://starcitizen.tools/Titles#Backer_titles' target='_blank'>backer title</a> is on display for verification</p></span>
        <a href="../" class="exit"><img src="../src/exit.png" alt=""></a>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>RSI Handle</label> <a href="../src/rsihandle.jpg" target="_blank" class="help"> What's this?</a>
                <input autofocus type="text" name="username" class="form-control" autocomplete="username" maxlength="50" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" autocomplete="new-password" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="email" name="email" class="form-control" value="<?php echo $email; ?>">
                <span class="help-block"><?php echo $email_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Sign up">
            </div>
            <p>Already have an account? <a href="../login/" class="helplogin">Login here</a></p>
        </form>
    </div>
    <script type="text/javascript" src="../js/events.js"></script>
</body>
</html>
