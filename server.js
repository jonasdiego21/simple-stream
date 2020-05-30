const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 3000

const app = express()
app.use(cors())

app.use(express.static('.'))
app.get('/', (request, response) => {
    response.send(path.resolve('index.html'))
})

app.listen(port, () => console.log(`Escutando na porta ${port}`))