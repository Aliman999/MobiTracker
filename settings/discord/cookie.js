var username = document.getElementsByName("username")[0];
var id = document.getElementsByName("id")[0];
document.cookie = "username="+username.content+";";
document.cookie = "cid=" + id.content + ";";