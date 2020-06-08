const jwt = require("jsonwebtoken");
const User = require('../seeders/readdb').User;

exports.getUsers = function (req, res, next) {
  User.findAll()
      .then(user => {
          res.send(user);
      });
};

exports.signup = function (req, res) {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var { name } = req.body
  var { email } = req.body;
  var { password } = req.body;
  console.log(name, email)

  User.findOne({
    where: {
      email:email
    }
  }).then(result => {
    if (result == null) {
      User.create({ 'name': name, 'email': email, 'password': password,'createdAt':date, 'updatedAt':date })
        .then(createdUser => {
              const token = generateAccessToken(email, password);
              req.session.user = createdUser;
              req.session.token = token;
            
              res.redirect('/drinks');
        });
    }
    else {
      req.flash('signupMessage', 'Email inserido ja está a ser utilizado');
      res.redirect('/signup');
    }
  }).catch(function (err) {
    return done(err);
  });
}

exports.login = function (req, res) {
  var { email } = req.body;
  var { password } = req.body;

  User.findOne({
    where: {
      email: email,
      password: password
    }
  }).then(result => {
    if (result == null) {
      req.flash('loginMessage', 'Erro no login. Email ou password inserida esta errada!');
      res.redirect('/')  
    }
       else {
     
      const token = generateAccessToken(email, password);
      req.session.user = result;
      req.session.token = token;
      res.redirect('/drinks');
    }
  }).catch(function (err) {
    return done(err);
  });
}

// TODO: generate token function

function generateAccessToken(email,password) {
  return jwt.sign ({ email , password}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}