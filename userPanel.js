
//console.log(currentUser);
function userPanelInit(){
    console.log(globalcurrentUser);
    if(globalcurrentUser!=null){
    var content="<div class='form-group'><div class='input' id='user'>    Bejelentkezve: <br>" +globalcurrentUser +" </div><a class='sidebar-btn' id='profilba' href='profil.html'>Belépés a profilba</a><a onclick='logout()' class='sidebar-btn' id='kilép' href='csabi.html'>Kilépés a profilból</a></div>"
    document.getElementById("sidebar").innerHTML = content;
    

    
    }else{
        var content="<div class='input' id='user'><br>Nem vagy </div>"
    }
}

function logout(){
    globalcurrentUser=null;
    setGlobalUsernull();
    console.log(globalcurrentUser);
}
function profilLoad(){
    console.log(localStorage.getItem('UserGlobal'));
    document.getElementById("head").innerHTML="Bejelentkezve: "+localStorage.getItem('UserGlobal');
    callElozmenyek(localStorage.getItem('UserGlobal'));
}

function callElozmenyek(user_variable) {
    console.log("elozmenyek hivása"+user_variable);
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("POST", "elozmenyek.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var content="<table id='history' class='table table-dark table-striped'><tr><td>pont1</td>            <td>pont2</td><td>email</td></tr>"
            content=content+this.responseText.replace(/"/g,'');
            content=content+"</table>"
            content=content.replace(/\\/g,'');
            document.getElementById("result").innerHTML = content;
        }
    
    }
    
    xhttp.send("email="+user_variable);
}

function toMap(id){
    console.log(id);
}