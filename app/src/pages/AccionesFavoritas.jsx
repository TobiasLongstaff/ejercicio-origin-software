import React from 'react'
import { Autocomplete, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress } from '@mui/material'
import { UilPlus, UilTrash } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import { useAutenticacion } from '../hooks/useAutenticacion'
import { useUserAcciones } from '../hooks/useUserAcciones'
import { useSimbolos } from '../hooks/useSimbolos'
import Loading from '../components/Loading/Loading'
import Navigation from '../components/Navegacion/Navegacion'

const AccionesFavoritas = () =>
{
    const { autenticacion } = useAutenticacion()
    const { dataAcciones, addAccion, delAccion, selectAccion, error } = useUserAcciones() 
    const { dataSimbolos, simbolos } = useSimbolos()

    const buscarMasSimbolos = e =>
    {
        if(typeof e.target.value !== 'undefined')
        {
            if(e.target.value.length > 2) simbolos(e.target.value)         
        }
    }

    if(!autenticacion)
        return <Loading />
    return(
        <article>
            <Navigation titulo="Mis acciones"/>
            <div className="container-acciones">
                <header className="container-header">
                    <Autocomplete
                        options={dataSimbolos.map((option) => option.symbol + '/' + option.exchange)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Simbolo" />}
                        onInputChange={buscarMasSimbolos}
                        onChange={(event, newValue) => {selectAccion(newValue)}}
                    />
                    <Button variant="contained" onClick={() =>  addAccion()} endIcon={<UilPlus />}>
                        Agregar Simbolo
                    </Button>  
                    {error ? 
                        <Alert severity="error">{error}</Alert>
                        :
                        <></>
                    }                      
                </header>
                <main className="container-tabla">
                    {(dataAcciones.length > 0) ?
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
                            {dataAcciones.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>
                                    <Link to={'/data-accion/'+row.simbolo}>{row.simbolo}</Link>
                                </TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.moneda}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" startIcon={<UilTrash/>} onClick={()=> delAccion(row.id)}>
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