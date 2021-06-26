<?php
session_start();
?>
<head>
  <style>
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="mtHeader">
        <img src="https://mobitracker.co/android-chrome-512x512.png" alt="">
        <a class="mtTitle" href="https://mobitracker.co">MOBITRACKER</a>
      </div>
      <h1>Email Verification</h1>
    </div>
    <a href="https://mobitracker.co/auth/email?token=<?php echo $_GET['token'] ?>" class="lButton highlight">Verify Email</a>
    <br><br>
    <p>This is an automated email to verify your email. If it wasnt you please ignore this.<br><br>If it persists please join our discord for help. <a href="https://discord.com/invite/xT4YfcxmrA" class="rButton">Discord</a></p>
  </div>
</body>
