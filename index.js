const express = require ('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

app.use(express.static('threejs'))
app.use(express.static('public'))

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// express | communicate index.html to the server
app.get('/', (req, res) => {
    res.sendFile(__dirname + './public/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');
    // Listening: whenever is a event call message from the client side, do something with it in this case, console log and show (emit) on screen.
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);
        io.emit('message', msg);
    });

    // Parte:2 recibe la posicion de la camara
    socket.on('changePositionMsg', (data) => {
        console.log(`changePositionMsg: ${data}`);

        // Parte 3: envia el mensaje al otro usuario
        io.emit('changePositionMsg', data);
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
        // send to the client that user disconnected
        io.emit('message', 'user disconnected');
    });

    // changeColor(data);

});






