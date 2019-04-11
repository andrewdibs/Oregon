var gameData = require('../models/gameData');
var gameController = require("./gameController");
var profession = require("../models/profession");



exports.getGameScreen = function(req,res){
    var screen = exports.startGameScreen[req.params.id];
    
    res.setHeader('Content-Type', 'text/html');
    res.send(screen);
}

exports.saveStartMonth = function(req,res){
    gameController.getGameData().startMonth = req.body.month;
    res.setHeader('Content-Type', 'text/plain');
    res.send(gameController.getGameData().startMonth);
}

exports.getProfession = function(req,res){
    var profession = professions.allProfessions[req.params.id];
    
    gameController.getGameData().playerProfession = profession.type;
    gameController.getGameData().playerMoney = profession.money;
    
    res.setHeader('Content-Type', 'application/json');
    res.send(gameData);
}

exports.savePlayerName = function(req,res){
    gameController.getGameData().playerNames.push(req.body.name);
    res.setHeader('Content-Type','application/json');
    res.send(gameData);
}
exports.getAllPlayerNames = function(req,res){
    res.setHeader('Content-Type','application/json');
    res.send(gameData.playerNames);
}


var screen1 = "<h2>Choose your Profession</h2>"
    +"<ol id= \"profQuestions\" class= 'center'>"
        +"<li id=\"banker\">Be a Banker from Boston</li>"
        +"<li id=\"farmer\">Be a Carpenter from Ohio</li>"
        +"<li id=\"banker\">Be a Farmer from Illinois</li>"
        +"<li id=\"banker\">Be a Farmer from Illinois</li>"
    +"</ol>"
    +"<div id= \"select\">Who will you be: </div>";

var screen2 = "<form><h2>What is your Wagon Leaders name</h2>"
    +"<ol id= \"wagonLeaderName\">"
        +"<input type= 'text' id ='p1'><br></form>"
    +"<button type ='button' id='submit'>Submit</button>";

var screen3 = "<h2>Enter Other Party Member Names: </h2>"
    +"<form><ol id=\"memberNames\"><p>Player 2"
    +"<input type='text' id= 'p2><br>"
    +"Player 3 <input type='text' id= 'p3><br>"
    +"Player 4 <input type='text' id= 'p4><br>" 
    +"Player 5 <input type='text' id= 'p5><br></form>"
    +"<button type='button' id='submit'>Submit</button>";

var screen4 = "<h2>Which Month Would You Like To Depart?<h2>"
    +"<ol id=\"startMonths\">"
        +"<li id=\"marchStart\">March </li>"
        +"<li id=\"aprilStart\">April </li>"
        +"<li id=\"mayStart\">May </li>"
        +"<li id=\"juneStart\"June </li>"
        +"<li id=\"julyStart\">July </li>"
        +"<li id=\"differencesMenu\">Learn the Differences </li></ol>"
    +"<div id= \"selectChoice\">What will you choose?</div>";

var screen5 = "<h2>Wagon Summary<h2>"
    +"<ul id=\"wagonSummary\">"
       +"<li id =\"leader\"></li>"
       +"<li id =\"member1\"></li>"
       +"<li id =\"member2\"></li>"
       +"<li id =\"member3\"></li>"
       +"<li id =\"member4\"></li>"
       +"<li id =\"profession\"></li>"
       +"<li id =\"cash\"></li>"
       +"<li id =\"month\"></li></ul>"
    +"<div id=\"select\">Press space to continue</div>";

var startGameScreen = [];

startGameScreen.push(screen1);
startGameScreen.push(screen2);
startGameScreen.push(screen3);
startGameScreen.push(screen4);
startGameScreen.push(screen5);
