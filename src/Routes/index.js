var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");


var loginController = require('../Controllers/loginController')

// router.get('/', drinkController.getDrinks)


router.get('/', function (req, res) {
  res.render('login.ejs', { error: req.flash('loginMessage')} );
});

router.post('/login', loginController.login);

router.get('/signup', function (req, res) {
res.render('signup.ejs', { error: req.flash('signupMessage')} );
});

router.post('/signup', loginController.signup);

router.get('/drinks',authenticateTokenFromSession, function (req, res) {
res.render('drink.ejs', {user: req.session.user});
});




function authenticateTokenFromSession(req,res,next){
  const token = req.session.token;
  if(token == null) return res.sendStatus(401);
   jwt.verify(token,process.env.TOKEN_SECRET, (err,user) => {
    if(err)
      return res.sendStatus(403);
      req.user = user;
      next();
  })
}

module.exports = router;