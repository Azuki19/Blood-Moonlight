import './infectedPage.css';
import Menu from '../../components/menu/menu';
import Card from '../../components/card/card';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import socket from '../../socket/socket';

const InfectedPage = () => {
	const navigate = useNavigate();
	const { idCard } = useParams();
	const [players, setPlayers] = useState([]);
	const [selectedVictim, setSelectedVictim] = useState(null);

	const playerId = localStorage.getItem('playerId');
	const roomId = localStorage.getItem('roomId');
	const ronda = Number(localStorage.getItem('ronda'));

	useEffect(() => {
		const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
		setPlayers(storedPlayers.filter((p) => p.id !== playerId));

		const handleRoomUpdate = (updatedPlayers) => {
			localStorage.setItem('players', JSON.stringify(updatedPlayers));
			const myPlayer = updatedPlayers.find((p) => p.id === playerId);
			if (myPlayer) {
				localStorage.setItem('player', JSON.stringify(myPlayer));
			}
			setPlayers(updatedPlayers.filter((p) => p.id !== playerId));
		};

		const handlePlayerInfected = ({ sourceId, targetId, updatedPlayers }) => {
			localStorage.setItem('players', JSON.stringify(updatedPlayers));
			const myPlayer = updatedPlayers.find((p) => p.id === playerId);
			if (myPlayer) {
				localStorage.setItem('player', JSON.stringify(myPlayer));
			}
			setPlayers(updatedPlayers.filter((p) => p.id !== playerId));
			if (sourceId === playerId) {
				navigate(`/detalle-carta/${idCard}`);
			}
		};

		socket.on('roomUpdate', handleRoomUpdate);
		socket.on('playerInfected', handlePlayerInfected);

		return () => {
			socket.off('roomUpdate', handleRoomUpdate);
			socket.off('playerInfected', handlePlayerInfected);
		};
	}, [playerId, idCard, navigate]);

	const handleInfect = () => {
		if (!selectedVictim) return alert('Selecciona un jugador primero');
		let points = 7;
		if (ronda >= 8) points = 10;
		if (ronda >= 12) points = 15;
		if (ronda >= 16) points = 18;
		socket.emit('infectPlayer', {
			roomId,
			sourceId: playerId,
			targetId: selectedVictim.id,
			points,
		});
	};

	return (
		<div className='page'>
			<SectionHeader
				title='INFECCIÓN'
				description='Selecciona al jugador que quieres infectar. Los puntos dependen de la ronda.'
			/>
			<div className='infected-grid'>
				{players.map((p) => (
					<Card
						key={p.id}
						imageSrc={p.image || '/images/default-avatar.png'}
						text={`${p.name} (${p.points} pts)`}
						selected={selectedVictim?.id === p.id}
						onClick={() => setSelectedVictim(p)}
					/>
				))}
			</div>
			<div className='infected-buttons'>
				<button className='back-btn' onClick={() => navigate(`/detalle-carta/${idCard}`)}>
					← Volver
				</button>
				<button className='pull-btn' onClick={handleInfect}>
					¡INFECTAR!
				</button>
			</div>
			<Menu />
		</div>
	);
};

export default InfectedPage;
