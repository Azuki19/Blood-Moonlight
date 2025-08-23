const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: '*' },
});

let rooms = {};

io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado', socket.id);

	socket.on('createRoom', (callback) => {
		const roomId = Math.random().toString(36).substring(2, 8);
		const hostPlayer = {
			id: socket.id,
			name: 'Jugador Admin',
			points: 20,
			role: 'vampiro común',
			ronda: 1,
			image: '/images/userImage.png',
		};

		rooms[roomId] = { players: [hostPlayer] };
		socket.join(roomId);
		socket.roomId = roomId;

		callback({ roomId, player: hostPlayer });

		io.to(roomId).emit('roomUpdate', rooms[roomId].players);
	});

	socket.on('joinRoom', ({ roomId, name }, callback) => {
		if (rooms[roomId]) {
			const player = {
				id: socket.id,
				name,
				points: 20,
				role: 'vampiro común',
				ronda: 1,
				image: '/images/userImage.png',
			};

			rooms[roomId].players.push(player);
			socket.join(roomId);
			socket.roomId = roomId;

			io.to(roomId).emit('roomUpdate', rooms[roomId].players);

			if (callback) callback(player);
		}
	});

	socket.on('startGame', (roomId) => {
		if (rooms[roomId]) {
			io.to(roomId).emit('gameStarted');
		}
	});

	socket.on('getRoomState', (roomId, callback) => {
		if (rooms[roomId]) {
			callback(rooms[roomId]);
		} else {
			callback(null);
		}
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado', socket.id);
		const roomId = socket.roomId;
		if (roomId && rooms[roomId]) {
			rooms[roomId].players = rooms[roomId].players.filter((p) => p.id !== socket.id);
			io.to(roomId).emit('roomUpdate', rooms[roomId].players);
			if (rooms[roomId].players.length === 0) {
				delete rooms[roomId];
			}
		}
	});
});

server.listen(4000, () => {
	console.log('Servidor corriendo en http://localhost:4000');
});
