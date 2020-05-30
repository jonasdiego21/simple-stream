const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('.'))
app.get('/', (request, response) => {
    response.send(path.resolve('index.html'))
})

app.listen(3000)