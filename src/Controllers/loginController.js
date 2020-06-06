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
  User.findOne({
    where: {
      email: email,
      name: name,
      password: password
    }
  }).then(result => {
    if (result == null) {
      User.create({ 'name': name, 'email': email, 'password': password,'createdAt':date, 'updatedAt':date })
        .then(createdUser => {
              const token = generateAccessToken(email, password);
              req.session.user = createdUser;
              req.session.token = token;
              //res.redirect('/profile');
              console.log("SignUp Feito")
        });
    }
    else {
      req.flash('signupMessage', 'That e-mail is already taken.');
      //res.redirect('/signup');
      console.log('CACA')
    }
  }).catch(function (err) {
    // handle error;
    //return done(err);
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
      req.flash('loginMessage', 'No user found with that e-mail.');
      //res.redirect('/login');
      console.log('EMAIL ERRADO')
    }
    else if (result.password != password) {
      req.flash('loginMessage', 'Oops! Wrong password.');
      //res.redirect('/login');
      console.log('PASSWORD ERRADO')

    } else {
      // TODO: call generate token and add it to user session, redirect to profile
      const token = generateAccessToken(email, password);
      req.session.user = result;
      req.session.token = token;
      //res.redirect('/profile');
      console.log("Feito")
    }
  }).catch(function (err) {
    // handle error;
    //return done(err);
  });
}

// TODO: generate token function

function generateAccessToken(email,password) {
  return jwt.sign ({ email , password}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}