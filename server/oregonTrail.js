const express = require('express');
const app = express();
app.use(express.static('client/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json({type:'application/json'}));

const port = 1337;


app.get('/', function (req, res) {
res.sendFile('index.html', {root: './client/views' })
});

app.get('/mainmenu', function (req, res) {
res.sendFile('mainmenu.html', {root: './client/views' })
});

app.get('/topten', function (req, res) {
res.sendFile('topten.html', {root: './client/views' })
});

app.get('/setup', function (req, res) {
res.sendFile('setup.html', {root: './client/views' })
});

app.get('/trail', function (req, res) {
res.sendFile('trail.html', {root: './client/views' })
});

var topTenController = require('./controllers/topTenController');
var setupController = require('./controllers/setupController');
var gameController = require('./controllers/gameController');

app.route('/api/topTen/topTen')
  .get(topTenController.getCurrentScores);

app.route('/api/setup/player')
    .get(setupController.getAllPlayerNames)
    .post(setupController.savePlayerName);
    



app.listen(port,()=> console.log(`server running on port ${port}`));