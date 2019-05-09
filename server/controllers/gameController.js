var terrain = require('../models/terrain');
var weather = require('../models/weather');
var pace = require('../models/pace');
var gameData = require('../models/gameData')
var data = gameData.createData();

exports.getGameData = function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(data);
}

exports.getLocalData = function(){
    return data;
}

exports.changePace = function(req,res){
    data.currentPace = pace.allPaces[req.params.id];
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    res.send(data);
    
}

exports.resetGame = function(req,res){
    //data.playerNames = [];
    data.playerStatus= [true,true,true,true,true];
    //data.playerProfession = "";
    //data.playerMoney = 0;
    //data.startMonth= "";
    data.milesTraveled = 0
    data.currentHealth = 100;
    data.currentPace = pace.allPaces[0];
    data.daysOnTrail =0;
    data.currentWeather= weather.allWeather[2];
    data.currentTerrain = terrain.allTerrain[0];
    data.messages = [];

    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(data);
    
}
exports.hunt = function(req,res){
    var num = Math.floor(Math.random()*10);
    
    if (num >= 3&& num<=7){
        data.playerFood++;
        data.currentHealth-=5;
        data.messages.push("You hunted some wild game!");
        data.daysOnTrail++;
    }
    else{
        data.playerFood+=2;
        data.currentHealth-= 7;
        data.daysOnTrail++;
        data.messages.push("You hunted some wild game!Food increased by 2.");
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(data);
}

exports.eat = function(req,res){
    
    if (data.playerFood>0&& data.currentPace== pace.allPaces[0]){
        data.currentHealth+= 10;
        data.playerFood--;
        data.messages.push("You ate some food. Health increased.");
    }
    else if (data.playerFood<1&& data.currentPace== pace.allPaces[0]){
        data.messages.push("You have to hunt for food.");
    }
    else{
        data.messages.push("You must be resting before you can eat.");
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');   
    res.send(data);
}

data.currentWeather = weather.allWeather[2];
exports.updateGame = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    //weather probability change
    var random = Math.floor(Math.random()*100);
    var miles = data.milesTraveled;
    
    if (random<10)data.currentWeather = weather.getAllWeather[0];
    else if (random<20)data.currentWeather = weather.allWeather[1];
    else if (random<40)data.currentWeather = weather.allWeather[2];
    else if (random<50)data.currentWeather = weather.allWeather[3];
    else if (random<60)data.currentWeather = weather.allWeather[4];
    else if (random<70)data.currentWeather = weather.allWeather[5];
    else if (random<80)data.currentWeather = weather.allWeather[6];
    else if (random<85)data.currentWeather = weather.allWeather[7];
    else if (random<90)data.currentWeather = weather.allWeather[8];
    else if (random<95)data.currentWeather = weather.allWeather[9];
    else data.currentWeather = weather.allWeather[10];
    
    //pace change
    data.milesTraveled += Math.floor(data.currentPace.paceMiles*data.currentTerrain.mileChange*data.currentWeather.mileChange);
    var weatherMile = data.currentWeather.mileChange;
    var terrainMile = data.currentTerrain.mileChange;

    data.currentHealth += data.currentWeather.healthChange;
    
    //off players if health gets to low    
    if (data.currentHealth <1 ){
        for (var i=0;i<5;i++){
            data.playerStatus[i] = false;        
        }
    }
    else if (data.currentHealth < 20){

        var rand = Math.floor(Math.random()*100);
        for (var i=0;i<5;i++){
            if (data.playerStatus[i]=true)
                if (rand<= 10){
                    data.messages.push("Oh no, "+data.playerNames[i]+"has died...");
                    data.playerStatus[i]= false;
                }
        }
    }
    else if (data.currentHealth < 50){
  
        var rand = Math.floor(Math.random()*100);
        for (var i=0;i<5;i++){
            if (data.playerStatus[i]=true)
                if (rand<= 3){
                    data.messages.push("Oh no, "+data.playerNames[i]+"has died...");
                    data.playerStatus[i]= false;
                }
        }
    }
    if (data.currentHealth <1 ){
        for (var i=0;i<5;i++){
            data.playerStatus[i] = false;   
        }
        data.messages.push("Oh boy, you died trying to eat eachother in the snowy mountains. The Oregon Trail isn't for everyone...");
            console.log(data.messages)
    }
    //change terrain based on miles traveled 
    if (miles<100) data.currentTerrain = terrain.allTerrain[0];//grassLand
    else if (miles< 150) data.currentTerrain = terrain.allTerrain[2];//mountain
    else if (miles< 220) data.currentTerrain = terrain.allTerrain[1];//desert
    else if (miles< 250) data.currentTerrain = terrain.allTerrain[3];//river
    else if (miles< 300) data.currentTerrain = terrain.allTerrain[0];
    else if (miles< 350) data.currentTerrain = terrain.allTerrain[2];
    else if (miles< 380) data.currentTerrain = terrain.allTerrain[3];
    else if (miles< 450) data.currentTerrain = terrain.allTerrain[1];
    else if (miles< 500) data.currentTerrain = terrain.allTerrain[0];
    
    
    //add a day every update
    data.daysOnTrail++;
    
    //loss max days reached
    if (data.daysOnTrail>45|| data.currentHealth<0){
        data.messages.push("Oh boy, you died trying to eat eachother in the snowy   mountains. The Oregon Trail isn't for everyone...");
        
    }
    //win
    if (data.milesTraveled>499 && data.daysOnTrail<46)
        data.messages.push("CONGRAGULATIONS! You have completed the Oregon Trail!");
    
    res.send(data);
}