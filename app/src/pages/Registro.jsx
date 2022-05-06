import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { url } from '../services/Settings'
import { TextField, Button, Alert } from '@mui/material'

const Registro = () =>
{
    const [ form, setForm ] = useState(
    {
        nombre: '',
        email: '',
        password: '',
        password_con: ''
    })
    const [ error, setError ] = useState(null)

    const handelRegistro = async e =>
    {
        e.preventDefault()

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
                body: JSON.stringify(form)
            }
            Swal.fire('Creando Cuenta')
            Swal.showLoading()
            let res = await fetch(url+'registro', config)
            let infoPost = await res.json()
            if(infoPost.serverStatus == 2)
            {
                Swal.fire(
                    'Cuenta creada exitosamente',
                    '',
                    'success'
                )
                setForm({         
                    nombre: '',
                    email: '',
                    password: '',
                    password_con: '' 
                });
            }
            else
            {
                
                setError(infoPost.error)
            }
        }
        catch (error)
        {
            console.error(error)
            setError('Error al registrarte intentar mas tarde')
        }
        Swal.close()
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