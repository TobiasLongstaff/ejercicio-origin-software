import React, { useEffect, useState } from 'react'
import './navegacion.css'
import { Link } from 'react-router-dom'
import { UilSignout, UilAngleLeft } from '@iconscout/react-unicons'
// import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { Button} from '@mui/material'
import Cookies from 'universal-cookie'

const cookie = new Cookies

const Navigation = ({titulo, volver}) =>
{
    const [botonVolver, setVolver] = useState(null)
    let navigate = useNavigate();

    useEffect(() =>
    {
        if(volver != null)
        {
            setVolver(
                <Link to={volver}>
                    <Button component="span">
                        <UilAngleLeft size="32"/>
                    </Button>
                </Link>
            )
        }
    },[])

    const handelClick = () =>
    {
        Swal.fire(
        {
            title: '¿Cerrar Sesión?',
            text: "¿Estás seguro que queres cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4255d4',
            cancelButtonColor: '#de1c47',
            confirmButtonText: 'Cerrar Sesión'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                cookie.remove('hashSession')
                cookie.remove('nombre')
                cookie.remove('mail')
                navigate('/')
            }
        })
    }

    return (
        <nav>
            <header className="container-header-nav">
                {botonVolver}
                <h1>{titulo}</h1>
                <label>Usuario: {cookie.get('nombre')}</label>
            </header>
            <main className="container-controles-nav">
                <div>
                    <Button component="span" onClick={()=>handelClick()}>
                        <UilSignout size="30"/>
                    </Button>
                </div>
            </main>
        </nav>
    )
}

export default Navigation