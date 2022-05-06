const mysql = require('mysql')

function insert_usuario(connection, data, callback) 
{
    let insertQuery = "INSERT INTO usuarios (nombre_apellido, mail, password) VALUES (?, ?, ?)"
    let query = mysql.format(insertQuery, [data.name, data.email, data.password])

    connection.query(query, function(error, result)
    {
        if(error) throw error
        callback(result)
    })
}

function insert_accion(connection, data, callback) 
{
    let insertQuery = "INSERT INTO acciones_favoritas (simbolo, nombre, moneda, id_usuario) VALUES (?, ?, ?, ?)"
    let query = mysql.format(insertQuery, [data.simbolo, data.nombre, data.moneda, data.usuario])

    connection.query(query, function(error, result)
    {
        if(error) throw error
        callback(result)
    })
}

function read_accion(connection, data, callback)
{
    let readQuery = "SELECT * FROM acciones_favoritas WHERE id_usuario = ?"
    let query = mysql.format(readQuery, [data.usuario])

    connection.query(query, function(error, result)
    {
        if(error) throw error
        callback(result)
    })
}

function remove_accion(connection, data, callback) 
{
    let removeQuery = "DELETE FROM acciones_favoritas WHERE id = ?"
    let query = mysql.format(removeQuery, [data.accion])

    connection.query(query, function(error, result)
    {
        if(error) throw error
        callback(result)
    })
}

module.exports = { insert_usuario, insert_accion, read_accion, remove_accion }