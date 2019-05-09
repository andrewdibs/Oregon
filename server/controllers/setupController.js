var gameController = require("./gameController");
var profession = require("../models/profession");


var startMonths = ["March","April", "May", "June", "July"];

exports.getGameScreen = function(req,res){
    var screen = startGameScreen[req.params.id];
    
    res.setHeader('Content-Type', 'text/html');
    res.send(screen);
}

exports.saveStartMonth = function(req,res){
    gameController.getLocalData().startMonth = startMonths[req.params.id];
    res.setHeader('Content-Type', 'text/plain');
    res.send(gameController.getLocalData().startMonth);
}
var professions = profession.allProfs;
exports.getProfession = function(req,res){
    var profession = professions[req.params.id];
    
    gameController.getLocalData().playerProfession = profession.type;
    gameController.getLocalData().playerMoney = profession.money;
    console.log("test");
    res.setHeader('Content-Type', 'application/json');
    res.send(gameController.getLocalData().playerProfession);
}

exports.savePlayerName = function(req,res){
    gameController.getLocalData().playerNames.push(req.body.name);
    res.setHeader('Content-Type','application/json');
    res.send(gameController.getLocalData().playerNames);
}
exports.getAllPlayerNames = function(req,res){
    res.setHeader('Content-Type','application/json');
    res.send(gameController.getLocalData().playerNames);
}


var screen1 = "<h2>Choose your Profession</h2>"
    +"<form id=\"myForm\">"
    +"<select id=\"mySelect\">"
        +"<option value=\"1\">Banker From Boston</option>"
        +"<option value=\"2\">Farmer From Illinois</option>"
        +"<option value=\"3\">Carpenter From Ohio</option>"
    +"</select>"
    +"</form>";

var screen2 = "<form><h2>What is your Wagon Leaders name</h2>"
    +"<ol id= \"wagonLeaderName\">"
        +"<input type= 'text' id ='p1'><br></form>";

var screen3 = "<h2>Enter Other Party Member Names: </h2>"
    +"<form><ol id=\"memberNames\"><p>Player 2 "
    +"<input type='text' id='p2'><br>"
    +"Player 3 <input type='text' id= 'p3'><br>"
    +"Player 4 <input type='text' id= 'p4'><br>" 
    +"Player 5 <input type='text' id= 'p5'><br></form>";

var screen4 = "<h2>Which Month Would You Like To Depart?<h2>"
    +"<form id=\"myForm\">"
    +"<select id=\"mySelect\">"
        +"<option value=\"1\">March</option>"
        +"<option value=\"2\">April</option>"
        +"<option value=\"3\">May</option>"
        +"<option value=\"4\">June</option>"
        +"<option value=\"5\">July</option>"
    +"</select>"
    +"</form>";

var screen5 = "<h2>Wagon Summary<h2>"
    +"<ul id=\"wagonSummary\">"
       +"<li id =\"leader\"></li>"
       +"<li id =\"p2\"></li>"
       +"<li id =\"p3\"></li>"
       +"<li id =\"p4\"></li>"
       +"<li id =\"p5\"></li>"
       +"<li id =\"profession\"></li>"
       +"<li id =\"cash\"></li>"
       +"<li id =\"month\"></li></ul>";

var startGameScreen = [];

startGameScreen.push(screen1);
startGameScreen.push(screen2);
startGameScreen.push(screen3);
startGameScreen.push(screen4);
startGameScreen.push(screen5);
