import { useState, useEffect } from 'react'
import { key } from '../services/Settings'

export const useAccion = (sim, ex) =>
{
    const [intervalo, setIntervalo] = useState('1')
    const [dataGraficoAccion, setDataGraficoAccion ] = useState({
        title: {
            text: sim+'/'+ex
        },
        xAxis: {
          categories: [],
        },
        series: [
            {
                data: [] 
            }
        ]
    })

    useEffect(() =>
    {
        obtenerDatosAccion()
    },[sim, ex])

    const obtenerDatosAccion = async (filtroFecha) =>
    {
        console.log('iniciado')
        let filtro = ''
        if(typeof filtroFecha !== 'undefined') { filtro = filtroFecha }
        try
        {
            let res = await fetch('https://api.twelvedata.com/time_series?symbol='+sim+'&interval='+intervalo+'min&exchange='+ex+'&apikey='+key+filtro)
            let data = await res.json()
            if(data.status == 'ok')
            {
                const arrayClose = []
                const arrayDate = []

                data.values.map((fila) =>
                {
                    arrayClose.push(parseInt(fila.close))
                    arrayDate.push(fila.datetime)
                })

                setDataGraficoAccion(
                {
                    xAxis: {
                        categories: arrayDate,
                    },
                    series: [
                        {
                            data: arrayClose
                        }
                    ]
                })
            }
            else
            {
                console.error(data.message)
                setError('Error al ingresar algun dato')
            }
        }
        catch(error)
        {
            console.error(error)
            setError('Error al ingresar algun dato')
        }
    }

    return { dataGraficoAccion, obtenerDatosAccion }
}