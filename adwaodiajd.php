<?php
if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Text to send if user hits Cancel button';
    exit;
} else {
    echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
    echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as your password.</p>";
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div style="display: flex; flex-direction: column; width:600px;">
      <p id="status">Connecting</p>
      <input type="text" name="" value="" id="input" placeholder="Input">
      <br>
      <p>Output:</p>
      <textarea id="output" rows="8" cols="80" placeholder="Output"></textarea>
      <p>Errors:</p>
      <textarea id="error" rows="8" cols="80" disabled></textarea>
    </div>
  </body>
  <script type="text/javascript" src="adwaodiajd.js"></script>
</html>
