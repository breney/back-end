var express = require('express');
var router = express.Router();

/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})*/

var multer = require('multer')
var upload = multer({ dest: 'public/uploads/'})

//Export das funções
var drinkController = require('../Controllers/drinkController')

//Using only Postman
//Obter todos as bebidas
router.get('/drink', drinkController.getDrinks)

//obter bebidas pelo id
router.get('/drink/:id', drinkController.getDrinksbyID)

//Criar bebida  example : {"name" : "Cerveja", "preco" : "1.2", "quantidade" : "30"}
router.post('/drink', drinkController.createDrink)

//Update bebida example: Parameter :id = 1 {"name" : "Cerveja Coral", "preco" : "5"}
router.post('/updatedrink/:id',drinkController.updateDrink)

//delete bebida by id example: Parameter :id = 1
router.delete('/drink/:id', drinkController.deleteDrink)

//ImageUpload only showing file specs on console
router.post('/imgupload', upload.single('imageupload'), function (req, res, next) {
    console.log(req.file);
   
  });
  

module.exports = router;