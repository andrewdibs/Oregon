var topTen = require('../models/topTen');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "1337",
    database: "otTopTen",
    password: "mysql"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL DB Connected!");
	var sql = "use otTopTen;";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
});

exports.getTopScores= function(req,res){
    var currentTopScores = [];
    
    var sql = "SELECT playerName, playerScore, dateEarned FROM topTen;";
    con.query(sql, function(err, row, fields){
        if(err) throw err;
        for (var i=0; i<row.length;i++){
            currentTopScores[i] = topTen.addScore(row[i].playerName, row[i].playerScore, row[i].dateEarned);
        }
        res.setHeader('Content-Type','application/json');
        res.send(currentTopScores);
    })
}

exports.insertTopScore = function(req,res){
    var sql = "INSERT INTO topTen (playerName,playerScore,dateEarned)VALUES('"+req.body.playerName+"','"+req.body.playerScore+"','"+req.body.dateEarned+"')";
    
    con.query(sql,function(err,result){
        if(err) throw err;
        
        console.log("inserted");
    })
    res.setHeader('Content-Type','application/json');
    res.send(req.body);
}