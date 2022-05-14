import React from 'react'
import { CircularProgress } from '@mui/material'
import './loading.css'

const Loading = () =>
{
    return(
        <article className="container-loading">
            <CircularProgress />
        </article>
    )
}

export default Loading