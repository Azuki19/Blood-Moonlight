import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Menu from '../../components/menu/menu';
import socket from '../../socket/socket';
import './cardPage.css';

const stages = [
	{
		title: 'Síntomas',
		text: 'La enfermedad se incubó en tu cuerpo sin darte cuenta.',
	},
	{
		title: 'Vampiro Sombrío',
		text: '¡Tienes la cepa y puedes propagar! No puedes revelar a nadie tu secreto. - 5 puntos por estar infectado.',
	},
	{ title: 'Enfermo', text: '¡Propaga la cepa o te pondrás peor! -8 puntos.' },
	{
		title: 'Terminal',
		text: 'Es tu última ronda para contagiar, si no lo logras, ¡morirás! -10 puntos.',
	},
];

const CardPage = () => {
	const navigate = useNavigate();
	const [cardNumber, setCardNumber] = useState('');
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [ronda, setRonda] = useState(1);
	const [player, setPlayer] = useState(null);

	const playerData = JSON.parse(localStorage.getItem('playerData') || '{}');
	const playerId = playerData.playerId;
	const roomId = playerData.roomId;

	useEffect(() => {
		if (!playerId || !roomId) {
			navigate('/', { replace: true });
			return;
		}

		socket.emit('getPlayerInfo', { roomId, playerId }, (res) => {
			if (!res.error) {
				setPlayer(res.player);
				localStorage.setItem('playerData', JSON.stringify({ ...playerData, ...res.player }));
			}
			setLoading(false);
		});

		socket.emit('getRoomInfo', { roomId }, (res) => {
			if (res?.round) setRonda(res.round);
		});

		const handleRoomUpdate = (updatedPlayers) => {
			const me = updatedPlayers.find((p) => p.id === playerId);
			if (me) {
				setPlayer(me);
				setRonda(me.ronda || 1);
				localStorage.setItem('playerData', JSON.stringify({ ...playerData, ...me }));
			}
		};

		socket.on('roomUpdate', handleRoomUpdate);
		return () => socket.off('roomUpdate', handleRoomUpdate);
	}, [navigate, playerId, roomId]);

	useEffect(() => {
		if (player?.role === 'vampiro infectado' && ronda > 1) {
			setShowModal(true);
		} else {
			setShowModal(false);
		}
	}, [player, ronda]);

	const handleSubmit = () => {
		if (!cardNumber) return;

		const updatedPlayerData = { ...playerData, cardNumber };
		localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));
		navigate(`/detalle-carta/${cardNumber}`);
	};

	if (loading) return <p>Cargando...</p>;

	return (
		<div className='page'>
			<SectionHeader
				title='INGRESA LA CARTA'
				description='Ingresa el número de tu carta para descubrir lo que el juego tiene preparado.'
			/>

			<div className='card-container-wrapper'>
				<div className='card-container'>
					<input
						type='text'
						className='card-number-input'
						placeholder='Ingresa el número'
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>
					<button className='card-button' onClick={handleSubmit}>
						Escanear
					</button>
					<img className='card-image' src='https://pbs.twimg.com/media/Gz8lVZxWkAAM48M?format=jpg&name=medium' alt='' />
				</div>
			</div>

			{showModal && (
				<div className='modal-overlay'>
					<div className='modal-content'>
						<button className='modal-close' onClick={() => setShowModal(false)}>
							×
						</button>
						<h2>¡Eres el Vampiro Sombrío!</h2>
						<p>
							¡Debes deshacerte de la cepa lo antes posible! Para contagiar a otro vampiro, ambos deben estar en la
							misma localidad.
						</p>
						<ol>
							{stages.map((stage, index) => {
								const currentStage = Math.min(player?.infectionRounds || 0, stages.length - 1);
								const isActive = currentStage === index;

								return (
									<li key={index} className={isActive ? 'active-stage' : ''}>
										{isActive ? <strong>{stage.title}:</strong> : <span>{stage.title}:</span>} {stage.text}
									</li>
								);
							})}
						</ol>
					</div>
				</div>
			)}

			<Menu />
		</div>
	);
};

export default CardPage;
