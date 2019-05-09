var topTen = require('../models/topTen');

exports.currentTopScores = [];
exports.currentTopScores.push(topTen.addScore("lena", 430, "03/01/2019"));
exports.currentTopScores.push(topTen.addScore("clix", 580, "11/20/2018" ));


exports.getCurrentScores = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.currentTopScores);
}
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