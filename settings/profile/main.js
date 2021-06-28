var display = setInterval(()=>{
  if(profile){
    clearInterval(display);
    init();
  }
}, 1000);

function init(){
  var loading = document.getElementById("loadingContainer");
  loading.style.opacity = 0;
  loading.remove();
  var field = document.getElementsByClassName("setting")[0];
  var faded = {
    image:document.createElement("div"),
    handle:document.createElement("div"),
    badge:document.createElement("div"),
    meta:document.createElement("div"),
    orgs:document.createElement("div"),
    bio:document.createElement("div")
  }
  faded.image.className = "faded";
  faded.handle.className = "faded";
  faded.badge.className = "faded";
  faded.meta.className = "faded";
  faded.orgs.className = "faded";
  faded.bio.className = "faded divLeft";

  //Avatar
  const settingAvi = document.createElement("img");
  settingAvi.src = profile.profile.image;
  settingAvi.className = "settingAvi";
  faded.image.appendChild(settingAvi);

  //Handle
  const handleCont = document.createElement("p");
  var boldSpan = document.createElement("span");
  boldSpan.innerText = profile.profile.handle;
  boldSpan.className = "rBold";
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
  if(profile.profile.fluency.length > 0){
    const langCont = document.createElement("p");
    boldSpan = document.createElement("span");
    boldSpan.innerText = "Languages:";
    boldSpan.className = "rBold";
    subP = document.createElement("span");
    subP.className = "subP";
    subP.innerText = profile.profile.fluency.join(", ");


    enlistCont.appendChild(boldSpan);
    enlistCont.appendChild(document.createElement("br"));
    enlistCont.appendChild(subP);

    faded.meta.appendChild(enlistCont);
  }

  //Location
  if(profile.profile.location){
    const locCont = document.createElement("p");
    boldSpan = document.createElement("span");
    boldSpan.innerText = "Location:";
    boldSpan.className = "rBold";
    subP = document.createElement("span");
    subP.className = "subP";
    subP.innerText = profile.profile.region+", "+profile.profile.country;

    enlistCont.appendChild(boldSpan);
    enlistCont.appendChild(document.createElement("br"));
    enlistCont.appendChild(subP);

    faded.meta.appendChild(enlistCont);
  }

  //Orgs
  if(profile.orgLength > 0){
    var orgCont;
    var orgImg;
  }
  for(var x = 0; x < profile.orgLength; x++){
    orgCont = document.createElement("div");
    orgCont.className = "rFlex";

    orgImg = document.createElement("img")
    if(x == 0){
      orgImg.src = profile.organization.image;
    }else{
      orgImg.src = profile.affiliation[x-1].image;
    }
    boldSpan = document.createElement("span");
    if(x == 0){
      boldSpan.innerText = profile.organization.name;
    }else{
      boldSpan.innerText = profile.affiliation[x-1].name;
    }
    boldSpan.className = "rBold";
    subP = document.createElement("span");
    subP.className = "subP";
    if(x == 0){
      subP.innerText = profile.organization.rank;
    }else{
      subP.innerText = profile.affiliation[x-1].rank;
    }

    orgCont.appendChild(orgImg);
    orgCont.appendChild(boldSpan);
    orgCont.appendChild(document.createElement("br"));
    orgCont.appendChild(subP);
  }

  faded.orgs.appendChild(orgCont);

  //Bio
  const bioCont = document.createElement("p");
  boldSpan = document.createElement("span");
  boldSpan.innerText = "Bio:";
  boldSpan.className = "rBold";
  subP = document.createElement("span");
  subP.className = "subP";
  if(profile.profile.bio){
    subP.className = profile.profile.bio;
  }else{
    subP.className = "Nothing Here";
  }

  enlistCont.appendChild(boldSpan);
  enlistCont.appendChild(document.createElement("br"));
  enlistCont.appendChild(subP);

  faded.bio.appendChild(enlistCont);

  field.appendChild(faded.image);
  field.appendChild(faded.handle);
  field.appendChild(faded.badge);
  field.appendChild(faded.meta);
  field.appendChild(faded.orgs);
  field.appendChild(faded.bio);

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
