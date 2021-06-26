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
    body{
      margin: 0 auto;
      background-color: #151f26;
      color: #C4D7E6;
    }
    a, a:visited, a:active, a:link{
      color: #C4D7E6;
      text-decoration: none;
      outline: 0;
    }
    a, a:link, a:hover, a:visited, a:active {
      text-decoration: none;
      outline: 0;
      cursor: pointer;
      justify-content: center;
      align-items: center;
    }
    .container{
      position: relative;
      top: 128px;
      margin: auto;
      width: 600px;
      background-color: #253139;
      padding: 8px 16px;
      border: 2px solid rgb(57, 206, 216);
      box-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);
      border-radius: 4px;
      word-wrap: break-word;
      flex-direction: column;
    }
    .lButton {
      border-radius: 4px;
      background-color: #243139;
      white-space: nowrap;
      box-shadow: 0px 0px 11px 0px #0c1214;
      transition: 0.1s ease-in-out;
      margin: auto;
      background-color: #151f26;
      height: 40px;
      width: 210px;
      padding: 10px 25px;
      font-size: 24px;
      color: #C4D7E6;
      border-radius: 4px;
      white-space: nowrap;
    }
    .lButton:hover{
      box-shadow: 0px 0px 11px 0px #1f2b2f;
      text-shadow: 0px 0px 5px #c4d7e6;
    }
    .rButton {
      border-radius: 4px;
      background-color: #243139;
      white-space: nowrap;
      box-shadow: 0px 0px 11px 0px #0c1214;
      transition: 0.1s ease-in-out;
      margin: auto;
      background-color: #151f26;
      padding: 4px 8px;
      font-size: 18px;
      color: #C4D7E6;
      border-radius: 4px;
      white-space: nowrap;
    }
    .rButton:hover{
      box-shadow: 0px 0px 11px 0px #1f2b2f;
      text-shadow: 0px 0px 5px #c4d7e6;
    }
    .highlight {
      color: #C4D7E6;
    }
    .mtHeader>img{
      height: 64px;
      width: 64px;
    }
    .mtTitle{
      color: #C4D7E6;
      font-size: 27px;
      padding: 8px;
      margin: auto;
    }
    .mtTitle:hover{
      text-shadow: 0px 0px 5px #c4d7e6;
    }
    .mtHeader{
      margin-right: auto;
    }
    h1{
      margin: auto 0 auto auto;
    }
    .header{
      margin: 0 0 64px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="mtHeader">

        <a class="mtTitle" href="https://mobitracker.co"><img src="https://mobitracker.co/android-chrome-512x512.png" alt="">MOBITRACKER</a>
      </div>
      <h1>Email Verification</h1>
    </div>
    <a href="https://mobitracker.co/auth/email?token=<?php echo $_GET['token'] ?>" class="lButton highlight">Verify Email</a>
    <br><br>
    <p>This is an automated email to verify your email. If it wasnt you please ignore this.<br><br>If it persists please join our discord for help. <a href="https://discord.com/invite/xT4YfcxmrA" class="rButton">Discord</a></p>
  </div>
</body>
