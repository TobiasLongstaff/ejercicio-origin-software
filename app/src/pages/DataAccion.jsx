import React from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material'
import Highcharts from 'highcharts'
import HigchartsReact from 'highcharts-react-official'

const DataAccion = () =>
{
    const options = {
        title: {
            text: 'Nombre empresa'
        },
        series: [
            { 
                name: 'series',
                data: [100, 200, 30, 100, 30, 50, 200]
            }
        ]
    }

    return (
        <article>
            <Navigation titulo="Accion"/>
            <div className="container-acciones">
                <header>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Tiempo Real" />
                            <FormControlLabel value="male" control={<Radio />} label="Historico" />
                            <FormControlLabel value="other" control={<Radio />} label="Intervalo" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained">Graficar</Button>
                </header>    
                <main>
                    <HigchartsReact highcharts={Highcharts} options={options} />
                </main>            
            </div>
        </article>
    )
}

export default DataAccion