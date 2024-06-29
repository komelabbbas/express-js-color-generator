const mysql = require('mysql2')
const dbConfig = require('../config/db.config.js')

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: 3306,
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error)
    return
  }
  console.log('Successfully connected to the database.')
})

module.exports = connection
