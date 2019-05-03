window.addEventListener("keydown",function(event){
    if(event.keyCode == 32){
        console.log("event fired");
        nextDay();
    }
    if (event.keycode == 49){
        changePace(1);
    }
    if (event.keycode==50){
        changePace(2);
    }
    if (event.keycode==51){
        changePace(3);
    }
    if (event.keycode==48){
        changePace(0);
    }
});



function nextDay(){
    fetch('api/game/update',{
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(
    function(response){
        var data = JSON.parse(response);
        document.getElementById("days").innerHTML = data.daysOnTrail;
        document.getElementById("miles").innerHTML = data.milesTraveled;
        document.getElementById("health").innerHTML = response.currentHealth;
        document.getElementById("weather").innerHTML = response.currentWeather.type;
        document.getElementById("pace").innerHTML = response.currentPace;
        document.getElementById("terrain").innerHTML = response.currentTerrain;
        document.getElementById("members").innerHTML = 5;
        
        },
    function(response){
        console.log("couldnt retreive fetch: " +response.status);
    }
    );
};

function changePace(id){
    fetch('api/game/pace/'+id,{
        method:'POST',
        headers:{
            'Content-Type':'application/json; charset=UTF-8'
        }
    } ).then(
        function(response){
            document.getElementById("pace").innerHTML = response.currentPace;
            
        }
    ) 
}
    
