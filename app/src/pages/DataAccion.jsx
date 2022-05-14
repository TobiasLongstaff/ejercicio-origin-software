import React, { useState} from 'react'
import { RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem, InputLabel, Alert } from '@mui/material'
import Highcharts from 'highcharts'
import HigchartsReact from 'highcharts-react-official'
import { useParams } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useAccion } from '../hooks/useAccion'
import Loading from '../components/Loading/Loading'
import Navigation from '../components/Navegacion/Navegacion'
import DateBoxContainer from '../components/DateBoxContainer/DateBoxContainer'

const DataAccion = () =>
{
    const { autenticacion } = useAutenticacion()
    let { sim, ex } = useParams()
    const { dataGraficoAccion, addFiltros, addIntervalo, error } = useAccion(sim, ex)
    const [intervalo, setIntervalo] = useState('1')
    const [ tipoBusqueda, setTipoBusqueda] = useState('tiempo-real')
    const [ fechaAcciones, setFechaAcciones ] = useState({ fechaHasta: '', fechaDesde: '' })

    const handelChangeTipo = e =>
    {
        setTipoBusqueda(e.target.value)
    }

    const handleChangeIntervalo = e => 
    {
        setIntervalo(e.target.value)
    }

    const handelFechas = e =>
    {
        setFechaAcciones({
            ...fechaAcciones,
            [e.target.name]: e.target.value
        })
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
                        <DateBoxContainer tipoBusqueda={tipoBusqueda} onChange={handelFechas}/>
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
                        <Button variant="contained" onClick={() => addFiltros(intervalo, tipoBusqueda, fechaAcciones)}>Graficar</Button>                        
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