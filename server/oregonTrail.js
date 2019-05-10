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


app.route('/api/setup/player')
    .get(setupController.getAllPlayerNames)
    .post(setupController.savePlayerName);


app.route('/api/setup/profession/:id')
    .post(setupController.getProfession);

app.route('/api/game/pace/:id')
    .post(gameController.changePace);

app.route('/api/game/update')
    .get(gameController.getGameData)
    .post(gameController.updateGame);

app.route('/api/game/data')
    .get(gameController.getGameData);

app.route('/api/setup/screen/:id')
    .get(setupController.getGameScreen)
    .post(setupController.getGameScreen);

app.route('/api/setup/month/:id')
    .post(setupController.saveStartMonth);

app.route('/api/game/reset')
    .post(gameController.resetGame);

app.route('/api/game/hunt')
    .post(gameController.hunt);
app.route('/api/game/eat')
    .post(gameController.eat);

app.route('/api/topTen/print')
    .get(topTenController.getTopScores);

app.route('api/topTen/save')
    .post(topTenController.insertTopScore);

app.listen(port,()=> console.log(`server running on port ${port}`));