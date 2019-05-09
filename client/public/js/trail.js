window.addEventListener("keydown",function(event){
    if(event.keyCode == 32){
        console.log("event fired");
        nextDay();
    }
});
window.addEventListener("keydown",function(event){
    if(event.keyCode == 49)
        changePace(1);
});
window.addEventListener("keydown",function(event){
    if(event.keyCode ==  50)
        changePace(2);
});
window.addEventListener("keydown",function(event){
    if(event.keyCode == 51)
        changePace(3);
});
window.addEventListener("keydown",function(event){
    if(event.keyCode == 48)
        changePace(0);
});

window.addEventListener("keydown",function(event){
    if(event.keyCode==82)
        resetGame();
});
window.addEventListener("keydown",function(event){
    if(event.keyCode==72)
        hunt();
});
window.addEventListener("keydown",function(event){
    if(event.keyCode==69)
        eat();
});

var message = "";

function nextDay(){
    fetch('api/game/update',{
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(
    function(response){
        if (response.status != 200){
            console.log("couldnt retreive fetch: " +response.status);
            return;
        }
        response.json().then(function(data){

            var numAlive = 0;
            for (var i =0;i<data.playerStatus.length;i++)
                if(data.playerStatus[i]) numAlive++;
            
            var postion = data.milesTraveled/5.25;
            document.getElementById("days").innerHTML = data.daysOnTrail;
            document.getElementById("miles").innerHTML = data.milesTraveled;
            if (data.currentHealth<0) 
                document.getElementById("health").innerHTML = 0;
            else 
                document.getElementById("health").innerHTML = data.currentHealth;
            
            document.getElementById("weather").innerHTML = data.currentWeather.type;
            document.getElementById("pace").innerHTML = data.currentPace.paceName;
            document.getElementById("terrain").innerHTML = data.currentTerrain.terrainName;
            document.getElementById("members").innerHTML = numAlive;
            document.getElementById("terrainImg").src = data.currentTerrain.terrainImage;
            document.getElementById("food"). innerHTML = data.playerFood;
            
            if (data.milesTraveled< 500)
                document.getElementById("wagonImg").style.left = postion + "%";
            if (data.messages.length>0){
                console.log(data.messages[data.messages.length-1]);
                var message = data.messages[0];
                document.getElementById("messageBox").innnerHTML= message;
            }
            return data;
            
        })
    });
};

function changePace(id){
    fetch('api/game/pace/'+id,{
        method:'POST',
        headers:{
            'Content-Type':'application/json; charset=UTF-8'
        }
    } ).then(
        function(response){
            response.json().then(function(data){
                document.getElementById("pace").innerHTML = data.currentPace.paceName;
            });
        }); 
}

function resetGame(){
    fetch('api/game/reset', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json; charsetUTF-8'
        }
    }).then(function(response){
        if(response.status != 200){
            console.log("couldnt retreive fetch: " +response.status);
            return;
        }
        response.json().then(function(data){
            nextDay();
        });
    });
}

function hunt(){
    fetch('api/game/hunt',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json; charsetUTF-8'
        }
    }).then(function(response){
        if(response.status != 200){
            console.log("couldnt retreive fetch: " +response.status);
            return;
        }
        response.json().then(function(data){
            document.getElementById("health").innerHTML= data.currentHealth;
            document.getElementById("food").innerHTML= data.playerFood;
            document.getElementById("days").innerHTML=data.daysOnTrail;
        });
    });
}
function eat(){
    fetch('api/game/eat',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json; charsetUTF-8'
        }
    }).then(function(response){
        if(response.status != 200){
            console.log("couldnt retreive fetch: " +response.status);
            return;
        }
        response.json().then(function(data){
            document.getElementById("health").innerHTML= data.currentHealth;
            document.getElementById("food").innerHTML= data.playerFood;
        });
    });
}    
