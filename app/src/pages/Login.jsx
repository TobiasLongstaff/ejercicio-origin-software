import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../services/Settings'
import { TextField, Button, Alert } from '@mui/material'
import Cookies from 'universal-cookie'

const cookie = new Cookies

const Login = () =>
{
    let navigate = useNavigate()
    const [ form, setForm ] = useState(
    {
        email: '',
        password: '',
    })
    const [ error, setError ] = useState(null)

    useEffect(() =>
    {
        if(cookie.get('hashSession') != null)
        {
            navigate('/mis-acciones')
        }
    },[])

    const handelSubmit = async e =>
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
            let res = await fetch(url+'login', config)
            let infoPost = await res.json()
            console.log(infoPost)
            // if(typeof infoPost[0].id !== 'undefined')
            if(typeof infoPost.error == 'undefined')
            {
                cookie.set('nombre', infoPost[0].nombre_apellido, {path: '/'})
                cookie.set('mail', form.email, {path: '/'})
                cookie.set('hashSession', infoPost[0].id, {path: '/'})
                navigate('/mis-acciones')
            }
            else
            {
                setError(infoPost.error)
            }
        }
        catch (error)
        {
            setError('Error inesperado intentar mas tarde')
            console.error(error)
        }
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