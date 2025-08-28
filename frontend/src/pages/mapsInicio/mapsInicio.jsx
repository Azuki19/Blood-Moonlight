import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Card from '../../components/card/card';
import Menu from '../../components/menu/menu';
import { mapsData } from '../../data/data';
import './mapsInicio.css';
import socket from '../../socket/socket';

const MapsInicioPage = () => {
	const navigate = useNavigate();
	const [selectedCard, setSelectedCard] = useState(null);
	const [players, setPlayers] = useState([]);
	const [currentTurn, setCurrentTurn] = useState(1);
	const [isMyTurn, setIsMyTurn] = useState(false);

	const playerData = JSON.parse(localStorage.getItem('playerData'));

	useEffect(() => {
		if (!playerData?.playerId || !playerData?.roomId) return navigate('/', { replace: true });

		socket.emit('getRoomState', { roomId: playerData.roomId }, (room) => {
			if (!room) return;
			setPlayers(room.players);
			setCurrentTurn(room.currentTurn || 1);

			const me = room.players.find((p) => p.id === playerData.playerId);
			if (me) {
				setIsMyTurn(me.turnOrder === room.currentTurn && me.alive);
				localStorage.setItem(
					'playerData',
					JSON.stringify({
						...playerData,
						turnOrder: me.turnOrder,
						alive: me.alive,
					})
				);
			}
		});

		const handleTurnUpdate = ({ currentTurn, players: updatedPlayers }) => {
			setPlayers(updatedPlayers);
			setCurrentTurn(currentTurn);

			const me = updatedPlayers.find((p) => p.id === playerData.playerId);
			if (me) {
				setIsMyTurn(me.turnOrder === currentTurn && me.alive);
				localStorage.setItem(
					'playerData',
					JSON.stringify({
						...playerData,
						turnOrder: me.turnOrder,
						alive: me.alive,
					})
				);
			}
		};

		const handleRoomUpdate = (updatedPlayers) => setPlayers(updatedPlayers);

		socket.on('turnUpdated', handleTurnUpdate);
		socket.on('roomUpdate', handleRoomUpdate);

		return () => {
			socket.off('turnUpdated', handleTurnUpdate);
			socket.off('roomUpdate', handleRoomUpdate);
		};
	}, [playerData, navigate]);

	const handleSelect = () => {
		if (!isMyTurn || selectedCard === null) return;

		const map = mapsData[selectedCard];

		const updatedPlayerData = { ...playerData, initialMap: map, round: 1 };
		localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));

		socket.emit('mapSelected', {
			roomId: playerData.roomId,
			playerId: playerData.playerId,
			map,
		});

		navigate('/cartas');
	};

	return (
		<div className='page maps-page'>
			<SectionHeader
				title='¿En qué localidad caíste?'
				description='Lanza los dados, mueve tu ficha y selecciona la locación en que caíste.'
			/>

			{!isMyTurn && <div className='overlay-block'>Esperando tu turno...</div>}

			<div className='cards-grid'>
				{mapsData.map((map, index) => (
					<Card
						key={map.id}
						imageSrc={map.image}
						text={map.name}
						selected={selectedCard === index}
						onClick={() => isMyTurn && setSelectedCard(index)}
						disabled={!isMyTurn}
					/>
				))}
			</div>

			{isMyTurn && (
				<button className='maps-btn' onClick={handleSelect} disabled={selectedCard === null}>
					Seleccionar
				</button>
			)}

			<Menu />
		</div>
	);
};

export default MapsInicioPage;
