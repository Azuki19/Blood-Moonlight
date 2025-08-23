import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Menu from '../../components/menu/menu';
import './cardPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket/socket';

const CardPage = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [isMyTurn, setIsMyTurn] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const players = JSON.parse(localStorage.getItem('players'));
		const playerId = localStorage.getItem('playerId');
		const currentTurn = Number(localStorage.getItem('currentTurn'));
		const myTurnFlag = localStorage.getItem('isMyTurn') !== 'false';

		if (players && playerId && currentTurn) {
			const currentPlayer = players.find((p) => p.turnOrder === currentTurn);
			setIsMyTurn(currentPlayer?.id === playerId && myTurnFlag);
		}

		const handleTurnUpdate = ({ currentTurn }) => {
			localStorage.setItem('currentTurn', currentTurn);
			const players = JSON.parse(localStorage.getItem('players'));
			const playerId = localStorage.getItem('playerId');
			const currentPlayer = players.find((p) => p.turnOrder === currentTurn);

			const myTurnFlag = currentPlayer?.id === playerId ? 'true' : 'false';
			localStorage.setItem('isMyTurn', myTurnFlag);

			setIsMyTurn(currentPlayer?.id === playerId && myTurnFlag === 'true');
		};

		const handleRoundUpdate = ({ round }) => {
			localStorage.setItem('ronda', round);
			console.log('➡ Nueva ronda:', round);
		};

		const handleRoomUpdate = (players) => {
			const playerId = localStorage.getItem('playerId');
			const me = players.find((p) => p.id === playerId);

			if (me && me.points <= 0) {
				setIsGameOver(true);
				setIsMyTurn(false);
			}
		};

		socket.on('turnUpdated', handleTurnUpdate);
		socket.on('roundUpdated', handleRoundUpdate);
		socket.on('roomUpdate', handleRoomUpdate);

		return () => {
			socket.off('turnUpdated', handleTurnUpdate);
			socket.off('roundUpdated', handleRoundUpdate);
			socket.off('roomUpdate', handleRoomUpdate);
		};
	}, []);

	const handlerScanner = () => {
		if (!isMyTurn || isGameOver) return;
		navigate(`/detailCard/${cardNumber}`);
	};

	return (
		<div className='page'>
			<SectionHeader
				title='INGRESA LA CARTA'
				description='Lanza los dados, mueve tu ficha y selecciona la locación en que caíste.'
			/>

			<div className='card-container-wrapper'>
				{isGameOver ? (
					<div className='overlay-block game-over'>GAME OVER</div>
				) : !isMyTurn ? (
					<div className='overlay-block'>Esperando tu turno...</div>
				) : null}

				<div className='card-container'>
					{isMyTurn && !isGameOver && (
						<>
							<input
								type='text'
								className='card-number-input'
								placeholder='Ingresa el número'
								value={cardNumber}
								onChange={(e) => setCardNumber(e.target.value)}
							/>
							<button className='card-button' onClick={handlerScanner}>
								Escanear
							</button>
						</>
					)}

					<img className='card-image' src='/images/cardImage.png' alt='' />
					<p className='card-instruction'>
						En el dorso de la carta encontrarás un código, ingrésalo arriba y descubre lo que el juego tiene preparado
						para ti.
					</p>
				</div>
			</div>

			<Menu />
		</div>
	);
};

export default CardPage;
