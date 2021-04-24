<div class="wrapper" style="width: 350px;">
  <h2>Login</h2>
  <p>Add our <a href="https://discord.com/api/oauth2/authorize?client_id=751252617451143219&permissions=67135488&scope=bot">Discord bot</a> to your server!</p>
  <p>You can link your Discord with MobiTracker to receive realtime alerts! <a href="https://mobitracker.co/register" class="highlight-yellow">Sign Up</a> or Login Below</p>
  <a href="../" class="exit"><img src="../src/exit.png"></a>
  <form action="../login/index.php?ref=discord" method="post">
      <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
          <label>RSI Handle</label><a href="../src/rsihandle.jpg" target="_blank" class="help"> Whats this?</a>
          <input autofocus type="text" name="username" class="form-control" value="<?php echo $username; ?>" autocomplete="username" maxlength="50">
          <span class="help-block"><?php echo $username_err; ?></span>
      </div>
      <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
          <label>Password</label>
          <input type="password" name="password" class="form-control" autocomplete="current-password">
          <span class="help-block"><?php echo $password_err; ?></span>
      </div>
      <div class="form-group">
          <input type="submit" class="btn btn-primary" value="Login">
      </div>
      <p>Forgot Password? <a href="../forgotpassword/" class="helplogin">Click Here</a></p>
      <p>Don't have an account? <a href="../register/" class="helplogin">Sign up now</a></p>
  </form>
  <script type="text/javascript" src="../js/events.js"></script>
</div>
