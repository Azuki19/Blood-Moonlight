import { useParams, useNavigate } from 'react-router-dom';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Menu from '../../components/menu/menu';
import './detailCard.css';
import { cardData } from '../../data/data';
import { useEffect, useState } from 'react';
import socket from '../../socket/socket';

const DetailCard = () => {
	const { idCard } = useParams();
	const navigate = useNavigate();
	const [player, setPlayer] = useState(null);
	const [ronda, setRonda] = useState(1);

	const playerData = JSON.parse(localStorage.getItem('playerData') || '{}');
	const playerId = playerData?.playerId;
	const roomId = playerData?.roomId;

	useEffect(() => {
		if (!playerId || !roomId) return navigate('/', { replace: true });

		socket.emit('getPlayerInfo', { roomId, playerId }, (res) => {
			if (!res.error) setPlayer(res.player);
		});

		socket.emit('getRoomInfo', { roomId }, (res) => {
			if (res?.round) setRonda(res.round);
		});

		const handleRoomUpdate = (updatedPlayers) => {
			const me = updatedPlayers.find((p) => p.id === playerId);
			if (me) {
				setPlayer(me);
				localStorage.setItem('playerData', JSON.stringify({ ...playerData, ...me }));
			}
		};

		socket.on('roomUpdate', handleRoomUpdate);
		return () => socket.off('roomUpdate', handleRoomUpdate);
	}, [playerId, roomId, navigate]);

	const card = cardData.find((c) => c.id.toString() === idCard);
	if (!card) return <div className='page'>Carta no encontrada</div>;
	if (!player) return <div className='page'>Cargando perfil...</div>;

	const handleObtain = () => {
		const points = parseInt(card.points.replace(/[^\d-]/g, ''));
		socket.emit('updatePoints', { roomId, playerId, points });
		const updatedPlayerData = {
			...playerData,
			points: (player.points || 0) + points,
		};
		localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));
		navigate('/mapa-fin');
	};

	const isInfectedVampire = player.role === 'Vampiro infectado';

	const handleInfect = () => {
		navigate(`/infectar/${idCard}`);
	};

	return (
		<div className='page'>
			<SectionHeader title={`Carta ${idCard}`} description='' />
			<div className='detail-card'>
				<h2 className='detail-title'>{card.title}</h2>
				<p className='detail-description'>{card.description}</p>
				<img src={card.image} alt={card.title} />
				<p className='detail-points'>{card.points}</p>
			</div>

			<div className='detail-buttons'>
				<button className='maps-btn' onClick={handleObtain}>
					Obtener
				</button>
				{isInfectedVampire && ronda >= 2 && (
					<button className='maps-btn' onClick={handleInfect}>
						Infectar
					</button>
				)}
			</div>

			<Menu />
		</div>
	);
};

export default DetailCard;
