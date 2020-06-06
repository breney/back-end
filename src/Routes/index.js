var express = require('express');
var router = express.Router();

var loginController = require('../Controllers/loginController')

// router.get('/', drinkController.getDrinks)

/* login. */
router.get('/', function (req, res) {
     //render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage')} );
  });
  
router.post('/login', loginController.login);

router.get('/signup', function (req, res) {
  //render the page and pass in any flash data if it exists
 res.render('signup.ejs', { message: req.flash('loginMessage')} );
});
router.post('/signup', loginController.signup);



module.exports = router;