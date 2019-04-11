function terrain(name, imageURL, miles){
    this.terrainName = name;
    this.terrainImage = imageURL;
    this.mileChange = miles;
} 

exports.allTerrain= [];
exports.allTerrain.push(new terrain("Grassland","../images/grassland.jpg",1));
exports.allTerrain.push(new terrain("Desert","../images/desert.jpg",.95));
exports.allTerrain.push(new terrain("Mountains","../images/mountains.jpg",.5));
exports.allTerrain.push(new terrain("River","../images/river.jpg",.3));

exports.getAllTerrain = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.allTerain);
}
