const config = require('./config').DB;

module.exports = {
    username: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
    host: config.HOST,
    dialect: 'mysql',
};