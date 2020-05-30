const express = require('express')
const path = require('path')

const cors = require('cors')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (request, response) => {
    response.render('index.html')
})

io.on('connection', socket => {
    console.log('connected', socket.id)

    socket.on('seuId', data => {
        console.log('no servidor', data.id)
    })
})

let port = process.env.PORT || 3000
server.listen(port, () => console.log(`Escutando na porta ${port}`))