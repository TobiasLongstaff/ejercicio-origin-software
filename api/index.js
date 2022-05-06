const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
app.use(cors())

const { insert_usuario, insert_accion, read_accion, remove_accion } = require('./operaciones')

const connection = mysql.createConnection(
{
    host: process.env.HOST,
    user: process.env.USER,
    password: "",
    database: process.env.DATABASE
})

connection.connect((error) =>
{
    if(error) throw error
    console.log('Conectado a la base de datos')
})

app.use(express.json())

app.get('/', (request, response) => 
{
    response.status(404)
})


app.post('/api/login', async (request, response) => 
{
    const usuario = request.body

    if(!usuario.email || !usuario.password)
    {
        return response.json(
        {
            error: 'Requiere mail y contraseña'
        })
    }
    else
    {
        connection.query('SELECT * FROM usuarios WHERE mail = ?', 
        [usuario.email], async (error, result) =>
        {
            if(result.length <= 0 || !(await bcrypt.compare(usuario.password, result[0].password)))
            {
                return response.json(
                {
                    error: 'usuario o contraseña incorretas'
                })
            }
            else
            {
                response.json(result)
            }
        })
    }
})

app.post('/api/registro', async (request, response) => 
{
    const usuario = request.body

    if(!usuario.email || !usuario.password)
    {
        return response.json(
        {
            error: 'Requiere mail y contraseña'
        })
    }
    else
    {
        connection.query('SELECT * FROM usuarios WHERE mail = ?', 
        [usuario.email], async (error, result) =>
        {
            if(result.length > 0)
            {
                return response.json(
                {
                    error: 'Este usuario ya se encuentra registrado'
                })
            }
            else
            {
                if(usuario.password === usuario.password_con)
                {
                    const passwordHash = await bcrypt.hash(usuario.password, 10)
                    insert_usuario(connection, 
                    { name: usuario.nombre, email: usuario.email, password: passwordHash },
                    (result) =>
                    {
                        response.json(result)
                    })
                }
                else
                {
                    return response.json(
                    {
                        error: 'contraseñas distintas'
                    })
                }
            }
        })
    }
})

app.get('/api/favoritos/:id', async (request, response) => 
{
    const { id } = request.params
    if(!id)
    {
        return response.json(
        {
            error: 'Se requieren datos'
        })
    }
    else
    {
        read_accion(connection,
        { usuario: id },
        (result) =>
        {
            response.json(result)
        })        
    }
})

app.post('/api/favoritos', async (request, response) =>
{
    const accion = request.body

    if(!accion.simbolo || !accion.nombre || !accion.moneda || !accion.usuario)
    {
        return response.json(
        {
            error: 'Se requiere mas informacion'
        })
    }
    else
    {
        connection.query('SELECT * FROM acciones_favoritas WHERE simbolo = ? AND id_usuario = ?', 
        [accion.simbolo, accion.usuario], async (error, result) =>
        {
            if(result.length > 0)
            {
                return response.json(
                {
                    error: 'Esta accion ya se encuentra en favoritos'
                })
            }
            else
            {
                insert_accion(connection, 
                { simbolo: accion.simbolo, nombre: accion.nombre, moneda: accion.moneda, usuario: accion.usuario },
                (result) =>
                {
                    response.json(result)
                })
            }
        })
    }
})

app.delete('/api/favoritos/:id', async (request, response) =>
{
    const { id } = request.params
    if(!id)
    {
        return response.json(
        {
            error: 'Se requieren datos'
        })
    }
    else
    {
        remove_accion(connection,
        { accion: id },
        (result) =>
        {
            response.json(result)
        })        
    }
})

app.listen(3001, () =>
{
    console.log('Servidor en puerto 3001...')
})