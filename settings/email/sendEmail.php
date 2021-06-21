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
    require_once "../../../vendor/autoload.php";
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    if(!empty($_POST['email'])){
      $email = $_POST['email'];
      sendMail($email);
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
          $mail->addAddress($email, $_SESSION['username']);     // Add a recipient
          $mail->addReplyTo('admin@dustytavern.com', 'Information');

          $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
          //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
          //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
          $mail->isHTML(true);                                  // Set email format to HTML

          $mail->Subject = 'MobiTracker Verification';
          $mail->Body    = file_get_contents('format.php');

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
    }else{
      exit(json_encode(['error' => 'Invalid Args.']));
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
