import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'

function Rutas() 
{

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas
