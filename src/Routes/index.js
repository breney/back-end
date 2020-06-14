var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

//Obter funções do indexcontroller
var indexController = require('../Controllers/indexController')


//Obter todos utilizadores
router.get('/users',indexController.getUsers)

//Obter pagina principal de login
router.get('/', function (req, res) {
  res.render('login.ejs', { error: req.flash('loginMessage')} );
});

// Login  example : { "email" : "bruno@gmail.com", "password" : "123123"}
router.post('/login', indexController.login);

router.get('/signup', function (req, res) {
  res.render('signup.ejs', { error: req.flash('signupMessage')} );
  });

// Signup  example : {"name" : "Bruno", "email" : "brunopereira@gmail.com", "password" : "123"}
router.post('/signup', indexController.signup);

//Ir para pagina onde podemos fazer imgupload 
router.get('/imgupload',authenticateTokenFromSession, function (req, res) {
 res.render('imgupload.ejs', {user: req.session.user});
  });

  //Logout mandando para o ficheiro login de volta
router.get('/logout', function(req,res){
    req.flash('loginMessage', 'Logout feito com sucesso!');
    res.render('login.ejs', { error: req.flash('loginMessage')})
})



//Função para obter token de um login
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