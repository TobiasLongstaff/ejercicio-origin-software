import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { url } from '../services/Settings'

const cookie = new Cookies

export const useUserAcciones = () =>
{
    const [ dataAcciones, setDataAcciones ] = useState([])

    useEffect(() =>
    {
        acciones()
    },[])

    const acciones = async () =>
    {
        try
        {
            let res = await fetch(url+'favoritos/'+cookie.get('hashSession'))
            let acciones = await res.json()
            if(typeof acciones !== 'undefined')
            {
                setDataAcciones(acciones)
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const addAccion = async (value) =>
    { 
        try 
        {
            let config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            }
            let res = await fetch(url+'favoritos', config)
            let infoPost = await res.json()
            if(infoPost.insertId > 0)
            {
                acciones()
            }
            else
            {
                // setError(infoPost.error)
                console.log(infoPost.error)
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const delAccion = async (id) =>
    {
        try 
        {
            let config =
            {
                method: 'DELETE',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(url+'favoritos/'+id, config)
            let infoPost = await res.json()
            if(infoPost.serverStatus == 2)
            {
                acciones()
            }
            else
            {
                setError('Error al eliminar volver a intentar mas tarde')
                console.log(infoPost.error)
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    return { dataAcciones, addAccion, delAccion }
}