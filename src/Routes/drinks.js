var express = require('express');
var router = express.Router();

var drinkController = require('../Controllers/drinkController')

router.get('/', (req, res, next) => {
    console.log(111112222)
})




module.exports = router;