import React from 'react'
import './navegacion.css'
import { Link } from 'react-router-dom'
import { UilSignout, UilAngleLeft } from '@iconscout/react-unicons'
import { Button } from '@mui/material'
import Cookies from 'universal-cookie'
import { useUser } from '../../hooks/useUser'

const cookie = new Cookies

const Navigation = ({titulo, volver}) =>
{
    const { clsSesion } = useUser()

    return (
        <nav>
            <header className="container-header-nav">
                {(volver != null) ?                
                    <Link to={volver}>
                        <Button component="span">
                            <UilAngleLeft size="32"/>
                        </Button>
                    </Link>: <></>}
                <h1>{titulo}</h1>
                <label>Usuario: {cookie.get('nombre')}</label>
            </header>
            <main className="container-controles-nav">
                <div>
                    <Button component="span" onClick={()=>clsSesion()}>
                        <UilSignout size="30"/>
                    </Button>
                </div>
            </main>
        </nav>
    )
}

export default Navigation