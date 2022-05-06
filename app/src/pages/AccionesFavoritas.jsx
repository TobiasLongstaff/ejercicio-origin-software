import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { Autocomplete, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { UilPlus, UilTrash } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import url from '../services/Settings'

const AccionesFavoritas = () =>
{
    const [ data, setData ] = useState([])
    const [ simbolos, setSimbolos ] = useState([])
    const [ value, setValue ] = useState(
    {
        simbolo: '',
        nombre: '',
        moneda: '',
        usuario: '4'
    })

    useEffect(() =>
    {
        obtenerAcciones()
        obtenerSimbolos()
    },[])

    const obtenerAcciones = async () =>
    {
        try
        {
            let res = await fetch(url+'favoritos/4')
            let data = await res.json()
            console.log(data)
            if(typeof data !== 'undefined')
            {
                setData(data)
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const agregarAccion = async () =>
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
                obtenerAcciones()
                console.log('cargado')
            }
            else
            {
                console.error('error')
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const obtenerSimbolos = async (buscar) =>
    {
        let filtro = ''
        if(typeof buscar !== 'undefined') 
        {
            filtro = '='+buscar 
        }

        try
        {
            let res = await fetch('https://api.twelvedata.com/symbol_search?symbol'+filtro)
            let data = await res.json()
            if(typeof data !== 'undefined')
            {
                setSimbolos(data.data)
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const eliminarAccion = async (id) =>
    {
        console.log(id)
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
                obtenerAcciones()
                console.log('eliminado')
            }
            else
            {
                console.error('error')
            }
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const seleccionarAccion = (simbolo) =>
    {
        if(simbolo !== null)
        {
            const arraySimbolo = simbolo.split('/')
            let elementIndex = simbolos.findIndex((obj => obj.symbol == arraySimbolo[0]))
            setValue(
            {
                simbolo: simbolo,
                nombre: simbolos[elementIndex].instrument_name,
                moneda: simbolos[elementIndex].currency,
                usuario: '4'
            })
        }
    }

    const buscarMasSimbolos = e =>
    {
        if(typeof e.target.value !== 'undefined')
        {
            if(e.target.value.length > 2) obtenerSimbolos(e.target.value)            
        }
    }

    return(
        <article>
            <Navigation titulo="Mis acciones"/>
            <div className="container-acciones">
                <header className="container-header">
                    <Autocomplete
                        options={simbolos.map((option) => option.symbol + '/' + option.exchange)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Simbolo" />}
                        onInputChange={buscarMasSimbolos}
                        onChange={(event, newValue) => {seleccionarAccion(newValue)}}
                    />
                    <Button variant="contained" onClick={() => agregarAccion()} endIcon={<UilPlus />}>
                        Agregar Simbolo
                    </Button>                        
                </header>
                <main className="container-tabla">
                    {(data.length > 0) ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Simbolo</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Moneda</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>
                                    <Link to={'/data-accion/'+row.id}>{row.simbolo}</Link>
                                </TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.moneda}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" startIcon={<UilTrash/>} onClick={()=> eliminarAccion(row.id)}>
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    : <></>}
                </main>                
            </div>
        </article>
    )
}

export default AccionesFavoritas