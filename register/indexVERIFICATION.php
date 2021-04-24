<?php
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
    } else{
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
                  $username_err = "This handle already exists";
                }else{
                  $obj = json_decode(file_get_contents($requestURL.$_POST['username']), true);
                  $bio = $obj['data']['profile']['bio'];
                  $avatar = $obj['data']['profile']['image'];
                  if(stristr($bio, 'mobitracker.co') !== false){
                    $username = $obj['data']['profile']['handle'];
                    $sql = "SELECT id, username, signup FROM players WHERE (username = ? AND signup = 0)";
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
                    $username_err = "Could not find Verification in Bio";
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
        $sql = "INSERT INTO players (username, password, email, avatar, signup) VALUES (?, ?, ?, ?, 1)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssss", $param_username, $param_password, $param_email, $param_avatar);

            // Set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
            $param_email = $email;
            $param_avatar = $avatar;

            // Attempt to execute the prepared statement
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
    }
    if(empty($username_err) && empty($password_err) && empty($email_err) && $update == 1){
            // Prepare an insert statement
            $sql = "UPDATE players SET password = ?, email = ?, avatar = ?, signup = 1 WHERE username = ?";

            if($stmt = mysqli_prepare($link, $sql)){
                // Bind variables to the prepared statement as parameters
                mysqli_stmt_bind_param($stmt, "ssss",  $param_password, $param_email, $param_avatar, $param_username);

                // Set parameters
                $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
                $param_email = $email;
                $param_avatar = $avatar;
                $param_username = $username;

                // Attempt to execute the prepared statement
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
        }

    // Close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
    <link rel="stylesheet" href="../css/register.css">
</head>
<body>
    <div class="wrapper">
        <h2>Sign Up</h2>
        <a href="../" class="exit"><img src="../src/exit.png" alt=""></a>
        <p>Before signing up you must add <br> <span style="color: #f0e7b3; text-shadow: 0px 0px 5px #f0e7b3;">" mobitracker.co "</span> to your RSI profile's Bio otherwise your account cannot be verified</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>RSI Handle</label> <a href="../src/rsihandle.jpg" target="_blank" class="help"> What's this?</a>
                <input type="text" name="username" class="form-control" oninput="hasValue(this)" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" oninput="hasValue(this)" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="email" name="email" class="form-control" oninput="hasValue(this)" value="<?php echo $email; ?>">
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
