<head>
  <style>
    body{
      margin: 0 auto;
      background-color: #151f26;
      color: #C4D7E6;
      font-family: "Exo", sans-serif;
      font-weight: 300;
      text-align: center;
      outline: 0;
      display: flex;
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
    a:hover{
      color: #fff;
    }
    .container{
      display: flex;
      width: auto;
      margin: auto;
      background-color: #253139;
      padding: 8px 16px;
      border: 2px solid rgb(57, 206, 216);
      box-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);
      border-radius: 4px;
      word-wrap: break-word;
      flex-direction: column;
    }
    .rButton {
      border-radius: 4px;
      display: flex;
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
    .rButton:hover{
      box-shadow: 0px 0px 11px 0px #1f2b2f;
    }
    .highlight {
      color: #C4D7E6;
    }
    .header>img{
      height: 64px;
      width: 64px;
      margin-right: auto;
    }
    h1{
      margin: auto auto auto 4px;
    }
    .header{
      margin: 0 0 64px 0;
      display: flex;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://mobitracker.co/android-chrome-512x512.png" alt="">
      <p>MOBITRACKER</p>
      <h1>Email Verification</h1>
    </div>
    <a href="https://mobitracker.co/auth/email?token=<?php echo $_SESSION['jwt'] ?>" class="rButton highlight">Verify Email</a>
    <br><br>
    <p>This is an automated email to verify your email. If it wasnt you please ignore this.<br><br>If it persists please reply and message Aliman#5518 on discord.</p>
  </div>
</body>
