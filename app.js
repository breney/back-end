var express = require('express');
var app = express();
var port = 3000;

var dotenv = require("dotenv");
dotenv.config();


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');


var path = require('path');

app.set('views', path.join('src', 'views'));
app.set('views engine', 'ejs');

var config = require('./config')


var indexRouter = require('./src/Routes/index')
var drinkRouter = require('./src/Routes/drink')
// Obter Token
var crypto = require('crypto')
var tokenSecret = crypto.randomBytes(64).toString('hex')
console.log(tokenSecret)


var multer  = require('multer')
var upload = multer({ dest: 'uploads/' }) 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'cat', cookie: { maxAge: 60000 } })); // Use the session middleware
app.use(flash())



app.listen(port, function () {
    console.log('Running on : ' + 'http://' + config.SERVER.HOSTNAME + '/' + config.DB.PORT + '. Connected to database', config.DB.DATABASE)
  });



app.use('/',indexRouter)
app.use('/',drinkRouter)


