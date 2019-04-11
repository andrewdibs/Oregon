function profession(type, origin, money){
    this.type = type;
    this.money = money;
    this.origin = origin;
}

exports.allProfessions = [];

exports.allProfessions.push(new profession("Banker","Boston", 1600 ));
exports.allProfessions.push(new profession("Carpenter","Ohio", 1300));
exports.allProfessions.push(new profession("Farmer","Illinois", 1000));


exports.getAllProfessions = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.allProfessions);
}