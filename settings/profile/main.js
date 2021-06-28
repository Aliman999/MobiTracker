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
  faded.bio.className = "faded";

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
  const badge = document.createElement("img");
  badge.src = profile.badge_image;
  badge.className = "badgeImg";

  boldSpan = document.createElement("span");
  boldSpan.innerText = profile.profile.badge;
  boldSpan.className = "rBold";
  boldSpan.id = "Badge";

  faded.handle.appendChild(badge);
  faded.handle.appendChild(boldSpan);

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

  //Orgs
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

  var x = 0;
  var display = setInterval(()=>{
    faded[x]
    //faded[x].style.opacity = 1;
    if(x == faded.length-1){
      clearInterval(display);
    }else{
      x++;
    }
  }, 250);
}
