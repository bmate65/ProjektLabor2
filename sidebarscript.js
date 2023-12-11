var username;
var password;

//bejelentkezett felhasználó email címe: ha null akkor nincs senki bejelentkezve.










function sidebarinit(){
console.log(document.getElementById("sidebar"));
var content = "<h1 class='menu'>Menü</h1><a  class='sidebar-btn' id='login' onclick=login()>Bejelentkezés</a>";
content+="<a  class='sidebar-btn' id='regist' onclick='regist()'>Regisztráció</a><a class='sidebar-btn' href='valami.html'>Astronomy</a>";
document.getElementById("sidebar").innerHTML = content;
}

function back(){
    sidebarinit();
}

function login(){
    console.log("Bejelentkezés");
    var content="<div id='input' class='input'><p>Bejelentkezés a fiókba:</p><p><div class='form-group'><label for='username'>Add meg az email címed:</label><input type='email' id='username' class='form-control'></div></p><p><div class='form-group'><label for='password'>Add meg a jelszavad: </label>          <input type='password' id='password' class='form-control'>        </div>    </p>    <p>    <a  class='sidebar-btn' id='login' onclick=submitLogin()>Belépés</a>    </p>    <p id='answer'>    </p></div><p><a  class='sidebar-btn-small' id='back' onclick=back()>Vissza</a></p>"
    document.getElementById("sidebar").innerHTML = content;

}
function regist(){
    console.log("Regisztráció:");
    var content="<div id='input' class='input'><p>Felhasználó létrehozása:</p><p><div class='form-group'><label for='username'>Add meg az email címed:</label><input type='email' id='username' class='form-control'></div></p><p><div class='form-group'><label for='password'>Add meg a jelszavad: </label>          <input type='password' id='password' class='form-control'>        </div>    </p>    <p>    <a  class='sidebar-btn' id='login' onclick=submitRegist()>Regisztráció</a>    </p>    <p id='answer'>    </p></div><p><a  class='sidebar-btn-small' id='back' onclick=back()>Vissza</a></p>"
    document.getElementById("sidebar").innerHTML = content;
    document.getElementById('username').addEventListener('click', function (event) {
        event.stopPropagation();
      });
       
}
function validateEmail(email) {
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function submitRegist(){
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;
    console.log(username);
    console.log(password);
    if (validateEmail(username)) {
        console.log("Érvényes e-mail cím.");
    } else {
        console.log("Érvénytelen e-mail cím.");
    }

    

    if(username==""||password=="")
    {
        var content="Kérlek írj be egy e-mail címet és jelszót"
        document.getElementById("answer").innerHTML = content;
    }
    else if(validateEmail(username)==false)
    {
        var content="Hibás az email cím!";
        document.getElementById("answer").innerHTML = content;
    }
    /*
    else if(checkEmail(username)==true)
    {
        var content="Ez az email cím már foglalt!";
        console.log("foglalt");
        document.getElementById("answer").innerHTML = content;
    }
    */
    else{
        newUser(username, password);
        setTimeout(function() {
            sidebarinit();
           }, 1000);
    }
    
}


// Function to check if email is in the database
function checkEmail(email) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "check_email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log("js php back:"+result);
            if (result=="true") {
                // The email address exists
                console.log("Email exists.");
                return true;
            } else {
                // The email address does not exist
                console.log("Email does not exist.");
                return false;
            }
        }
    }

    xhr.send("email=" + encodeURIComponent(email));
}

function newUser(email, passwordget){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "new_user.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var result = xhr.responseText;
    //var eredmeny=("js php back:"+result);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log(result);
            
        }
        document.getElementById("answer").innerHTML = xhr.responseText.replace(/"/g,"");
    }
    
    
    xhr.send("email=" + encodeURIComponent(email)+"&password=" + encodeURIComponent(password));
}
//waiting function
async function waitForSeconds(seconds) {
    return new Promise(resolve => {
       setTimeout(() => {
         resolve();
       }, seconds * 1000);
    });
   }

//bejelentkezés gomb:
   function submitLogin(){

    username=document.getElementById("username").value;
    password=document.getElementById("password").value;
    console.log(username);
    console.log(password);
    if (validateEmail(username)) {
        console.log("Érvényes e-mail cím.");
    } else {
        console.log("Érvénytelen e-mail cím.");
    }

    

    if(username==""||password=="")
    {
        var content="Kérlek írj be egy e-mail címet és jelszót"
        document.getElementById("answer").innerHTML = content;
    }
    else if(validateEmail(username)==false)
    {
        var content="Hibás az email cím!";
        document.getElementById("answer").innerHTML = content;
    }
    
    else{
        userLogin(username, password);
        setTimeout(function() {
            userPanelInit();
           }, 1000);
    }
    
}

//itt hivjuk meg a php scriptet
function userLogin(email, password){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "check_login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var result = xhr.responseText;
    //var eredmeny=("js php back:"+result);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log(result);
            
        }
        if(result=="true"){
        document.getElementById("answer").innerHTML = "Sikeres belépés! ";
        globalcurrentUser=email;
        setGlobalUser();
        console.log(globalcurrentUser);
        }else{
            document.getElementById("answer").innerHTML = "Hibás felhasználónév vagy jelszó! ";
        }
    }
    
    
    xhr.send("email=" + encodeURIComponent(email)+"&password=" + encodeURIComponent(password));
}