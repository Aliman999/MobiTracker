var drops = document.getElementsByClassName("collapseB");
for(var i = 0; i < drops.length; i++){
  drops[i].onclick = function(){
    toggle(this);
  };
}

var url = window.location.href;

if(url.indexOf("#") > 0){
  var index = url.indexOf("#");
  var string = url.substring(index+1, url.length);
  console.log(string);
}else{

}

function toggle(e){
  for(var i = 0; i < drops.length; i++){
    if(e.nextElementSibling.classList.contains("hidden") && e != drops[i]){
      drops[i].nextElementSibling.classList.add("hidden");
      drops[i].children[1].innerText = "▲";
    }
  }
  if(e.nextElementSibling.classList.contains("hidden")){
    e.nextElementSibling.classList.remove("hidden");
    e.children[1].innerText = "▼";
  }else{
    e.nextElementSibling.classList.add("hidden");
    e.children[1].innerText = "▲";
  }
};
