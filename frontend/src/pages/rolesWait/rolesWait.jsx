import React, { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import PlayerCard from '../../components/playerCard/playerCard';
import './rolesWait.css';

function RolesWaitPage() {
	const [players, setPlayers] = useState([]);
	const roomId = localStorage.getItem('roomId');
	const playerId = localStorage.getItem('playerId');

	useEffect(() => {
		socket.emit('getRoomState', roomId, (room) => {
			if (room) {
				setPlayers(room.players);

				const stillInRoom = room.players.find((p) => p.id === playerId);
				if (!stillInRoom) {
					localStorage.clear();
					window.location.href = '/';
				}
			}
		});

		socket.on('roomUpdate', (updatedPlayers) => {
			setPlayers(updatedPlayers);
		});

		socket.on('gameStarted', () => {
			localStorage.setItem('inGame', 'true');
			window.location.href = '/profile';
		});

		return () => {
			socket.off('roomUpdate');
			socket.off('gameStarted');
		};
	}, [roomId, playerId]);

	return (
		<div className='page roles-wait-page'>
			<h1 className='roles-wait-title'>Esperando jugadores...</h1>
			<p className='roles-room-id'>
				ID de sala: <span>{roomId}</span>
			</p>
			<p className='roles-players-count'>JUGADORES: {players.length} / 8</p>

			<div className='roles-players'>
				{players.map((player, index) => (
					<PlayerCard key={player.id} position={index + 1} name={player.name} />
				))}
			</div>
		</div>
	);
}

export default RolesWaitPage;
