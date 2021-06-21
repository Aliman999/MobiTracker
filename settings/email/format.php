<head>
  <style>
    body{
      margin: 0 auto;
      background-color: #151f26;
      padding-bottom: 32px;
      color: #C4D7E6;
      font-family: "Exo", sans-serif;
      font-weight: 300;
      text-align: center;
      outline: 0;
    }
    a, a:visited, a:active, a:link{
      color: #C4D7E6;
      text-decoration: none;
      outline: 0;
    }
    a:hover{
      color: #fff;
    }
    .container{
      position: relative;
      display: inline-block;
      width: auto;
      margin: auto;
      top: 128px;
      background-color: #253139;
      padding: 40px 25px;
      border: 2px solid rgb(57, 206, 216);
      box-shadow: 0px 0px 15px rgba(57, 206, 216, 0.5);
      border-radius: 4px;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Verification Code</h1>
    <p><?php echo "test"; ?></p>
    <br><br>
    <p>This is an automated email to verify your email. If it wasnt you please ignore this.<br><br>If it persists please reply and message Aliman#5518 on discord<br><br>Copy and paste this code at the link provided: <a href="https://mobitracker.co/auth/email?token=<?php echo $_SESSION['jwt'] ?>" style="font-weight: bold;">Verify Email</a></p>
  </div>
</body>
