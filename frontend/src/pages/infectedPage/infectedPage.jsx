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
	const [lastPoints, setLastPoints] = useState(0);

	const playerData = JSON.parse(localStorage.getItem('playerData') || '{}');
	const playerId = playerData?.playerId;
	const roomId = playerData?.roomId;
	const ronda = playerData?.ronda || 1;

	useEffect(() => {
		if (!roomId || !playerId) return navigate('/');

		socket.emit('getRoomState', { roomId }, (room) => {
			if (!room) return;

			const me = room.players.find((p) => p.id === playerId);
			if (!me) return;

			const otherPlayers = room.players.filter((p) => p.id !== playerId && p.alive && p.selectedMap === me.selectedMap);

			setPlayers(otherPlayers);
			localStorage.setItem('players', JSON.stringify(room.players));
		});

		const handleRoomUpdate = (updatedPlayers) => {
			const me = updatedPlayers.find((p) => p.id === playerId);
			if (!me) return;

			const otherPlayers = updatedPlayers.filter(
				(p) => p.id !== playerId && p.alive && p.selectedMap === me.selectedMap
			);

			setPlayers(otherPlayers);
			localStorage.setItem('players', JSON.stringify(updatedPlayers));

			localStorage.setItem('playerData', JSON.stringify({ ...playerData, ...me }));
		};

		const handlePlayerInfected = ({ sourceId, targetId, updatedPlayers }) => {
			const otherPlayers = updatedPlayers.filter((p) => p.id !== playerId && p.alive);
			setPlayers(otherPlayers);
			localStorage.setItem('players', JSON.stringify(updatedPlayers));

			const myPlayer = updatedPlayers.find((p) => p.id === playerId);
			if (myPlayer) localStorage.setItem('playerData', JSON.stringify({ ...playerData, ...myPlayer }));

			if (sourceId === playerId) {
				const victim = updatedPlayers.find((p) => p.id === targetId);
				navigate(`/detalle-carta/${idCard}`, {
					state: {
						infectedVictim: victim?.name,
						infectedPoints: lastPoints,
					},
				});
			}
		};

		socket.on('roomUpdate', handleRoomUpdate);
		socket.on('playerInfected', handlePlayerInfected);

		return () => {
			socket.off('roomUpdate', handleRoomUpdate);
			socket.off('playerInfected', handlePlayerInfected);
		};
	}, [playerId, roomId, idCard, navigate, playerData, lastPoints]);

	const handleInfect = () => {
		if (!selectedVictim) return alert('Selecciona un jugador primero');
		let points = 7;
		if (ronda >= 8) points = 10;
		if (ronda >= 12) points = 15;
		if (ronda >= 16) points = 18;

		setLastPoints(points);

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
