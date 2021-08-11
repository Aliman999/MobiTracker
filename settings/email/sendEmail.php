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
      declare(strict_types=1);
      /**
       * Encrypt a message
       * 
       * @param string $message - message to encrypt
       * @param string $key - encryption key
       * @return string
       * @throws RangeException
       */
      function safeEncrypt(string $message, string $key): string
      {
          if (mb_strlen($key, '8bit') !== SODIUM_CRYPTO_SECRETBOX_KEYBYTES) {
              throw new RangeException('Key is not the correct size (must be 32 bytes).');
          }
          $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
          
          $cipher = base64_encode(
              $nonce.
              sodium_crypto_secretbox(
                  $message,
                  $nonce,
                  $key
              )
          );
          sodium_memzero($message);
          sodium_memzero($key);
          return $cipher;
      }
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format";
        exit(json_encode([
          'status' => 0,
          'data' => $emailErr
        ]));
      }else{
        $email = $_POST["email"];
      }
      $key = "Ke7CF6gytaMufbSL-cwEFA";
      $encryptEmail = safeEncrypt(json_encode(["username" => $_SESSION['username'], "email" => $email]), $key);

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
        $mail->Body    = '<p>This email was sent to you for verification with MobiTracker. <br>Please click the link below to verify. <br><br>https://mobitracker.co/email?token='.$encryptEmail.'</p>';

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
