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

var result = null;
var waitUser = setInterval(async () => {
  if (user) {
    clearInterval(waitUser);
    await socket().then(async (conn)=>{
      if(conn){
        result = await history({ input: user.sessionUser });
      }
    })
  }
}, 1000);

display.startTimer(() => {
  if (result) {
    console.log(result);
    display.clear();
    init();
  }
});

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
