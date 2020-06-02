var dotenv = require('dotenv').config();
module.exports = {
  SERVER: {
    HOSTNAME: process.env.DB_HOST
  },
  DB: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_SCHEMA,
    PORT: process.env.DB_PORT

  }
}