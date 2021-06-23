<?php require_once "../src/sessionverify.php"; ?>
<div class='container container-header'>
  <header class='playercard showoverflow'>
    <div class='ptitle'>
      <p>Disclaimer</p>
    </div>
    <p class='disclaimer home'>Mobitracker Contracts is a work in progress and will continue to polish and add new features.</p>
    <p class='disclaimer home'>Mobitracker.co is not responsible for the transfer of aUEC within Starcitizen's Persistant Universe.</p>
    <p class='disclaimer home'>Currently MobiTracker [MOBI] is operating as the escrow system and are in the search for a trustworthy replacement.</p>
    <p class='disclaimer home'>To have your contract use MobiTracker's escrow system please check the Opt-In for Escrow box.</p>
    <p class='disclaimer home'>Mobitracker tries it's best in maintaining a secure way to display sensitive contracts.
      Please do your due diligence and leave out compromising information on public contracts.
    <span class='highlight-green'>Please Vet applicants thoroughly by clicking on their username.</span></p>
    <p class='disclaimer home'>You will be locked to this choice for 30 days.
    <br>Selecting the Lawful or Unlawful role will bar you from seeing contracts of the opposite faction.</p>
    <p class='disclaimer home'>Current Balance of Contracts</p>
    <div class="displayFlex">
      <p class="disclaimer home statusPercent"></p><div class="statusContainer displayFlex"><div class="status"></div><div class="status"></div></div><p class="disclaimer home statusPercent"></p>
    </div>
    <p class="disclaimer home statusTotal"></p>
    <p class="disclaimer home" id="error"></p>
    <div class='contractFormFaction'>
      <p>Faction: </p>
      <div class='custom-select' style='width: 175px;'>
        <select class='userInput' name='faction'>
          <option value=''>Select Faction</option>
          <option class='factionOption lawful' value='lawful'>Lawful</option>
          <option class='factionOption unlawful' value='unlawful'>Unlawful</option>
        </select>
      </div>
    </div>
    <div class='disclaimer choice'>
      <a id='agree' class='rButton rDisabled space'>Agree</a>
      <a id='disagree' class='rButton highlight-red space'>Disagree</a>
    </div>
  </header>
</div>
<script src="disc.js" type="text/javascript"></script>
