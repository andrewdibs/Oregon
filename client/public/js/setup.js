
var currentScreen = 0;
window.addEventListener("keydown",function(event){
    if(event.keyCode == 32)
        window.location.href = "../mainmenu";
    });
window.addEventListener("keydown", function(event){
    if (event.keyCode == 13)
        if (currentScreen == 0)
            nextScreen();
        else if (currentScreen == 1){
            var form = document.getElementById("mySelect");
            var id = form.options[form.selectedIndex].value;
            console.log(id);
            if (id==1)
                saveProfession(0);
            if(id ==2)
                saveProfession(1);
            if (id ==3)
                saveProfession(2);
                
            nextScreen();
        }
        else if(currentScreen == 2){
            var player = document.getElementById("p1").value;
            console.log(document.getElementById("p1").value);
            
            
            savePlayerName(player);
            nextScreen();
        }
        else if (currentScreen==3){
            savePlayerName(document.getElementById("p2").value);
            savePlayerName(document.getElementById("p3").value);
            savePlayerName(document.getElementById("p4").value);
            savePlayerName(document.getElementById("p5").value);
            nextScreen();
        }
        else if (currentScreen==4){
            var form = document.getElementById("mySelect");
            var id = form.options[form.selectedIndex].value;
            console.log(id);
            if (id==1)
                startMonth(0);
            if(id ==2)
                startMonth(1);
            if (id ==3)
                startMonth(2);
            if (id ==4)
                startMonth(3);
            if (id ==4)
                startMonth(4);
                
            nextScreen();
            wagonSummary();
        }
});



function nextScreen(){
    fetch('/api/setup/screen/'+currentScreen).then(function(response) {
    if (response.status !== 200) {
        console.log(response.status + " msg: " + response.value);
        return;
    }
    response.text().then(function(data) {
        document.getElementById("screen").innerHTML = data;
        currentScreen++;
    })
});
}

function savePlayerName(name){
    console.log(name);
    var data = JSON.stringify({name: name});
    console.log(data);
    fetch('api/setup/player/',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: data
    }).then(function(response){
        if (response.status != 200){
            console.log(response.status);
            return;
        }
    });
}

function saveProfession(id){
    fetch('api/setup/profession/'+ id,{
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(function(response){
        if (response.status != 200){
            console.log(response.status + " msg: " + response.value);
            return;
        }
        response.json().then(function(data){
            console.log("professionSaved");
        })
    })
}

function startMonth(id){
    fetch('api/setup/month/'+id,{
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(function(response){
        if (response.satus!= 200){
            console.log(response.status + " msg: " + response.value);
            return;
        }
    })
}

function wagonSummary(){
    fetch('api/game/update',{
        method:'GET',
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
            document.getElementById("leader").innerHTML =data.playerNames[0];
            document.getElementById("p2").innerHTML =data.playerNames[1];
            document.getElementById("p3").innerHTML =data.playerNames[2];
            document.getElementById("p4").innerHTML =data.playerNames[3];
            document.getElementById("p5").innerHTML =data.playerNames[4];
            document.getElementById("profession").innerHTML = data.playerProfession;
            document.getElementById("month").innerHTML = data.startMonth;
            document.getElementById("money").innerHTML = data.playerMoney;
            
            
            return data;
            
        })
    });
};
