var terrain = require("../models/terrain");
var weather = require("../models/terrain");
var pace = require("../models/pace");

function gameData(){
    this.playerNames = [];
    this.playerStatus= [true,true,true,true,true];
    this.playerProfession = "";
    this.playerMoney = 0;
    this.startMonth= "";
    this.milesTraveled = 0
    this.currentHealth = 100;
    this.currentPace = pace.getAllPaces()[0];
    this.daysOnTrail =0;
    this.currentWeather= weather.getAllWeather()[2];
    this.currentTerrain = terrain.getAllTerrain()[0];
    this.messages = [];
}

exports.createData = function(){
    var data = new gameData();
    
    return data;
}

