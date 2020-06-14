const jwt = require("jsonwebtoken");
const User = require('../Models/sequelize').User;


//Função que permite selecionar todos os dados da tabela users
exports.getUsers = function (req, res, next) {
  User.findAll()
      .then(user => {
          res.send(JSON.stringify(user,null,4));
      });
};

//Função que permite fazer signup e adicionando a tabela users
exports.signup = function (req, res) {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var { name } = req.body
  var { email } = req.body;
  var { password } = req.body;
 
  User.findOne({
    where: {
      email:email
    }
  }).then(result => {
    if (result == null) {
      User.create({ 'name': name, 'email': email, 'password': password,'createdAt':date, 'updatedAt':date })
        .then(createdUser => {

              var token = generateAccessToken(email, password);
              var user =  {
                Name : name,
                Email : email,
                Password : password,
                CreatedAt: date,
                UpdatedAt: date,
                Token : token
              }
              
              req.session.user = createdUser;
              req.session.token = token;
            
              res.redirect('/imgupload');

              res.send(JSON.stringify( user,null,4))

             
        });
    }
    else {
      req.flash('signupMessage', 'Email inserido ja está a ser utilizado');
      res.redirect('/signup')
      res.send("Email inserido ja está a ser utilizado !")
    }
  }).catch(function (err) {
    return err;
  });
}
//Função que permite fazer login 
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
      res.send(JSON.stringify("Email ou Password introduzida esta incorreta",null,4)) 
    }
       else {
      var token = generateAccessToken(email, password);
     
      user = {
        User: result.name,
        Email: email,
        Token: token
      }
      
      req.session.user = result;
      req.session.token = token;
      res.redirect('/imgupload');

      res.send(JSON.stringify(user,null,4))
    }
  }).catch(function (err) {
    return err;
  });
}
//funcao que permite gerar um token para um login
function generateAccessToken(email,password) {
  return jwt.sign ({ email , password}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}