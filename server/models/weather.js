function weather(id, type, health, miles, probability){
    this.id = id;
    this.type = type;
    this.healthChange = health;
    this.mileChange = miles;
    this.probability = probability;
}

exports.allWeather = [];

exports.allWeather.push(new weather(1,"Very Hot",-8, .7, .1));
exports.allWeather.push(new weather(2,"Hot",-3, .9, .1));
exports.allWeather.push(new weather(3,"Warm",1, 1, .2));
exports.allWeather.push(new weather(4,"Cool",1, .95, .1));
exports.allWeather.push(new weather(5,"Cold",-5, .8, .1));
exports.allWeather.push(new weather(6,"Very Cold", -12, .6, .1));
exports.allWeather.push(new weather(7,"Rain", -4, .6, .1));
exports.allWeather.push(new weather(8,"Heavy Rain", -8, .4, .05));
exports.allWeather.push(new weather(9,"Snow",-15, .3, .05));
exports.allWeather.push(new weather(10,"Blizzard",-30, .1, .05));
exports.allWeather.push(new weather(11,"Heavy Fog",-3, .5, .05));

exports.getAllWeather = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.allWeather);
}
