var terrain = require('../models/terrain');
var weather = require('../models/weather');
var pace = require('../models/pace');
var gameData = require('../models/gameData')


exports.getGameData = function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(gameData);
}

exports.changePace = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    getGameData().currentPace = pace.allPaces[req.params.id];
    res.send(gameData);
    
}

exports.resetGame = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    gameData.creatData();
    res.send(gameData);
    
}

exports.updateGame = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    
    //weather probability change
    var random = Math.random()*100;
    var miles = gameData.milesTraveled;
    
    if (random<10)gameData.currentWeather = weather.getAllWeather[0];
    else if (random<20)gameData.currentWeather = weather.allWeather[1];
    else if (random<40)gameData.currentWeather = weather.allWeather[2];
    else if (random<50)gameData.currentWeather = weather.allWeather[3];
    else if (random<60)gameData.currentWeather = weather.allWeather[4];
    else if (random<70)gameData.currentWeather = weather.allWeather[5];
    else if (random<80)gameData.currentWeather = weather.allWeather[6];
    else if (random<85)gameData.currentWeather = weather.allWeather[7];
    else if (random<90)gameData.currentWeather = weather.allWeather[8];
    else if (random<95)gameData.currentWeather = weather.allWeather[9];
    else gameData.currentWeather = weather.getAllWeather[10];
    
    //pace change
    var weatherMile = gameData.currentWeather.mileChange;
    var terrainMile = gameData.currentTerrain.mileChange;
    if (gameData.currentPace == pace.allPaces[0]){
        gameData.currentHealth += 5; 
    }
    else if(gameData.currentPace == pace.allPaces[1]){
        gameData.milesTraveled = miles + (20 * terrainMile * weatherMile);
    }
    else if(gameData.currentPace == pace.allPaces[2]){
        gameData.milesTraveled = miles + (30 * terrainMile * weatherMile);
        gameData.currentHealth -= 3;
    }
    else if(gameData.currentPace == pace.allPaces[3]){
        gameData.milesTraveled = miles + (35 * terrainMile * weatherMile);
        gameData.currentHealth -= 8;
    }
    
    gameData.currentHealth += gameData.currentWeather.healthChange;
    
    //off players if health gets to low    
    if (gameData.currentHealth <1 ){
        for (var i=0;i<gameData.playerSatus.length;i++){
            gameData.playerStatus[i] = false;        
        }
    }
    else if (gameData.currentHealth < 20){
        for (var i=0;i<gameData.playerSatus.length;i++){
            var rand = Math.random()*100;
            if (gameData.playerStatus[i]=true)
                if (rand<= 10){
                    gameData.playerStatus[i]= false;
                    gameData.messages.push("Oh no, "+gameData.playerNames[i]+"has died...");
                }
        }
    }
    else if (gameData.currentHealth < 50){
        for (var i=0;i<gameData.playerSatus.length;i++){
            var rand = Math.random()*100;
            if (gameData.playerStatus[i]=true)
                if (rand<= 3){
                    gameData.messages.push("Oh no, "+gameData.playerNames[i]+"has died...");
                    gameData.playerStatus[i]= false;
                }
        }
    }
    if (gameData.currentHealth <1 ){
        for (var i=0;i<gameData.playerSatus.length;i++){
            gameData.playerStatus[i] = false;
            gameData.messages.push("Oh boy, you died trying to eat eachother in the snowy mountains. The Oregon Trail isn't for everyone...");
        }
    }
    //change terrain based on miles traveled 
    if (miles<100) gameData.currentTerrain = terrain.allTerrain[0];//grassLand
    else if (miles< 150) gameData.currentTerrain = terrain.allTerrain[2];//mountain
    else if (miles< 220) gameData.currentTerrain = terrain.allTerrain[1];//desert
    else if (miles< 250) gameData.currentTerrain = terrain.allTerrain[3];//river
    else if (miles< 300) gameData.currentTerrain = terrain.allTerrain[0];
    else if (miles< 350) gameData.currentTerrain = terrain.allTerrain[2];
    else if (miles< 380) gameData.currentTerrain = terrain.allTerrain[3];
    else if (miles< 450) gameData.currentTerrain = terrain.allTerrain[1];
    else if (miles< 500) gameData.currentTerrain = terrain.allTerrain[0];
    
    
    //add a day every update
    gameData.daysOnTrail++;
    
    //loss max days reached
    if (gameData.daysOnTrail>45)
        gameData.messages.push("Oh boy, you died trying to eat eachother in the snowy   mountains. The Oregon Trail isn't for everyone...");
    
    //win
    if (gameData.milesTraveled>499 && gameData.daysOnTrail<46)
        gameData.messages.push("CONGRAGULATIONS! You have completed the Oregon Trail!");
    
    res.send(gameData);
}