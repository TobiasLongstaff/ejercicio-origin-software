const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const mysqlConnection = require('../conexion')
const { insert_usuario } = require('../operaciones')

router.post('/api/login', async (request, response) => 
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
        mysqlConnection.query('SELECT * FROM usuarios WHERE mail = ?', 
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

router.post('/api/registro', async (request, response) => 
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
        mysqlConnection.query('SELECT * FROM usuarios WHERE mail = ?', 
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
                    insert_usuario(mysqlConnection, 
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


module.exports = router