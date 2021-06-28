var display = setInterval(()=>{
  if(profile){
    init();
    clearInterval(display);
  }
}, 1000);

function init(){
  var loading = document.getElementById("loadingContainer");
  loading.style.opacity = 0;
  loading.remove();
  var field = document.getElementsByClassName("setting")[0];
  var faded = {
    image:document.createElement("div").className = "faded",
    handle:document.createElement("div").className = "faded",
    badge:document.createElement("div").className = "faded",
    meta:document.createElement("div").className = "faded",
    orgs:document.createElement("div").className = "faded",
    bio:document.createElement("div").className = "faded"
  }

  //Avitar
  const settingAvi = document.createElement("img");
  settingAvi.src = profile.image;
  settingAvi.className = "settingAvi";
  faded.image.appendChild(settingAvi);

  //Handle
  const handleCont = document.createElement("p");
  var boldSpan = document.createElement("span");
  boldSpan.innerText = profile.handle;
  boldSpan.className = "rBold";
  var subP = document.createElement("span");
  subP.id = "displayName";
  subP.className = "subP";
  subP.innerText = "AKA "+profile.display;

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
  boldSpan.innerText = profile.badge;
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
  if(profile.id === "n/a"){
    subP.innerText = "No Citizen ID";
  }else{
    subP.innerText = profile.id;
  }

  idCont.appendChild(boldSpan);
  idCont.appendChild(document.createElement("br"));
  idCont.appendChild(subP);

  faded.meta.appendChild(idCont);

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
