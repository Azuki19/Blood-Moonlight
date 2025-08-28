import React, { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import PlayerCard from '../../components/playerCard/playerCard';
import './rolesWait.css';
import { useNavigate } from 'react-router-dom';

function RolesWaitPage() {
	const navigate = useNavigate();
	const [players, setPlayers] = useState([]);
	const playerData = JSON.parse(localStorage.getItem('playerData'));

	useEffect(() => {
		if (!playerData?.playerId || !playerData?.roomId) return navigate('/', { replace: true });

		socket.emit('getRoomState', { roomId: playerData.roomId }, (room) => {
			if (!room) return navigate('/', { replace: true });
			setPlayers(room.players);
		});

		socket.on('roomUpdate', (updatedPlayers) => setPlayers(updatedPlayers));
		socket.on('gameStarted', ({ players }) => {
			navigate('/ronda', {
				replace: true,
				state: { roomId: playerData.roomId, players },
			});
		});

		return () => {
			socket.off('roomUpdate');
			socket.off('gameStarted');
		};
	}, [navigate, playerData]);

	return (
		<div className='page roles-wait-page'>
			<h1 className='roles-wait-title'>Esperando jugadores...</h1>
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
