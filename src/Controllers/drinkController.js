const  Drink  = require('../seeders/readdb').Drink;

exports.getDrinks = function (req, res, next) {
    Drink.findAll()
        .then(drinks => {
            res.send(drinks);
        });
};

exports.test = function (req, res, next) {
    res.send("TEST");   
};
