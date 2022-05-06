import React, { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem, InputLabel, Alert } from '@mui/material'
import Highcharts from 'highcharts'
import HigchartsReact from 'highcharts-react-official'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { key } from '../services/Settings'

const cookie = new Cookies

const DataAccion = () =>
{
    let navigate = useNavigate()
    let { sim, ex } = useParams()
    const [intervalo, setIntervalo] = useState('1')
    const [ fecha, setFecha ] = useState()
    const [ error, setError ] = useState(null)
    const [ fechaAcciones, setFechaAcciones ] = useState(
    {
        fechaHasta: '',
        fechaDesde: ''
    })
    const dateDesde = useRef()
    const dateHasta = useRef()
    const [ tipoBusqueda, setTipoBusqueda] = useState('tiempo-real')
    const [options, setOpcions ] = useState({
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
        if(cookie.get('hashSession') == null)
        {
            navigate('/')
        }
        else
        {
            obtenerFechaActual()
            obtenerDatosAccion()
        }
    },[])

    useEffect(() =>
    {
        let activo = (tipoBusqueda !== 'historico') ? true : false
        dateDesde.current.disabled = activo 
        dateHasta.current.disabled = activo
    },[tipoBusqueda])

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

    const obtenerDatosAccion = async (filtroFecha) =>
    {
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

                setOpcions(
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

    const obtenerFechaActual = () =>
    {
        var hoy = new Date()
        let mes = String(hoy.getMonth() + 1)
        let dia = String(hoy.getDate())
        if(mes.length === 1){ mes = '0'+mes }
        if(dia.length === 1){ dia = '0'+dia }

        var fecha = hoy.getFullYear() + '-' + mes + '-' + dia
        var hora = hoy.getHours() + ':' + hoy.getMinutes()
        var fechaYHora = fecha + 'T' + hora
        setFecha(fechaYHora)
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
                    <HigchartsReact highcharts={Highcharts} options={options} />
                </main>            
            </div>
        </article>
    )
}

export default DataAccion