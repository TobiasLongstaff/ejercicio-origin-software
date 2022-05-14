const express = require('express');
const router = express.Router()
const mysqlConnection = require('../conexion')
const { insert_accion, read_accion, remove_accion } = require('../operaciones')

router.get('/api/favoritos/:id', async (request, response) => 
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
        read_accion(mysqlConnection,
        { usuario: id },
        (result) =>
        {
            response.json(result)
        })        
    }
})

router.post('/api/favoritos', async (request, response) =>
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
        mysqlConnection.query('SELECT * FROM acciones_favoritas WHERE simbolo = ? AND id_usuario = ?', 
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
                insert_accion(mysqlConnection, 
                { simbolo: accion.simbolo, nombre: accion.nombre, moneda: accion.moneda, usuario: accion.usuario },
                (result) =>
                {
                    response.json(result)
                })
            }
        })
    }
})

router.delete('/api/favoritos/:id', async (request, response) =>
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
        remove_accion(mysqlConnection,
        { accion: id },
        (result) =>
        {
            response.json(result)
        })        
    }
})

module.exports = router