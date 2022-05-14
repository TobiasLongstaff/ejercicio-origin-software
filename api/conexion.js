const mysql = require('mysql')
require('dotenv').config()

const mysqlConnection = mysql.createConnection(
{
    host: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: process.env.DATABASE
})

mysqlConnection.connect((error) =>
{
    if(error) throw error
    console.log('Conectado a la base de datos')
})

module.exports = mysqlConnection