var audio = new Audio('/music/Blue_Creek_Trail.mp3');

var cook = document.cookie;

if (cook == "musicOff"){
    audio.autoplay=false;
}
else{
    audio.autoplay = true;
}
window.onload = function(){
    audio.play();
}
var musicStatus = true;
document.addEventListener("keypress", function(event){
    if(event.which == 52 && musicStatus){
        audio.pause();
        document.cookie = "musicOn";
        musicStatus=false;
        document.getElementById("offColor").style.color = "red";
        document.getElementById("onColor").style.color = "white";
        
    }
    else if(event.which ==52){
        audio.play();
        document.cookie = "musicOff";
        musicStatus = true;
        document.getElementById("offColor").style.color = "white";
        document.getElementById("onColor").style.color = "green";
        
    }                         
});