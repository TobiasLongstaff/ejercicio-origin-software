import React, { useEffect, useState } from 'react'
import './navegacion.css'
import { Link } from 'react-router-dom'
import { UilSignout, UilAngleLeft } from '@iconscout/react-unicons'
// import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { motion } from 'framer-motion'
import { Button} from '@mui/material'

// const cookies = new Cookies

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
                    <motion.button
                        whileHover={{ backgroundColor: '#e7e8ea', color: '#0e0e23'}}
                        whileTap={{ scale: 0.9 }}
                        className="btn-nav-general-volver">
                        <UilAngleLeft size="32"/>
                    </motion.button>
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
                // cookies.remove('hashSession')
                // cookies.remove('nombre')
                // cookies.remove('mail')
                navigate('/')
            }
        })
    }

    const variants = 
    {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    return (
        <nav>
            <header className="container-header-nav">
                {botonVolver}
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={variants}>
                    {titulo}
                </motion.h1>
            </header>
            <main className="container-controles-nav">
                <div>
                    <Button component="span">
                        <UilSignout size="30"/>
                    </Button>
                </div>
            </main>
        </nav>
    )
}

export default Navigation