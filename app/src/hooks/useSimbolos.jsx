import { useState, useEffect } from 'react' 

export const useSimbolos = () =>
{
    const [ dataSimbolos, setDataSimbolos ] = useState([])

    useEffect(() =>
    {
        simbolos()
    },[])

    const simbolos = async (buscar) =>
    {
        let filtro = ''
        if(typeof buscar !== 'undefined') { filtro = '='+buscar }
        try
        {
            let res = await fetch('https://api.twelvedata.com/symbol_search?symbol'+filtro)
            let data = await res.json()
            if(typeof data !== 'undefined')
            {
                setDataSimbolos(data.data)
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    return { dataSimbolos, simbolos }
}