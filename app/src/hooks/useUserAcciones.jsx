import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { url } from '../services/Settings'
import { useSimbolos } from '../hooks/useSimbolos'

const cookie = new Cookies

export const useUserAcciones = () =>
{
    const { dataSimbolos } = useSimbolos()
    const [ dataAcciones, setDataAcciones ] = useState([])
    const [ error, setError ] = useState(null)
    const [ value, setValue ] = useState(
        {
            simbolo: '',
            nombre: '',
            moneda: '',
            usuario: cookie.get('hashSession')
        })

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
            setError('Error inesperado intentar mas tarde')
        }
    }

    const addAccion = async () =>
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
                setError(infoPost.error)
            }
        }
        catch (error)
        {
            setError('Error inesperado intentar mas tarde')
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
            }
        }
        catch (error)
        {
            setError('Error inesperado intentar mas tarde')
            console.error(error)
        }
    }

    const selectAccion = (simbolo) =>
    {
        if(simbolo !== null)
        {
            const arraySimbolo = simbolo.split('/')
            let elementIndex = dataSimbolos.findIndex((obj => obj.symbol == arraySimbolo[0]))
            setValue(
            {
                simbolo: simbolo,
                nombre: dataSimbolos[elementIndex].instrument_name,
                moneda: dataSimbolos[elementIndex].currency,
                usuario: cookie.get('hashSession')
            })
        }
    }

    return { dataAcciones, addAccion, delAccion, selectAccion, error }
}