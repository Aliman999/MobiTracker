<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    require_once "../vendor/autoload.php";
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendMail($email){
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
        $mail->Body    = '<head><style>body{margin: 0 auto;background-color: #151f26;padding-bottom: 32px;color: #C4D7E6;font-family: "Exo", sans-serif;font-weight: 300;text-align: center;outline: 0;}a, a:visited, a:active, a:link{color: #C4D7E6;text-decoration: none;outline: 0;}a:hover{color: #fff;}.container{position: relative;display: inline-block;width: auto;margin: auto;top: 128px;background-color: #253139;padding: 40px 25px;border: 2px solid rgb(57, 206, 216);box-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);border-radius: 4px;word-wrap: break-word;}</style></head><body><div class="container"><h1>Verification Code</h1><p>'.$password['password'].'</p> <br><br><p>Someone requested to reset your password. If it wasnt you please ignore this. <br><br> If it persists please reply and message Aliman#5518 on discord<br><br>Copy and paste this code at the link provided: <a href="https://mobitracker.co/resetpassword/" style="font-weight: bold;">Reset Password</a></p></div></body>';

        $mail->send();
        $emailConfirm = 'Successfully sent to ' .$email;
        echo json_encode([
          "status" => 1,
          "data" => $emailConfirm
        ]);
      }catch (Exception $e) {
        echo json_encode([
          "status" => 0,
          "data" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
        ])
      }
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
