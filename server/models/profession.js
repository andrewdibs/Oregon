function profession(type, origin, money){
    this.type = type;
    this.money = money;
    this.origin = origin;
}

exports.allProfs = [];

exports.allProfs.push(new profession("Banker","Boston", 1600 ));
exports.allProfs.push(new profession("Carpenter","Ohio", 1300));
exports.allProfs.push(new profession("Farmer","Illinois", 1000));


exports.getAllProfessions = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.allProfs);
}
