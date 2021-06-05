<?php
// Initialize the session
session_start();
if (empty($_SESSION['token'])) {
  $_SESSION['token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>MobiTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/patreon.css">
    <link rel="stylesheet" href="../css/nav.css">
    <link rel="stylesheet" href="locale.css">
    <link rel="apple-touch-icon" sizes="180x180" href="https://mobitracker.co/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://mobitracker.co/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://mobitracker.co/favicon-16x16.png">
    <link rel="manifest" href="https://mobitracker.co/site.webmanifest">
    <link rel="mask-icon" href="https://mobitracker.co/safari-pinned-tab.svg" color="#5bbad5">
    <meta property="og:type" content="website">
    <meta property="og:title" content="MobiTracker.co" />
    <meta property="og:description" content="Find who to trust when you need a hand to lead your armed escort or who to avoid letting on your ship" />
    <meta property="og:url" content="https://mobitracker.co" />
    <meta property="og:image" content="https://mobitracker.co/android-chrome-512x512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#253139">
    <?php
    echo "<meta name='token' content=".$_SESSION['token'].">";
    ?>
    <?php
    if($_SESSION["loggedin"]){
      echo "<meta name='jwt' content=".$_SESSION['jwt'].">";
    }
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-177343701-1"></script>
    <script type="text/javascript" src="../js/ga.js"></script>
  </head>
  <body>
    <?php include "../gtemps/nav.php"; ?>
    <div id="canvas">
      <div class="headerContainer">
        <div id="login_status" class="login_menu">
          <a><img id="mtLogo" src="../android-chrome-512x512.png" class="mtLogo"></a>
          <a id="mtTitle" class="mtTitle">MOBITRACKER</a>
          <?php
          if(!isset($_SESSION["loggedin"])){
            echo "<a id='lmLBtn' class='verify_btn lmBtn'>Login</a>";
            echo "<a id='lmSBtn' class='verify_btn'>Sign Up</a>";
          }
          if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
            echo "<div class='userContainer'><img class='verified' src='../src/verified.png'><p class='loginName'>".$_SESSION['username']."</p></div>";
          }
          ?>
          <div id="navBtnContainer" class="navBtnContainer">
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
            <div class="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "loggedIn";}else{echo "loggedOut";} ?>"></div>
          </div>
        </div>
      </div>

      <div class="titleContainer">
        <p class="webTitle">Frequently Asked Questions</p>
        <p id="general" class="webSlogan">Learn your way around StarCitizen's player Reputation Hub.</p>
      </div>
      <div class="container container-header" id="ratings">
        <header class="playercard">
          <div class="drop" id="faqGeneral">
            <div class="collapseB">
              <a class="header highlight pointer" href="#general">General FAQ</a>
              <a class="collapse pointer" href="#general">▼</a>
            </div>
            <div>
              <p class="playerbio"><span class="highlight">Q: What's the point?</span><br><br>A: MobiTracker isn't designed to help you find new handles. Its purpose is to help verify that the people you're embarking on an adventure with or forming/joining an organization with are trustworthy and don't have malicious intent. It can also be used to make a judgment on who is better suited for a task, because there are only so many seats in a ship, make sure you're filling them with the right people.</p>
              <p class="playerbio"><span class="highlight">Q: Do you store our information?</span><br><br>A: No. The information isn't viewable by any of the websites team. The only information that is viewable by the team is the RSI Handle and the reviews. (This is your public displayed ingame name) While the website does encrypt the email and password you use to login to mobiTracker, this doesn't need to be the same information as your RSI login credentials and we encourage users to use different information. The email you provide us is only stored for password retrieval purposes and is not used in any capacity.</p>
              <p class="playerbio"><span class="highlight">Q: Why do I need to give you my email?</span><br><br>A: Again, this email address is only for password retrieval purposes. Because you can only create one account linked to your RSI Handle you won't be able to use mobiTracker if you lose the login information associated with it. Thus we found it was necessary to find a way for people to find/retrieve their passwords.</p>
              <p class="playerbio"><span class="highlight">Q: How do you prevent RSI Developers or high profile RSI Handles from being stolen?</span><br><br>A: Developer RSI handles have a unique identifier built-in. This means that our website can prevent those accounts from being created. Nobody will be able to create an account using a developer's RSI handle. (  Sorry CIG :(  ) For other accounts, if you believe that someone has stolen your account or is using a high profile handle that isn't the rightful owner, just contact us at admin@mobiTracker.co and we will have a mobiTracker moderator send them a message on the RSI website to confirm they are the rightful owner. Until we get a response, that account will be locked from being used. Any reviews written by fake profiles will be removed.</p>
              <p class="playerbio"><span class="highlight">Q: What happens if someone changes their RSI Handle?</span><br><br>A: Fortunately we've developed a way for mobitracker to identify users who have changed their name when they are searched. All previous reviews and ownership of reviews of the previous handle is transferred to the new handle automatically.</p>
            </div>
          </div>
        </header>
      </div>
      <div class="container container-header" id="contracts">
        <header class="playercard">
          <div class="drop" id="faqRatings">
            <div class="collapseB">
              <a class="header highlight pointer" href="#ratings">Ratings FAQ</a>
              <a class="collapse pointer" href="#ratings">▲</a>
            </div>
            <div class="hidden">
              <p class="playerbio"><span class="highlight">Q: How do you prevent abuse?</span><br><br>A: All of the reviews are carefully moderated, they must adhere to a guideline that has a zero-tolerance policy for racism, sexism, and harassment. They also must be of a real ingame event. We also have systems in place that will flag spam or otherwise questionable reviews.</p>
              <p class="playerbio"><span class="highlight">Q: Why can unverified accounts only leave 3 reviews?</span><br><br>A: Verification helps us identify the rightful owners of the account, it also helps prevent spam or fake reviews.</p>
              <p class="playerbio"><span class="highlight">Q: What type of reviews can I leave?</span><br><br>A: Only reviews that pertain to real ingame interactions are permitted on mobiTracker, even if your review is pertaining to a real ingame incident it cannot include sexism, racism, or other forms of bigotry.</p>
              <p class="playerbio"><span class="highlight">Q: What can I do if someone leaves an inappropriate review?</span><br><br>A: If you find a review that breaks our posting guidelines, please use the report button to bring it to a moderator's attention.</p>
            </div>
          </div>
        </header>
      </div>
      <div class="container container-header" id="escrow">
        <header class="playercard">
          <div class="drop" id="faqContracts">
            <div class="collapseB">
              <a class="header highlight pointer" href="#contracts">Contracts FAQ</a>
              <a class="collapse pointer" href="#contracts">▲</a>
            </div>
            <div class="hidden">
              <p class="playerbio"><span class="highlight">Q: How do I get access to Mobitracker Contracts?</span><br><br>A: You must have a verified account on Mobitracker to use Contracts. We want to ensure all contracts are legitmate and the creator is the rightful owner.</p>
              <p class="playerbio"><span class="highlight">Q: Why do I have to choose between legal and illegal contracts?</span><br><br>A: In an effort to stop poaching we lock your choice of contract type for 14 days. After two weeks you will be able to change your contract type. You can do this every 2 weeks as much as you like.</p>
              <p class="playerbio"><span class="highlight">Q: Do I need to use your escrow system?</span><br><br>A: No, the escrow system is an optional free service offered by MobiTracker as an extra layer of protection and is completely optional. However if you're not using the escrow service Mobitracker is not responsible for any payment issues during a contract. Please vet the people you’re hiring or being hired by carefully.</p>
              <p class="playerbio"><span class="highlight">Q: My employee marked a contract completed but they haven't done it yet. What do I do?</span><br><br>A: If a contract is marked completed when it hasn't been marked completed we send the employer an automated message that the contract has been marked completed. You have 7 days to respond to this message. If you respond that the contract has not been completed a staff member will step in and request proof from both parties. Please be prepared to provide proof when completing a contract. If the employer does not respond to the automated message within 7 days the contract is automatically marked completed. If an employer marks a contract completed the system will flag the contract completed and the employee does not need to mark the contract completed. We encourage you to use our rating systems after your contracts to help others in making informed decisions in who to hire or be hired by. :)</p>
              <p class="playerbio"><span class="highlight">Q: What do I do if I paid the escrow already but I want to cancel my contract?</span><br><br>A: Mobitracker allows you to cancel a contract and receive a full refund from the escrow service as long as you have not already hired someone to complete that contract. If you have hired somebody and still wish to cancel the contract the escrow system will pay the employee 25% of the original payment. If you wish to cancel a job that had already been completed. This is not possible and the escrow system will pay all employees for completed work. Please allow at least 24 hours to process cancellation requests and refunds.</p>
              <p class="playerbio"><span class="highlight">Q: How long does the escrow system take?</span><br><br>A: Unfortunately the escrow system can take a little bit longer then a unsecured contract however it does provide an additional layer of protection. We do our best to update the escrow as quickly as possible and we guarantee your contract will be posted within 24 hours of submission however most contracts are posted much faster than that typically within 6-8 hours.</p>
              <p class="playerbio"><span class="highlight">Q: Can I post a free contract?</span><br><br>A: Yes, contracts that do not have any monetary transaction are of the participants discretion only mobitracker will not mediate disputes on free contracts.</p>
            </div>
          </div>
        </header>
      </div>
      <div class="container container-header" id="bot">
        <header class="playercard">
          <div class="drop" id="faqEscrow">
            <div class="collapseB">
              <a class="header highlight pointer" href="#escrow">Escrow FAQ</a>
              <a class="collapse pointer" href="#escrow">▲</a>
            </div>
            <div class="hidden">
              <p class="playerbio"><span class="highlight">Q: What is an Escrow and why would I want to use it?</span><br><br>A: Escrow is a third party (in this case Mobitracker itself) that helps facilitate fair trading by holding funds until a job is finished. This means the “buyer” prepays for the services but the seller does not receive the payment until goods/services have been completed. It can also act as a mediator if in dispute over the level/quantity/speed of a service is in question by either or both parties.</br></br>Because Escrow is safer for both parties Mobitracker strongly suggests you use it. For buyer and seller safety, contracts using Escrow will clearly be labeled as such, and will be more prominently displayed.</br></br>Note: MOBITRACKER IS NOT RESPONSIBLE FOR ISSUES WITH JOBS THAT DID NOT USE OUR ESCROW SYSTEM. Without our Escrow, responsibility of payment falls solely on the buyer and delivery on the seller. We will help with technical issues only at that point.</p>
              <p class="playerbio"><span class="highlight">Q: How does Escrow work?</span><br><br>A: When creating a contract it will prompt you if you’d like to select your contract as escrow or not. When you select the Escrow option instructions on how to send your payment to the escrow account are given. Please send the proper and full amount (Amount of Job +12%) to the escrow account the website will tell you to. Your job will only be available to be viewed by applicants once payment is received. This can take from 12-24 hours, or as little as one hour depending on the time of day.</p>
              <p class="playerbio"><span class="highlight">Q: Is there a fee for using the Escrow System?</span><br><br>A: Yes, a flat 5% fee per contract is required, this should be included in the original payment you send to the Escrow account.</p>
              <p class="playerbio"><span class="highlight">Q: What If I want to cancel my job? Or nobody responds?</span><br><br>A: In the case that you want to cancel your job, simply contact support at Admin@mobitracker.co and they will send your payment back to you (minus the 5%). If nobody responds to your job with-in a month, you may “Bump it back to the top” for free, or have a refund of the full amount (Minus the in-game transfer fee of .5%).</p>
              <p class="playerbio"><span class="highlight">Q: What happens during an Escrow Contract?</span><br><br>A: Once the contractor has hired an applicant, they will be asked to navigate back to their contracts and confirm completion (Only mark complete jobs as completed, if you mark them early then we can not help in the case of non-completion) this will prompt the Escrow to pay the applicant ASAP and the contract will be closed. (We encourage both parties to leave reviews afterwards). </br></br>The applicant also has an option to mark the job completed, however this will take seven days as the contractor can dispute in cases of a contract being marked as a false completion. If your applicant marks a job complete you will get a notification. Please either confirm completion so the contract can be closed, or contact support at Admin@mobitracker.co  to open mediation if the contract is not complete.</p>
              <p class="playerbio"><span class="highlight">Q: What happens if the applicant never completes my job?</span><br><br>A: If you are using an escrow contract and the hired applicant fails to complete your job, you will be able to rehire someone else for free. You will not need to pay another fee.</p>
              <p class="playerbio"><span class="highlight">Q: Is there a way to keep a contract permanently open?</span><br><br>A: Unfortunately because both the employee and the employer needs to confirm the contract is completed, every time you wish to hire or re-hire you will need to make a new contract.</p>
            </div>
          </div>
        </header>
      </div>
      <div class="container container-header">
        <header class="playercard">
          <div class="drop" id="faqDiscordbot">
            <div class="collapseB">
              <a class="header highlight pointer" href="#bot">Discord Bot FAQ</a>
              <a class="collapse pointer" href="#bot">▲</a>
            </div>
            <div class="hidden">
              <p class="playerbio"><span class="highlight">Q: How do I add the discord bot to my server?</span><br><br>A: The only way to add the bot to your server is to click the link on the top of the website and then follow those instructions.</p>
              <p class="playerbio"><span class="highlight">Q: What does the discord bot do?</span><br><br>A: Allows users to search players, see their rating and organization information as well as search legal contracts. Illegal contracts are not searchable through the discord bot.</p>
              <p class="playerbio"><span class="highlight">Q: I have a problem with the discord bot. Who do I contact?</span><br><br>A: You can contact us at <a href="mailto: admin@mobitracker.co" class="email">admin@mobitracker.co</a></p>
            </div>
          </div>
        </header>
      </div>
    </div>
    <?php include "../gtemps/footer.php"; ?>
  <script type="text/javascript" src="../js/socket.js"></script>
  <script type="text/javascript" src="<?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){echo "../js/nav.js";}else{echo "../js/nSession.js";} ?>" async></script>
  <script type="text/javascript" src="main.js"></script>
  </body>
</html>
