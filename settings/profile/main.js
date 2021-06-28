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
    image:document.createElement("div"),
    handle:document.createElement("div"),
    badge:document.createElement("div"),
    meta:document.createElement("div"),
    orgs:document.createElement("div"),
    bio:document.createElement("div")
  }

  if(profile.image){
    const settingAvi = document.createElement("img");
    settingAvi.src = profile.image;
    settingAvi.className = "settingAvi";
    faded.image.appendChild(settingAvi);
  }

  const handleCont = document.createElement("p");
  const boldSpan = document.createElement("span");
  boldSpan.innerText = profile.handle;
  boldSpan.className = "rBold";
  const subP = document.createElement("span");
  subP.id = "displayName";
  subP.className = "subP";
  subP.innerText = "AKA "+profile.display;

  const idCont = document.createElement("p");
  const boldSpan = document.createElement("span");
  boldSpan.innerText = "Citizen ID:";
  boldSpan.className = "rBold";
  const subP = document.createElement("span");
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
