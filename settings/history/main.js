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

function history(obj = { type: 'user', datatype: 'username', input: "" }) {
  if (!obj.type) {
    obj.type = "user";
  }
  if (!obj.datatype) {
    obj.datatype = "username";
  }
  if (!obj.input) {
    throw new error("Input Required");
  } else {
    return send("history", obj);
  }
}

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

  for(var x = 0; x < result.data.length; x++){
    console.log(result.data[x]);
  }




  faded = document.getElementsByClassName("faded");

  /*
  var x = 0;
  var display = setInterval(()=>{
    faded[x].style.opacity = 1;
    if(x == faded.length-1){
      clearInterval(display);
    }else{
      x++;
    }
  }, 250);
  */
}
