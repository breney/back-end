var express = require('express');
var router = express.Router();

var drinkController = require('../Controllers/drinkController')

// router.get('/', drinkController.getDrinks)

router.get('/', drinkController.getDrinks) 

module.exports = router;