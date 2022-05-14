const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json())

app.use(require('./routes/usuarios'))
app.use(require('./routes/favoritos'))

app.get('/', (request, response) => 
{
    response.status(404)
})

app.listen(3001, () =>
{
    console.log('Servidor en puerto 3001...')
})