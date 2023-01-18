const app = require('./config/server.js')

const server = app.listen(3000, () => {
    console.log('server on')
})
const { Server } = require("socket.io");
const io = new Server(server);
app.set('io', io)
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('desconect')
    })
    socket.on('msgParaServidor', (data)=>{
        //dialogo
        socket.emit('msgParaCliente',{apelido: data.apelido, mensagem: data.mensagem})
        
        socket.broadcast.emit('msgParaCliente',{apelido: data.apelido, mensagem: data.mensagem})
        //participantes 
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participantesParaClientes',{apelido: data.apelido})
    
            socket.broadcast.emit('participantesParaClientes',{apelido: data.apelido})
        }
    })
});
