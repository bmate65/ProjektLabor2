let map2;
var elevator;
//console.log(currentUser);
function userPanelInit(){
    globalcurrentUser=getGlobalUser();
    console.log(globalcurrentUser);
    if(globalcurrentUser!="null"){
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
            //console.log(this.responseText);
            var content="<table id='history' class='table table-dark table-striped'><tr><td>Marker 1 magasság:</td>            <td>Marker 1 szélesség:</td> <td>Marker 2 magasság:</td> <td>Marker 2 szélesség:</td><td></td><td></td></tr>"
            content=content+this.responseText.replace(/"/g,'');
            content=content+"</table>"
            content=content.replace(/\\/g,'');
            document.getElementById("result").innerHTML = content;
        }
    
    }
    
    xhttp.send("email="+user_variable);
}

function toMap(id,elevator,map){
    //window.location.href = "csabi.html";
    console.log(id);

    var lat1;
    var long1;
    var lat2;
    var long2;


    var xhttp = new XMLHttpRequest();
    
    xhttp.open("POST", "insertHistory.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var responseObject = JSON.parse(this.responseText);
            
            lat1=responseObject.pont1;
            long1=responseObject.pont1_2;
            lat2=responseObject.pont2;
            long2=responseObject.pont2_2;
            
            console.log(lat1);
            console.log(long1);
            console.log(lat2);
            console.log(long2);

            var path = [{ lat: lat1, lng: long1 }, { lat: lat2, lng: long2 }];
            //console.log(path);
            var location1 = new google.maps.LatLng(lat1,long1);
            var location2 = new google.maps.LatLng(lat2,long2);
            //initMap();
            //logElevation(path, elevator, map);
            console.log("Map load")
            initMapelozmeny();
            var line2 = null;
            var marker1 = null;
            var marker2 = null;
            marker1= new google.maps.Marker({
                position: location1,
                map: map2
              });
              marker2= new google.maps.Marker({
                position: location2,
                map: map2
              });
              
              if(line2){
                line2.setMap(null);
            }
                console.log(path);
             line2 = new google.maps.Polyline({
                path: [marker1.getPosition(), marker2.getPosition()],
                geodesic: true,
                strokeColor: '#000000',  // Fekete szín
                strokeOpacity: 0.5,      // Átlátszóság (0-tól 1-ig terjedő érték)
                strokeWeight: 3          // Vonal vastagsága
              });
            
              line2.setMap(map2);
              if (google.maps.ElevationService) {
                elevator = new google.maps.ElevationService();
            } else {
                console.error('Az ElevationService nem támogatott ezen a verziószámon.');
            }
            var logpath=[marker1.getPosition(),marker2.getPosition()]
            //logElevation(logpath,elevator,map2)
        }
    
    }
    
    //location.reload();
    
    xhttp.send("ID="+id);

    
}


function deleteFromHistoryByID(ID){
    //console.log("elozmenyek hivása"+user_variable);
    console.log(ID);
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("POST", "deleteFromHistoryByID.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    
    }
    location.reload();
    xhttp.send("ID="+ID);
    
    
}
    


function saveMap(lat1, lang1, lat2, lang2, email){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "saveMap.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var result = xhr.responseText;
    console.log(lat1);
    console.log(lang1);
    console.log(lat2);
    console.log(lang2);
    console.log(email);
    //var eredmeny=("js php back:"+result);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log(result);
            if(result=="1"){
                document.getElementById("saveAnswer").innerHTML = "Az érték már mentve van!";
            }else{
                document.getElementById("saveAnswer").innerHTML = "Az érték sikeresen mentve!";
            }
        }
        
    }
    
    
    xhr.send("pont1=" +lat1+"&pont1_2=" +lang1+"&pont2=" +lat2+"&pont2_2=" +lang2+"&email=" + email);
}
function initMapelozmeny(){
        map2 = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.4979, lng: 19.0402},
        zoom: 10
      });
     
    
}