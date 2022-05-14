import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Button, Alert } from '@mui/material'
import { useUser } from '../hooks/useUser'

const Login = () =>
{
    const { login, error } = useUser()
    const [ form, setForm ] = useState(
    {
        email: '',
        password: '',
    })

    const handelSubmit = e =>
    {
        e.preventDefault()
        login(form)
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article>
            <main className="container-box">
                <form className="box" onSubmit={handelSubmit}>
                    <header className="container-title">
                        <h2>Iniciar sesión</h2>
                    </header>
                    <main className="container-input">
                        <TextField sx={{ width: 400 }} type="email" name="email" label="E-mail" variant="outlined" onChange={handelChange} required/>
                        <TextField sx={{ width: 400 }} type="password" name="password" label="Contraseña" variant="outlined" onChange={handelChange} required/>
                    </main>
                    {error ? 
                        <Alert severity="error">{error}</Alert>
                        :
                        <></>
                    }
                    <div className="container-btn">
                        <Button sx={{ width: 195 }} type="submit" variant="contained">Iniciar sesión</Button>
                        <Link to="/registro">
                            <Button sx={{ width: 195, height: 50 }} variant="outlined">Crear Cuenta</Button>
                        </Link>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Login