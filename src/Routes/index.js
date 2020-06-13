var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var indexController = require('../Controllers/indexController')


//Get All users
router.get('/user',indexController.getUsers)


router.get('/', function (req, res) {
  res.render('login.ejs', { error: req.flash('loginMessage')} );
});

//Do Login  example : { "email" : "bruno@gmail.com", "password" : "123123"}
router.post('/login', indexController.login);

router.get('/signup', function (req, res) {
  res.render('signup.ejs', { error: req.flash('signupMessage')} );
  });

//Do Signup  example : {"name" : "Bruno", "email" : "brunopereira@gmail.com", "password" : "123"}
router.post('/signup', indexController.signup);


router.get('/drinks',authenticateTokenFromSession, function (req, res) {
 res.render('drink.ejs', {user: req.session.user});
  });

router.delete('/logout', logout, function(req,res){
  console.log("OLA")
  res.render('/')
})

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

function logout(req,res,next){
  const token = req.session.token;
  jwt.destroy(token);
 
}
module.exports = router;