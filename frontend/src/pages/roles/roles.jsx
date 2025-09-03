import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './roles.css';
import PlayerCard from '../../components/playerCard/playerCard';
import socket from '../../socket/socket';
import { useNavigate } from 'react-router-dom';

function RolesPage() {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState(null);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		socket.emit('createRoom', ({ roomId, player }) => {
			setRoomId(roomId);

			const playerData = {
				playerId: player.id,
				roomId,
				name: player.name,
				rol: 'vampiro normal',
				ronda: 1,
				alive: true,
				turnOrder: 1,
			};
			localStorage.setItem('playerData', JSON.stringify(playerData));
			setPlayers([player]);
		});

		socket.on('roomUpdate', (updatedPlayers) => setPlayers(updatedPlayers));

		socket.on('gameStarted', ({ players }) => {
			navigate('/ronda', { replace: true, state: { roomId, players } });
		});

		return () => {
			socket.off('roomUpdate');
			socket.off('gameStarted');
		};
	}, [navigate]);

	const handleStart = () => {
		if (roomId) socket.emit('startGame', roomId);
	};

	console.log(process.env.REACT_APP_FRONTED_URL);
	console.log(process.env.REACT_APP_BACKEND_URL);

	return (
		<div className='page roles-page'>
			<h1 className='roles-title'>Blood Moonlight</h1>

			<div className='roles-qr'>
				{roomId && (
					<QRCodeCanvas
						value={`${process.env.REACT_APP_FRONTED_URL}/unirse/${roomId}`}
						size={200}
						bgColor='#ffffff'
						fgColor='#000000'
					/>
				)}
			</div>

			<p className='roles-room-id'>
				ID de sala: <span>{roomId}</span>
			</p>
			<p className='roles-text'>Los jugadores deben escanear el código QR para unirse a la sala.</p>
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
