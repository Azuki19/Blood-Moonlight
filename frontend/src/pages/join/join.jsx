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
			localStorage.setItem('player', JSON.stringify(player));
			localStorage.setItem('playerId', player.id);
			localStorage.setItem('roomId', roomId);
			localStorage.setItem('playerName', player.name);
			localStorage.setItem('ronda', '1');
			localStorage.setItem('rol', 'vampiro normal');

			navigate('/roles-wait');
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
					className='join-input'
					type='text'
					placeholder='Escribe tu nombre...'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<button className='join-button' onClick={handleJoin}>
					Unirme
				</button>
			</div>
		</div>
	);
}

export default JoinPage;
