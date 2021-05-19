<?php
// Initialize the session
session_start();
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
    $username_err = "Your account is banned.";
    echo json_encode($username_err);
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
                            $sql = "SELECT JSON_EXTRACT(organization, '$**.sid') AS sid, JSON_EXTRACT(organization, '$**.rank') AS orgRank, verify, contracts, faction, daysleft, avatar, contractPref, banned, com_count, contractCD, reviewed_count FROM players WHERE username = '$param_username'; SELECT id FROM contracts WHERE u_creator = '$param_username' AND markComplete = 1;";
                            $result = mysqli_multi_query($link, $sql);
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
                            $_SESSION['vouchers'] = $row['reviewed_count'];
                            //$_SESSION['debug'] = $sql;
                            require_once "../src/jwt/generate_jwt.php";

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
                            }
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "Wrong Password.";
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "Username not Found.";
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
    $errors = array(
      'username' => $username_err,
      'password' => $password_err
    );
    echo json_encode($errors);
}
?>
