var profile = null;
var display = {
  setTimer:function(int){
    this.timer = int;
  },
  clear:function(){
    clearInterval(this.interval)
  },
  startTimer:function(...func){
    this.interval = setInterval(() => {
      func.forEach((item)=>{
        item();
      })
    }, this.timer);
  },
  interval:null,
  timer: 1000
}

function api(key) {
  if (!key) {
    throw new error("Key Required");
  } else {
    return send("job", key);
  }
}

var waitUser = setInterval(async () => {
  if (user) {
    clearInterval(waitUser);
    await socket().then(async (conn) => {
      if (conn) {
        profile = await api(apiToken.content);
      }
    })
  }
}, 1000);

display.startTimer(()=>{
  if(profile){
    profile = profile.data
    display.clear();
    init();
  }
});

var savedLoading = document.getElementById("loadingContainer");

async function verify(){
  profile = null;
  const container = document.getElementsByClassName("setting")[0];
  container.innerHTML = "";
  container.append(savedLoading);
  savedLoading.style.opacity = 1;
  profile = await api(apiToken.content);
  display.startTimer(async () => {
    if (profile) {
      display.clear();
      if (profile.data.profile.bio.includes("mt.co")) {
        user.verified = 1;
        var userContainer = document.getElementsByClassName("userContainer")[0];
        var verified = document.createElement("img");
        verified.className = "verified";
        verified.src = "https://mobitracker.co/src/verified.png";
        userContainer.insertBefore(verified, userContainer.childNodes[0]);

        query.open("GET", "https://mobitracker.co/src/verify.php");
        query.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        query.setRequestHeader(tokenHeader.name, tokenHeader.content);
        query.onload = null;
        query.send();
      }
      init();
    }
  })
}

function init(){
  var loading = document.getElementById("loadingContainer");
  loading.style.opacity = 0;
  loading.remove();
  var field = document.getElementsByClassName("setting")[0];
  var faded = {
    verify:document.createElement("div"),
    image:document.createElement("div"),
    handle:document.createElement("div"),
    badge:document.createElement("div"),
    meta:document.createElement("div"),
    orgs:document.createElement("div"),
    bio:document.createElement("div")
  }
  faded.verify.className = "faded";
  faded.image.className = "faded";
  faded.handle.className = "faded";
  faded.badge.className = "faded";
  faded.meta.className = "faded";
  faded.orgs.className = "faded";
  faded.bio.className = "faded divLeft";

  if(!user.verified){
    const verifyImg = document.createElement("img");
    verifyImg.src = "https://mobitracker.co/src/verified.png";
    verifyImg.className = "verified";
    const verifyBtn = document.createElement("a");
    verifyBtn.appendChild(verifyImg);
    verifyBtn.innerHTML += "Verify";
    verifyBtn.className = "rButton";
    verifyBtn.style.display = "flex";
    verifyBtn.style.alignItems = "center";

    dContainer = document.createElement("div");
    dContainer.className = "hidden dContainer";
    dContainer.style.display = "flex";
    dContainer.style.flexDirection = "column";
    dContainer.style.margin = "auto";
    dContainer.style.opacity = "0";
    dContainer.style.transition = ".25s ease-in-out";

    verifyDirections = document.createElement("p");
    verifyDirections.innerText = "Place the following into your RSI Bio and click Verify.";
    verifyDirections.style.margin = "auto";

    verifyText = document.createElement("input");

    verifyText.value = "mt.co";

    verifyText.onclick = function(){
      this.select();
    }

    verifyText.readOnly = true;

    dContainer.appendChild(verifyDirections);
    dContainer.appendChild(verifyText);

    verifyBtn.onclick = function(){
      if(dContainer.classList.contains("hidden")){
        dContainer.classList.remove("hidden");
        setTimeout(() => {
          dContainer.style.opacity = "1";
        }, 100);
      }else{
        verify();
      }
    }
    faded.verify.appendChild(verifyBtn);
    faded.verify.appendChild(dContainer);
    faded.verify.style.display = "block";
  }

  //Avatar
  const settingAvi = document.createElement("img");
  settingAvi.src = profile.profile.image;
  settingAvi.className = "settingAvi";
  faded.image.appendChild(settingAvi);

  //Handle
  const handleCont = document.createElement("p");
  var boldSpan = document.createElement("a");
  boldSpan.innerText = profile.profile.handle;
  boldSpan.className = "rBold panelLink";
  boldSpan.href = "https://robertsspaceindustries.com/citizens/"+profile.profile.handle;
  boldSpan.target = "_blank";
  var subP = document.createElement("span");
  subP.id = "displayName";
  subP.className = "subP";
  subP.innerText = "AKA "+profile.profile.display;

  handleCont.appendChild(boldSpan);
  handleCont.appendChild(document.createElement("br"));
  handleCont.appendChild(subP);

  faded.handle.appendChild(handleCont);

  //Badge
  const badgeCont = document.createElement("p");
  var badge = document.createElement("img");
  badge.src = profile.profile.badge_image;
  badge.className = "badgeImg";

  boldSpan = document.createElement("span");
  boldSpan.innerText = profile.profile.badge;
  boldSpan.className = "rBold";
  boldSpan.id = "Badge";

  faded.badge.appendChild(badge);
  faded.badge.appendChild(boldSpan);

  //Citizen ID
  const idCont = document.createElement("p");
  boldSpan = document.createElement("span");
  boldSpan.innerText = "Citizen ID:";
  boldSpan.className = "rBold";
  subP = document.createElement("span");
  subP.className = "subP";
  if(profile.profile.id === "n/a"){
    subP.innerText = "No Citizen ID";
  }else{
    subP.innerText = profile.profile.id;
  }

  idCont.appendChild(boldSpan);
  idCont.appendChild(document.createElement("br"));
  idCont.appendChild(subP);

  faded.meta.appendChild(idCont);

  //Enlisted
  const enlistCont = document.createElement("p");
  boldSpan = document.createElement("span");
  boldSpan.innerText = "Enlisted:";
  boldSpan.className = "rBold";
  subP = document.createElement("span");
  subP.className = "subP";

  var d = new Date(profile.profile.enlisted);
  subP.innerText = d.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  enlistCont.appendChild(boldSpan);
  enlistCont.appendChild(document.createElement("br"));
  enlistCont.appendChild(subP);

  faded.meta.appendChild(enlistCont);

  //Languages
  if(profile.profile.fluency){
    if(profile.profile.fluency.length > 0){
      const langCont = document.createElement("p");
      boldSpan = document.createElement("span");
      boldSpan.innerText = "Languages:";
      boldSpan.className = "rBold";
      subP = document.createElement("span");
      subP.className = "subP";
      subP.innerText = profile.profile.fluency.join(", ");


      langCont.appendChild(boldSpan);
      langCont.appendChild(document.createElement("br"));
      langCont.appendChild(subP);

      faded.meta.appendChild(langCont);
    }
  }

  //Location
  if(profile.profile.location){
    const locCont = document.createElement("p");
    boldSpan = document.createElement("span");
    boldSpan.innerText = "Location:";
    boldSpan.className = "rBold";
    subP = document.createElement("span");
    subP.className = "subP";
    subP.innerText = profile.profile.location.region+", "+profile.profile.location.country;

    locCont.appendChild(boldSpan);
    locCont.appendChild(document.createElement("br"));
    locCont.appendChild(subP);

    faded.meta.appendChild(locCont);
  }

  //Orgs
  if(profile.orgLength > 0){
    var orgCont;
    var orgImg;
  }
  for(var x = 0; x < profile.orgLength; x++){
    orgDiv = document.createElement("div");
    orgDiv.className = "rFlex";

    orgCont = document.createElement("p");

    orgImg = document.createElement("img")
    orgImg.className = "orgLogo";
    if(x == 0){
      orgImg.src = profile.organization.image;
    }else{
      orgImg.src = profile.affiliation[x-1].image;
    }
    boldSpan = document.createElement("a");
    boldSpan.className = "rBold panelLink";
    boldSpan.target = "_blank";
    if(x == 0){
      boldSpan.innerText = profile.organization.name;
      boldSpan.href = "https://robertsspaceindustries.com/orgs/" + profile.organization.sid;
    }else{
      boldSpan.innerText = profile.affiliation[x - 1].name;
      boldSpan.href = "https://robertsspaceindustries.com/orgs/" + profile.affiliation[x - 1].sid;
    }
    subP = document.createElement("span");
    subP.className = "subP";
    if(x == 0){
      subP.innerText = profile.organization.rank + " [" + profile.organization.stars + "]";
    }else{
      subP.innerText = profile.affiliation[x - 1].rank + " [" + profile.affiliation[x - 1].stars + "]";
    }

    orgCont.appendChild(boldSpan);
    orgCont.appendChild(document.createElement("br"));
    orgCont.appendChild(subP);

    orgDiv.appendChild(orgImg);
    orgDiv.appendChild(orgCont);
    faded.orgs.appendChild(orgDiv);
  }


  //Bio
  const bioCont = document.createElement("p");
  boldSpan = document.createElement("span");
  boldSpan.innerText = "Bio:";
  boldSpan.className = "rBold";
  subP = document.createElement("span");
  subP.className = "subP";
  if(profile.profile.bio){
    subP.innerText = profile.profile.bio;
  }else{
    subP.innerText = "Nothing Here";
  }

  bioCont.appendChild(boldSpan);
  bioCont.appendChild(document.createElement("br"));
  bioCont.appendChild(subP);

  faded.bio.appendChild(bioCont);
  
  field.appendChild(faded.image);
  field.appendChild(faded.handle);
  field.appendChild(faded.badge);
  field.appendChild(faded.meta);
  field.appendChild(faded.orgs);
  field.appendChild(faded.bio);
  if (!user.verify) {
    field.appendChild(faded.verify);
  }

  faded = document.getElementsByClassName("faded");

  var x = 0;
  var display = setInterval(()=>{
    faded[x].style.opacity = 1;
    if(x == faded.length-1){
      clearInterval(display);
    }else{
      x++;
    }
  }, 250);
}
