import React, { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem, InputLabel, Alert } from '@mui/material'
import Highcharts from 'highcharts'
import HigchartsReact from 'highcharts-react-official'
import { useParams } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useFecha } from '../hooks/useFecha'
import Loading from '../components/Loading/Loading'
import { useAccion } from '../hooks/useAccion'

const DataAccion = () =>
{
    const { autenticacion } = useAutenticacion()
    const { fecha } = useFecha()
    let { sim, ex } = useParams()
    const { dataGraficoAccion, obtenerDatosAccion } = useAccion(sim, ex)
    const [intervalo, setIntervalo] = useState('1')
    const [ error, setError ] = useState(null)
    const [ fechaAcciones, setFechaAcciones ] = useState(
    {
        fechaHasta: '',
        fechaDesde: ''
    })
    const dateDesde = useRef()
    const dateHasta = useRef()
    const [ tipoBusqueda, setTipoBusqueda] = useState('tiempo-real')

    // useEffect(() =>
    // {
    //     obtenerDatosAccion()
    // },[])

    // useEffect(() =>
    // {
    //     let activo = (tipoBusqueda !== 'historico') ? true : false
    //     dateDesde.current.disabled = activo 
    //     dateHasta.current.disabled = activo
    // },[tipoBusqueda])

    // agregar este filtro al custom hook

    const cargarFiltros = async () =>
    {
        if(tipoBusqueda !== 'historico') 
        {
            setInterval( obtenerDatosAccion ,intervalo*60*1000) 
        }
        else
        {
            if(fechaAcciones.fechaDesde !== '' && fechaAcciones.fechaHasta !== '')
            {
                obtenerDatosAccion('&start_date='+fechaAcciones.fechaDesde+'&end_date='+fechaAcciones.fechaHasta) 
            }
            else if(fechaAcciones.fechaDesde > fechaAcciones.fechaHasta)
            {
                setError('Fechas incorretas')
            }
            else
            {
                setError('Falta completar alguna fecha')                
            }
        }
    }

    const handelFechas = e =>
    {
        setFechaAcciones({
            ...fechaAcciones,
            [e.target.name]: e.target.value
        })
    }

    const handelChangeTipo = e =>
    {
        setTipoBusqueda(e.target.value)
    }

    const handleChangeIntervalo = e => 
    {
        setIntervalo(e.target.value);
    }

    if(!autenticacion)
        return <Loading />
    return (
        <article>
            <Navigation titulo="Accion" volver="/mis-acciones"/>
            <div className="container-acciones">
                <header>
                    <div className="container-historico">
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue="tiempo-real"
                            name="radio-buttons-group"
                            onChange={handelChangeTipo}
                        >
                            <FormControlLabel value="tiempo-real" control={<Radio />} label="Tiempo Real" />
                            <FormControlLabel value="historico" control={<Radio />} label="Historico" />
                        </RadioGroup>
                        <div className="container-date">
                            <div>
                                <label>Fecha hora desde</label><br/>
                                <input 
                                    ref={dateDesde} 
                                    type="datetime-local" 
                                    onChange={handelFechas} 
                                    max={fecha} 
                                    name="fechaDesde"
                                    className="input-date" 
                                />
                            </div>
                            <div>
                                <label>Fecha hora hasta</label><br/>
                                <input 
                                    ref={dateHasta} 
                                    type="datetime-local" 
                                    onChange={handelFechas} 
                                    max={fecha} 
                                    name="fechaHasta"
                                    className="input-date" 
                                />
                            </div>
                        </div>
                    </div>
                    <InputLabel id="simple-select-label">Intervalo</InputLabel>
                    <div className="container-intervalo">
                        <Select
                            labelId="simple-select-label"
                            value={intervalo}
                            label="Intervalo"
                            onChange={handleChangeIntervalo}
                            sx={{ width: 150 }}
                        >
                            <MenuItem value={1}>1min</MenuItem>
                            <MenuItem value={5}>5min</MenuItem>
                            <MenuItem value={15}>15min</MenuItem>
                        </Select>
                        <Button variant="contained" onClick={() => cargarFiltros()}>Graficar</Button>                        
                    </div>
                    {error ? 
                        <Alert severity="error">{error}</Alert>
                        :
                        <></>
                    }
                </header>    
                <main>
                    <HigchartsReact highcharts={Highcharts} options={dataGraficoAccion} />
                </main>            
            </div>
        </article>
    )
}

export default DataAccion