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
	const [infectedThisTurn, setInfectedThisTurn] = useState(false);
	const [player, setPlayer] = useState(null);

	const playerId = localStorage.getItem('playerId');
	const roomId = localStorage.getItem('roomId');

	useEffect(() => {
		const flag = localStorage.getItem(`infected-${idCard}`);
		setInfectedThisTurn(flag === 'true');

		socket.emit('getPlayerInfo', { roomId, playerId }, (response) => {
			if (response.error) {
				console.error(response.error);
				return;
			}
			setPlayer(response.player);
			localStorage.setItem('player', JSON.stringify(response.player));
		});

		const handleRoomUpdate = (updatedPlayers) => {
			localStorage.setItem('players', JSON.stringify(updatedPlayers));
			const myPlayer = updatedPlayers.find((p) => p.id === playerId);
			if (myPlayer) {
				localStorage.setItem('player', JSON.stringify(myPlayer));
				setPlayer(myPlayer);
			}
		};

		const handlePlayerInfected = ({ targetId, updatedPlayers }) => {
			if (targetId === playerId) {
				const myPlayer = updatedPlayers.find((p) => p.id === playerId);
				if (myPlayer) {
					localStorage.setItem('player', JSON.stringify(myPlayer));
					setPlayer(myPlayer);
				}
			}
		};

		socket.on('roomUpdate', handleRoomUpdate);
		socket.on('playerInfected', handlePlayerInfected);

		return () => {
			socket.off('roomUpdate', handleRoomUpdate);
			socket.off('playerInfected', handlePlayerInfected);
		};
	}, [idCard, playerId, roomId]);

	const card = cardData.find((card) => card.id.toString() === idCard);

	if (!card) {
		return <div className='page'>Carta no encontrada</div>;
	}

	const handleObtain = () => {
		if (!player) return;
		const points = parseInt(card.points.replace(/[^\d-]/g, ''));
		console.log('Puntos a obtener:', points);
		socket.emit('updatePoints', {
			roomId,
			playerId,
			points,
		});
		navigate('/maps');
	};

	const handleInfect = () => {
		navigate(`/infected/${idCard}`);
	};

	const ronda = Number(localStorage.getItem('ronda'));
	const isInfectedVampire = player?.role === 'Vampiro infectado';

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
				<button className='start-button' onClick={handleObtain}>
					Obtener
				</button>
				{!infectedThisTurn && isInfectedVampire && ronda >= 2 && (
					<button className='infect-button' onClick={handleInfect}>
						Infectar
					</button>
				)}
			</div>

			<Menu />
		</div>
	);
};

export default DetailCard;
