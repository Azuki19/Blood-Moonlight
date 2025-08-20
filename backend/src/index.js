const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: '*' },
});

io.on('connection', (sockets) => {
	console.log('Nuevo cliente conectado', socket.id);
});
server.listen(4000, () => {
	console.log('Servidor corriendo en http://localhost:4000');
});
