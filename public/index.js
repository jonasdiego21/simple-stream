navigator.mediaDevices.getUserMedia({ video: true, audio: false })
.then(stream => {
    const peer = new SimplePeer({
        initiator: location.hash === '#iniciar',
        trickle: false,
        stream: stream
    })
    
    peer.on('error', error => console.error('error', error))
    
    peer.on('signal', data => {
        let seuId = document.querySelector('#seuId')
        seuId.textContent = JSON.stringify(data)

        let socket = io('http://localhost:3000/#iniciar')
        socket.emit('seuId', JSON.stringify(data))
        console.log('no cliente', seuId.textContent)
    })
    
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault()
        let idParceiro = document.querySelector('#idParceiro')
        peer.signal(JSON.parse(idParceiro.value))
    })
    
    peer.on('connect', () => {
        console.log('connected')
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