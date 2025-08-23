import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './roles.css';
import PlayerCard from '../../components/playerCard/playerCard';
import socket from '../../socket/socket';

function RolesPage() {
	const [roomId, setRoomId] = useState(null);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		socket.emit('createRoom', ({ roomId, player }) => {
			setRoomId(roomId);
			localStorage.setItem('player', JSON.stringify(player));
			localStorage.setItem('playerId', player.id);
			localStorage.setItem('roomId', roomId);
			localStorage.setItem('playerName', player.name);
			localStorage.setItem('ronda', '1');
			localStorage.setItem('rol', 'vampiro normal');
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
	}, []);

	const handleStart = () => {
		socket.emit('startGame', roomId);
	};

	return (
		<div className='page roles-page'>
			<h1 className='roles-title'>Blood Moonlight</h1>

			<div className='roles-qr'>
				{roomId && (
					<>
						<QRCodeCanvas
							value={`http://localhost:3000/join/${roomId}}`}
							size={200}
							bgColor='#ffffff'
							fgColor='#000000'
						/>
					</>
				)}
			</div>
			<p className='roles-room-id'>
				ID de sala: <span>{roomId}</span>
			</p>

			<p className='roles-text'>Escanea el QR para unirte a la sala.</p>
			<p className='roles-players-count'>JUGADORES: {players.length} / 8</p>

			<div className='roles-players'>
				{players.map((player, index) => (
					<PlayerCard key={player.id} position={index + 1} name={player.name} />
				))}
			</div>

			<button className='start-button' onClick={handleStart} disabled={players.length < 3}>
				Iniciar Juego
			</button>
		</div>
	);
}

export default RolesPage;
