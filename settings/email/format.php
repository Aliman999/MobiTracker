<?php
session_start();
?>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    html {
      color: #C4D7E6;
      font-family: 'Exo', sans-serif;
      font-weight: 400;
      text-align: center;
      outline: 0;
      height: 100%;
    }
  </style>
</head>
<body style="margin: 0 auto; background-color: #151f26; color: #C4D7E6;">
  <div style="position: relative; top: 128px; margin: auto; width: 600px; background-color: #253139; padding: 8px 16px; border: 2px solid rgb(57, 206, 216); box-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5); border-radius: 4px; word-wrap: break-word; flex-direction: column;">
    <div style="margin: 0 0 64px 0;">
      <div style="margin-right: auto;">
        <table style="margin: auto;">
          <tbody>
            <td>
              <img style="height: 64px;width: 64px;" src="https://mobitracker.co/android-chrome-512x512.png" alt="">
            </td>
            <td>
              <a style="color: #C4D7E6; font-size: 27px; padding: 8px; margin: auto;" href="https://mobitracker.co">MOBITRACKER</a>
            </td>
          </tbody>
        </table>
        <h1 style="margin: auto 0 auto auto; padding: 20px 0;">Email Verification</h1>
      </div>
    </div>
    <a href="https://mobitracker.co/auth/email?token=<?php echo $_GET['token'] ?>" class="lButton" style="text-decoration: none; outline: 0; cursor: pointer; justify-content: center; align-items: center; border-radius: 4px; background-color: #243139; white-space: nowrap; box-shadow: 0px 0px 11px 0px #0c1214; transition: 0.1s ease-in-out; margin: auto; background-color: #151f26; height: 40px; width: 210px; padding: 10px 25px; font-size: 24px; color: #C4D7E6; border-radius: 4px; white-space: nowrap; color: #C4D7E6;">Verify Email</a>
    <br><br>
    <p>This is an automated email to verify your email. If it wasnt you please ignore this.<br><br>If it persists please join our discord for help. <a href="https://discord.com/invite/xT4YfcxmrA" style="border-radius: 4px; background-color: #243139; white-space: nowrap; box-shadow: 0px 0px 11px 0px #0c1214; transition: 0.1s ease-in-out; margin: auto; background-color: #151f26; padding: 4px 8px; font-size: 18px; color: #C4D7E6; border-radius: 4px; white-space: nowrap;">Discord</a></p>
  </div>
</body>
