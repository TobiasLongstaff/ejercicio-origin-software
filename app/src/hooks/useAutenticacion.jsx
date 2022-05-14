import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const cookie = new Cookies

export const useAutenticacion = () =>
{
    let navigate = useNavigate()
    const [autenticacion, setAutenticacion] = useState(false)

    useEffect(() =>
    {
        (cookie.get('hashSession') == null) ? navigate('/') : setAutenticacion(true) 
    },[])

    return { autenticacion }
}