import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import AccionesFavoritas from '../pages/AccionesFavoritas'
import DataAccion from '../pages/DataAccion'

function Rutas() 
{

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/registro" element={<Registro/>} />
                <Route exact path="/mis-acciones" element={<AccionesFavoritas/>} />
                <Route exact path="/data-accion/:id" element={<DataAccion/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas
