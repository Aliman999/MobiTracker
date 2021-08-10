<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "../../../vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$headers = $_SERVER['HTTP_TOKEN'];

if(isset($headers)){
  if ($headers !== $_SESSION['token']){
    unset($_SESSION['token']);
    exit(json_encode(['error' => 'Wrong token.']));
  }else{
    if(!empty($_POST['email'])){
      $email = $_POST['email'];
      $string = json_encode(["username" => $_SESSION['username'], "email" => $email]);
      //Encrypt Email
      $cypher = "AES-128-CTR";
      $ivLen = openssl_cipher_iv_length($cypher);
      $options = 0;
      $ivInit = "-83cSneLj7OYcXJrIgG12Q";
      $encryptionKey = "Ke7CF6gytaMufbSL-cwEFA";
      $encryptEmail = openssl_encrypt($string, $cypher, $encryptionKey, $options, $ivInit);

      $encryptEmail = 
      $mail = new PHPMailer;
      try {
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'mail.privateemail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'admin@dustytavern.com';                 // SMTP username
        $mail->Password = 'Fallenlegion5';                           // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        $mail->From = 'admin@mobitracker.co';
        $mail->FromName = 'MobiTracker';
        $mail->addAddress($email, $_SESSION['username']);     // Add a recipient
        $mail->addReplyTo('admin@mobitracker.co', 'Information');

        $mail->WordWrap = 50;                                 // Set word wrap to 50 characters
        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'MobiTracker Verification';
        $mail->Body    = 'This email was sent to you for verification with MobiTracker. \n\nPlease click the link below to verify. \nhttps://mobitracker.co/email?token='.$string;

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
        ]);
      }
    }else{
      exit(json_encode(['error' => 'Invalid Args.']));
    }
  }
}else{
   exit(json_encode(['error' => 'No token.']));
}
