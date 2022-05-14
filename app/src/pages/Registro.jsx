import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Button, Alert } from '@mui/material'
import { useUser } from '../hooks/useUser'

const Registro = () =>
{
    const { registro, error } = useUser()
    const [ form, setForm ] = useState(
    {
        nombre: '',
        email: '',
        password: '',
        password_con: ''
    })

    const handelRegistro = e =>
    {
        e.preventDefault()
        registro(form)
        setForm({         
            nombre: '',
            email: '',
            password: '',
            password_con: '' 
        });
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
                <form className="box" onSubmit={handelRegistro}>
                    <header className="container-title">
                        <h2>Crear Cuenta</h2>
                    </header>
                    <main className="container-input">
                        <TextField sx={{ width: 400 }} type="text" value={form.nombre} name="nombre" label="Nombre Apellido" variant="outlined" onChange={handelChange} required/>
                        <TextField sx={{ width: 400 }} type="email" value={form.email} name="email" label="E-Mail" variant="outlined" onChange={handelChange} required/>
                        <TextField sx={{ width: 400 }} type="password" value={form.password} name="password" label="Contraseña" variant="outlined" onChange={handelChange} required/>
                        <TextField sx={{ width: 400 }} type="password" value={form.password_con} name="password_con" label="Contraseña" variant="outlined" onChange={handelChange} required/>
                    </main>
                    {error ? 
                        <Alert severity="error">{error}</Alert>
                        :
                        <></>
                    }
                    <div className="container-btn">
                        <Button sx={{ width: 195 }} type="submit" variant="contained">Crear Cuenta</Button>
                        <Link to="/">
                            <Button sx={{ width: 195, height: 50 }} variant="outlined">Volver</Button>
                        </Link>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Registro