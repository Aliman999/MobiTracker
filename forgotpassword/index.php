<?php
session_start();
define('include', TRUE);
// Include config file
require_once "../src/config.php";
if (empty($_SESSION['token'])) {
    header("location: https://mobitracker.co/login");
}
require_once "../vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Define variables and initialize with empty values
$param_username = $param_password = $email = "";
$username_err = $email_err = "";

// Processing form data when form is submitted
//if($_SERVER["REQUEST_METHOD"] == "POST"){//

    // Validate username
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter your username";
    } else{
        // Prepare a select statement
        $sql = "SELECT id, email FROM players WHERE (username = ? AND signup = 1)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);

            // Set parameters
            $param_username = trim($_POST["username"]);
            $row = mysqli_query($link, "SELECT id, username, password, email FROM players where username = '" . mysqli_real_escape_string($link, $param_username) . "'");

            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                /* store result */
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                  $username = $_POST['username'];
                }else{
                  $username_err = "This user isnt in our database";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

        }
    }
    if(empty(trim($_POST["email"]))){
      $email_err = "Please enter your email";
    }else{
      $password = mysqli_fetch_assoc($row);
      $vCode = $password['email'];
      if(password_verify($_POST["email"] , $vCode)){
        $email = $_POST["email"];
      }else{
        $email_err = "Email not found";
      }
    }


    // Close statement
    mysqli_stmt_close($stmt);

    // Close connection
    mysqli_close($link);

    // Check input errors before inserting in database
    if(empty($email_err) && empty($username_err)){

      $mail = new PHPMailer;
      try {
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'mail.privateemail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'admin@dustytavern.com';                 // SMTP username
        $mail->Password = 'Fallenlegion5';                           // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        $mail->From = 'admin@dustytavern.com';
        $mail->FromName = 'MobiTracker';
        $mail->addAddress($email, $username);     // Add a recipient
        $mail->addReplyTo('admin@dustytavern.com', 'Information');

        $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'Password Reset';
        $mail->Body    = '';

        $mail->send();
        $emailConfirm = 'Successfully sent to ' .$email;

        header( "refresh:3; url=../" );
      }catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
      }

    }
//  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password - MobiTracker </title>
    <link rel="stylesheet" href="https://mobitracker.co/bootstrap/css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://mobitracker.co/css/register.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Forgot Password - MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co/forgotpassword" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
<body>
    <div class="wrapper">
      <a href="../" class="exit"><img src="../src/exit.png" alt=""></a>
        <h2>Forgot</h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>RSI Handle</label><a href="../src/rsihandle.jpg" target="_blank" class="help"> Whats this?</a>
                <input autofocus type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>">
                <label>Email</label>
                <input type="email" name="email" class="form-control" value="<?php echo $email; ?>">
                <span class="help-block"><?php echo $email_err;?></span>
                <span class="confirm"><?php echo $emailConfirm; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Send Verification">
            </div>
            <p>Go back to <a href="../login" class="helplogin">Login</a></p>
        </form>
    </div>
    <script type="text/javascript" src="../js/events.js"></script>
</body>
</html>
