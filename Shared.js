var globalcurrentUser;

function setGlobalUser(){
    localStorage.setItem('UserGlobal',globalcurrentUser);
}

function setGlobalUsernull(){
    localStorage.setItem('UserGlobal',null);
}

function getGlobalUser()
{
return localStorage.getItem('UserGlobal')
}