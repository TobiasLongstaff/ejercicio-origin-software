import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { url } from '../services/Settings'
import Cookies from 'universal-cookie'

const cookie = new Cookies

export const useUser = () =>
{
    let navigate = useNavigate()
    const [ error , setError ] = useState(null)

    const registro = async (form) =>
    {
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
            }
            else
            {
                
                setError(infoPost.error)
                Swal.close()
            }
        }
        catch (error)
        {
            console.error(error)
            setError('Error al registrarte intentar mas tarde')
            Swal.close()
        }
    }

    const login = async (form) =>
    {
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
    
    const clsSesion = () =>
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

    return { registro, login, clsSesion, error }
}