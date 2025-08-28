import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './join.css';
import socket from '../../socket/socket';

function JoinPage() {
	const { roomId } = useParams();
	const navigate = useNavigate();
	const [name, setName] = useState('');

	const handleJoin = () => {
		if (!name.trim()) return;

		socket.emit('joinRoom', { roomId, name }, (player) => {
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
			navigate('/sala-espera');
		});
	};

	return (
		<div className='page join-page'>
			<div className='join-card'>
				<h2 className='join-title'>Unirse a la sala</h2>
				<p className='join-room'>
					Sala: <span>{roomId}</span>
				</p>
				<input
					type='text'
					placeholder='Escribe tu nombre...'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='join-input'
				/>
				<button className='join-button' onClick={handleJoin}>
					Unirme
				</button>
			</div>
		</div>
	);
}

export default JoinPage;
