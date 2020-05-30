connected = false

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
.then(stream => {
    const peer = new SimplePeer({
        initiator: location.hash === '#iniciar',
        trickle: false,
        stream: stream
    })
    
    peer.on('error', error => console.error('error', error))
    
    const socket = io('http://localhost:3000')
    
    peer.on('signal', data => {
        socket.emit('seuId', JSON.stringify(data))

        console.log('Solicitação de conexão', socket.id)

        let seuId = document.querySelector('#seuId')
        seuId.textContent = JSON.stringify(data)
    })
    
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault()
        
        let idParceiro = document.querySelector('#idParceiro')
        peer.signal(JSON.parse(idParceiro.value))
    })
    
    peer.on('connect', () => {
        console.log('Conectado')
        connected = true
        peer.send('whatever' + Math.random())
    })
    
    peer.on('stream', stream => {
        let videoRemoto = document.querySelector('#remoto')
        videoRemoto.srcObject = stream
        videoRemoto.play()
    })

    let videoLocal = document.querySelector('#local')
    videoLocal.srcObject = stream
    videoLocal.play()
})
.catch(error => {
    console.error('error', error)
})