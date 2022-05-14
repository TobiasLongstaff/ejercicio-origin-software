import { useEffect, useState } from 'react'

export const useFecha = () =>
{
    const [ fecha, setFecha ] = useState('')

    useEffect(() =>
    {
        let hoy = new Date()
        let mes = String(hoy.getMonth() + 1)
        let dia = String(hoy.getDate())
        if(mes.length === 1){ mes = '0'+mes }
        if(dia.length === 1){ dia = '0'+dia }

        let fecha = hoy.getFullYear() + '-' + mes + '-' + dia
        let fechaYHora = fecha + 'T00:00'
        setFecha(fechaYHora)
    },[])

    return { fecha }
}