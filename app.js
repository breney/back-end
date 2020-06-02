var express = require('express');
var app = express();
var port = 3000;

var config = require('./config')
var drinks = require('./src/Routes/drinks')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, function () {
    console.log('Running on : ' + 'http://' + config.SERVER.HOSTNAME + '/' + config.DB.PORT + '. Connected to database', config.DB.DATABASE)
  });

app.use('/', drinks)