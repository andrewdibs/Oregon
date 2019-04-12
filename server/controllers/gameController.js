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
    console.log("test");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    
    res.send(data);
    
}

exports.resetGame = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    exports.data= gameData.creatData();
    res.send(data);
    
}

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
    var weatherMile = data.currentWeather.mileChange;
    var terrainMile = data.currentTerrain.mileChange;
    if (data.currentPace == pace.allPaces[0]){
        data.currentHealth += 5; 
    }
    else if(data.currentPace == pace.allPaces[1]){
        data.milesTraveled = miles + (20 * terrainMile * weatherMile);
    }
    else if(gameData.currentPace == pace.allPaces[2]){
        data.milesTraveled = miles + (30 * terrainMile * weatherMile);
        data.currentHealth -= 3;
    }
    else if(gameData.currentPace == pace.allPaces[3]){
        data.milesTraveled = miles + (35 * terrainMile * weatherMile);
        data.currentHealth -= 8;
    }
    
    data.currentHealth += data.currentWeather.healthChange;
    
    //off players if health gets to low    
    if (data.currentHealth <1 ){
        for (var i=0;i<data.playerSatus.length;i++){
            data.playerStatus[i] = false;        
        }
    }
    else if (data.currentHealth < 20){
        for (var i=0;i<data.playerSatus.length;i++){
            var rand = Math.floor(Math.random()*100);
            if (data.playerStatus[i]=true)
                if (rand<= 10){
                    data.playerStatus[i]= false;
                    data.messages.push("Oh no, "+data.playerNames[i]+"has died...");
                }
        }
    }
    else if (data.currentHealth < 50){
        for (var i=0;i<data.playerSatus.length;i++){
            var rand = Math.floor(Math.random()*100);
            if (data.playerStatus[i]=true)
                if (rand<= 3){
                    data.messages.push("Oh no, "+data.playerNames[i]+"has died...");
                    data.playerStatus[i]= false;
                }
        }
    }
    if (data.currentHealth <1 ){
        for (var i=0;i<data.playerSatus.length;i++){
            data.playerStatus[i] = false;
            data.messages.push("Oh boy, you died trying to eat eachother in the snowy mountains. The Oregon Trail isn't for everyone...");
        }
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
    if (data.daysOnTrail>45)
        data.messages.push("Oh boy, you died trying to eat eachother in the snowy   mountains. The Oregon Trail isn't for everyone...");
    
    //win
    if (data.milesTraveled>499 && data.daysOnTrail<46)
        data.messages.push("CONGRAGULATIONS! You have completed the Oregon Trail!");
    
    res.send(data);
}