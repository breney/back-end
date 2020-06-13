var express = require('express');
var router = express.Router();

var drinkController = require('../Controllers/drinkController')

//Get All drinks
router.get('/drink', drinkController.getDrinks)

//Get drink by id
router.get('/drink/:id', drinkController.getDrinksbyID)

//Create a drink  example : {"name" : "Cerveja", "preco" : "1.2", "quantidade" : "30"}
router.post('/drink', drinkController.createDrink)

//Update a drink example: Parameter :id = 1 {"name" : "Cerveja Coral", "preco" : "5"}
router.post('/udrink/:id',drinkController.updateDrink)

//Delete a drink by id example: Parameter :id = 1
router.delete('/drink/:id', drinkController.deleteDrink)

module.exports = router;