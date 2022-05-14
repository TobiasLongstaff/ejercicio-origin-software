import React, { useEffect, useState } from 'react'
import './dateboxcontainer.css'
import { useFecha } from '../../hooks/useFecha'
import DateBox from '../DateBox/DateBox'

const DateBoxContainer = ({tipoBusqueda, onChange}) =>
{
    const { fecha } = useFecha()
    const [ activo, setActivo ] = useState(false)

    useEffect(() =>
    {
        let activo = (tipoBusqueda !== 'historico') ? true : false
        setActivo(activo)
    },[tipoBusqueda])

    return(
        <div className="container-date">
            <DateBox 
                text="Fecha hora desde" 
                disabled={activo}
                name="fechaDesde"
                max={fecha}
                onChange={onChange}
            />
            <DateBox 
                text="Fecha hora hasta" 
                disabled={activo}
                name="fechaHasta"
                max={fecha}
                onChange={onChange}
            />
        </div>
    )
}

export default DateBoxContainer