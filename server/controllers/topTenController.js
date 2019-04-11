var topTen = require('../models/topTen');

exports.currentTopScores = [];
exports.currentTopScores.push(topTen.addScore("lena", 430, "03/01/2019"));
exports.currentTopScores.push(topTen.addScore("clix", 580, "11/20/2018" ));


exports.getCurrentScores = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.currentTopScores);
}
