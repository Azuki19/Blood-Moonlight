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
			alive: true,
			infectionRounds: 0,
			lastSeenRound: 0,
		};

		rooms[roomId] = { players: [hostPlayer], currentTurn: 1, round: 1 };
		socket.join(roomId);
		socket.roomId = roomId;

		if (callback) callback({ roomId, player: hostPlayer });
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
				alive: true,
				infectionRounds: 0,
			};

			rooms[roomId].players.push(player);
			socket.join(roomId);
			socket.roomId = roomId;

			io.to(roomId).emit('roomUpdate', rooms[roomId].players);
			if (callback) callback(player);
		} else {
			console.log(`Sala no existe: ${roomId}`);
		}
	});

	socket.on('startGame', (roomId) => {
		if (rooms[roomId]) {
			const players = rooms[roomId].players;
			const shuffledPlayers = players.sort(() => Math.random() - 0.5);
			const infectedIndex = Math.floor(Math.random() * shuffledPlayers.length);

			shuffledPlayers.forEach((p, i) => {
				p.turnOrder = i + 1;
				p.role = i === infectedIndex ? 'Vampiro infectado' : 'Vampiro común';
				p.infectionRounds = 0;
			});

			rooms[roomId].players = shuffledPlayers;
			rooms[roomId].currentTurn = 1;
			rooms[roomId].round = 1;

			console.log(`El infectado inicial en room ${roomId} es:`, shuffledPlayers[infectedIndex]);

			io.to(roomId).emit('gameStarted', {
				players: shuffledPlayers,
				currentTurn: 1,
			});
			io.to(roomId).emit('roomUpdate', shuffledPlayers);
		}
	});

	socket.on('getPlayerInfo', ({ roomId, playerId }, callback) => {
		const room = rooms[roomId];
		if (!room) return callback({ error: 'Room not found' });
		const player = room.players.find((p) => p.id === playerId);
		if (!player) return callback({ error: 'Player not found' });
		callback({ player });
	});

	socket.on('getRoomState', ({ roomId }, callback) => {
		const room = rooms[roomId];
		if (!room) return callback(null);

		const player = room.players.find((p) => p.id === socket.id);
		if (player && player.lastSeenRound < room.round) {
			io.to(player.id).emit('showRoundPage', { round: room.round });
			player.lastSeenRound = room.round;
		}

		callback(room);
	});

	socket.on('roundUpdated', ({ round }) => {
		const room = rooms[socket.roomId];
		if (!room) return;

		room.players.forEach((player) => {
			if (!player.lastSeenRound || player.lastSeenRound < round) {
				io.to(player.id).emit('showRoundPage', { round });
				player.lastSeenRound = round;
			}
		});
	});

	socket.on('mapSelected', ({ roomId, playerId, map }) => {
		if (!rooms[roomId]) return console.log('Room no existe:', roomId);
		const player = rooms[roomId].players.find((p) => p.id === playerId);
		if (!player) return console.log('Jugador no encontrado:', playerId);
		player.selectedMap = map;
		io.to(player.id).emit('mapConfirmed');
		io.to(roomId).emit('roomUpdate', rooms[roomId].players);
	});

	socket.on('updatePoints', ({ roomId, playerId, points }, callback) => {
		const room = rooms[roomId];
		if (!room) return;

		const player = room.players.find((p) => p.id === playerId);
		if (!player) return;

		player.points += points;

		if (player.points <= 0) {
			player.points = 0;
			player.alive = false;

			io.to(player.id).emit('playerGameOver');

			if (player.role === 'Vampiro infectado') {
				const alivePlayers = room.players.filter((p) => p.alive);
				if (alivePlayers.length > 0) {
					const newInfected = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
					newInfected.role = 'Vampiro infectado';
					newInfected.infectionRounds = 0;
				}
			}

			const alivePlayers = room.players.filter((p) => p.alive);
			if (alivePlayers.length === 1) {
				const winner = alivePlayers[0];
				io.to(roomId).emit('playerWinner', {
					winnerId: winner.id,
					winnerName: winner.name,
				});
			}
		}

		io.to(roomId).emit('roomUpdate', room.players);

		console.log(`Puntos actualizados: ${player.name} ahora tiene ${player.points}`);

		if (callback) callback({ player });
	});

	socket.on('infectPlayer', ({ roomId, sourceId, targetId, points }) => {
		const room = rooms[roomId];
		if (!room) return;
		const sourcePlayer = room.players.find((p) => p.id === sourceId);
		const targetPlayer = room.players.find((p) => p.id === targetId);
		if (!sourcePlayer || !targetPlayer) return;

		console.log(`\n🧾 Antes de la infección en room ${roomId}:`);
		console.table(
			room.players.map((p) => ({
				id: p.id,
				name: p.name,
				points: p.points,
				role: p.role,
				alive: p.alive !== false,
			}))
		);

		targetPlayer.points -= points;
		if (targetPlayer.points <= 0) {
			targetPlayer.points = 0;
			targetPlayer.alive = false;
		}

		sourcePlayer.role = 'Vampiro común';
		targetPlayer.role = 'Vampiro infectado';
		targetPlayer.infectionRounds = 0;

		console.log(`\n🧾 Después de la infección en room ${roomId}:`);
		console.table(
			room.players.map((p) => ({
				id: p.id,
				name: p.name,
				points: p.points,
				role: p.role,
				alive: p.alive !== false,
			}))
		);

		io.to(roomId).emit('playerInfected', {
			sourceId,
			targetId,
			points,
			updatedPlayers: room.players,
		});

		io.to(sourceId).emit('infectionUsed', { used: true });
	});

	socket.on('getRoomInfo', ({ roomId }, callback) => {
		const room = rooms[roomId];
		if (!room) return callback({ error: 'Sala no encontrada' });
		callback({
			round: room.round,
			players: room.players,
		});
	});

	socket.on('startVotingRound', (roomId) => {
		const room = rooms[roomId];
		if (!room) return;
		room.players.forEach((p) => (p.voting = true));
		io.to(roomId).emit('votingRound', {
			players: room.players,
			round: room.round,
		});
	});

	socket.on('submitVote', ({ roomId, voterId, votedPlayerId }) => {
		const room = rooms[roomId];
		if (!room) return;
		const voter = room.players.find((p) => p.id === voterId);
		const votedPlayer = room.players.find((p) => p.id === votedPlayerId);
		if (!voter || !votedPlayer) return;

		voter.vote = votedPlayerId;
		const alivePlayers = room.players.filter((p) => p.alive);
		const allVoted = alivePlayers.every((p) => p.vote !== undefined);
		if (!allVoted) return;

		let infected = room.players.find((p) => p.role === 'Vampiro infectado');
		room.players.forEach((p) => {
			if (p.vote === infected?.id) p.points += 50;
			else p.points -= 50;
			delete p.vote;
			p.voting = false;
		});

		room.players.forEach((p) => {
			if (p.points <= 0) {
				p.points = 0;
				p.alive = false;
			}
			if (p.alive) p.endedTurn = false;
		});

		infected = room.players.find((p) => p.role === 'Vampiro infectado');
		if (!infected) {
			const newInfected = room.players.filter((p) => p.alive);
			if (newInfected.length > 0) {
				const random = newInfected[Math.floor(Math.random() * newInfected.length)];
				random.role = 'Vampiro infectado';
				random.infectionRounds = 0;
				console.log(`Nuevo infectado reasignado en room ${roomId}:`, {
					id: random.id,
					name: random.name,
				});
			}
		}

		room.round = (room.round || 1) + 1;
		const aliveNotEnded = room.players.filter((p) => p.alive && !p.endedTurn);
		room.currentTurn =
			aliveNotEnded.length > 0 ? aliveNotEnded[0].turnOrder : room.players.find((p) => p.alive)?.turnOrder || 1;

		io.to(roomId).emit('roomUpdate', room.players);
		io.to(roomId).emit('roundUpdated', { round: room.round });
		io.to(roomId).emit('turnUpdated', {
			currentTurn: room.currentTurn,
			players: room.players,
		});
		io.to(roomId).emit('votingEnded', {
			players: room.players,
			nextRound: room.round,
		});
	});

	socket.on('endTurn', (roomId) => {
		const room = rooms[roomId];
		if (!room) return;

		const players = room.players;
		const currentPlayer = players.find((p) => p.id === socket.id);
		if (!currentPlayer) return;

		currentPlayer.endedTurn = true;

		const alivePlayers = players.filter((p) => p.alive);
		if (alivePlayers.length === 0) {
			io.to(roomId).emit('gameOver');
			return;
		}

		const unfinished = alivePlayers.filter((p) => !p.endedTurn);

		if (unfinished.length === 0) {
			alivePlayers.forEach((p) => {
				p.endedTurn = false;

				if (p.role === 'Vampiro infectado') {
					p.infectionRounds = (p.infectionRounds || 0) + 1;
					const penalties = [0, -5, -8, -10];
					const pts = penalties[p.infectionRounds] || -10;
					p.points += pts;

					console.log(
						`Ronda ${room.round}: ${p.name} es infectado y recibe penalidad de ${pts} pts (total: ${p.points})`
					);

					// TODO: cambiar a 4 luego
					if (p.infectionRounds >= 3 || p.points <= 0) {
						p.points = 0;
						p.alive = false;
						console.log(`💀 ${p.name} ha muerto por no propagar la infección.`);
						io.to(p.id).emit('playerGameOver');
					}
				}
			});

			const aliveNow = room.players.filter((pl) => pl.alive);
			if (aliveNow.length === 1) {
				const winner = aliveNow[0];
				room.players.forEach((pl) => {
					io.to(pl.id).emit('playerWinner', {
						winnerId: winner.id,
						winnerName: winner.name,
					});
				});
				console.log(`🏆 ${winner.name} ha ganado la partida.`);
				return;
			}

			if (aliveNow.length > 1) {
				const currentInfected = aliveNow.find((p) => p.role === 'Vampiro infectado');
				if (!currentInfected) {
					const newInfected = aliveNow[Math.floor(Math.random() * aliveNow.length)];
					newInfected.role = 'Vampiro infectado';
					newInfected.infectionRounds = 0;
					console.log(`🧛‍♂ Infección reasignada a ${newInfected.name}`);
					io.to(roomId).emit('infectionChanged', {
						newInfectedId: newInfected.id,
						newInfectedName: newInfected.name,
					});
				}
			}

			room.round = (room.round || 1) + 1;
			console.log(`➡ Avanza a ronda ${room.round}`);

			room.players.forEach((player) => {
				if (!player.lastSeenRound || player.lastSeenRound < room.round) {
					io.to(player.id).emit('showRoundPage', { round: room.round });
					player.lastSeenRound = room.round;
				}
			});
		}

		const aliveAfterTurn = room.players.filter((p) => p.alive);
		if (aliveAfterTurn.length > 0) {
			const nextPlayer = aliveAfterTurn.find((p) => !p.endedTurn) || aliveAfterTurn[0];
			room.currentTurn = nextPlayer.turnOrder;

			io.to(roomId).emit('turnUpdated', {
				currentTurn: room.currentTurn,
				players: room.players,
			});

			io.to(roomId).emit('roomUpdate', room.players);
		}
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado', socket.id);
		const roomId = socket.roomId;
		if (roomId && rooms[roomId]) {
			rooms[roomId].players = rooms[roomId].players.filter((p) => p.id !== socket.id);
			io.to(roomId).emit('roomUpdate', rooms[roomId].players);
			if (rooms[roomId].players.length === 0) {
				console.log(`Room eliminada: ${roomId}`);
				delete rooms[roomId];
			}
		}
	});
});

server.listen(4000, () => {
	console.log('Servidor corriendo en http://localhost:4000');
});
