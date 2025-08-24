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
	const [isWinner, setIsWinner] = useState(false);
	const [players, setPlayers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const playerId = localStorage.getItem('playerId');
		const roomId = localStorage.getItem('roomId');

		const votingRounds = [4, 8, 12, 16];
		const navigateToPullIfVotingRound = (round) => {
			if (votingRounds.includes(round)) {
				navigate('/pull');
			}
		};

		const updateStatesFromPlayers = (playersList, currentTurn, round) => {
			setPlayers(playersList);
			localStorage.setItem('players', JSON.stringify(playersList));

			const me = playersList.find((p) => p.id === playerId);
			const alivePlayers = playersList.filter((p) => p.points > 0);

			if (!me || me.points <= 0) {
				setIsGameOver(true);
				setIsMyTurn(false);
				setIsWinner(false);
				return;
			}

			if (alivePlayers.length === 1 && alivePlayers[0].id === playerId) {
				setIsWinner(true);
				setIsMyTurn(false);
				setIsGameOver(false);
				return;
			}

			setIsMyTurn(me.turnOrder === currentTurn && !me.endedTurn);
			setIsGameOver(false);
			setIsWinner(false);

			navigateToPullIfVotingRound(round);
		};

		socket.emit('getRoomInfo', { roomId }, (room) => {
			if (!room || room.error) return;
			const playersList = room.players || [];
			const currentTurn = room.currentTurn || 1;
			const round = room.round || 1;

			localStorage.setItem('currentTurn', currentTurn);
			localStorage.setItem('ronda', round);

			updateStatesFromPlayers(playersList, currentTurn, round);
		});

		const handleTurnUpdate = ({ currentTurn, players: updatedPlayers }) => {
			setPlayers(updatedPlayers);
			localStorage.setItem('currentTurn', currentTurn);
			const me = updatedPlayers.find((p) => p.id === playerId);
			setIsMyTurn(me?.turnOrder === currentTurn && !me?.endedTurn);
		};

		const handleRoundUpdate = ({ round }) => {
			localStorage.setItem('ronda', round);
			const playersList = JSON.parse(localStorage.getItem('players')) || [];
			const currentTurn = Number(localStorage.getItem('currentTurn') || 1);

			const resetPlayers = playersList.map((p) => ({ ...p, endedTurn: false }));
			updateStatesFromPlayers(resetPlayers, currentTurn, round);
			console.log('➡ Nueva ronda:', round);
		};

		const handleRoomUpdate = (updatedPlayers) => {
			const currentTurn = Number(localStorage.getItem('currentTurn') || 1);
			const round = Number(localStorage.getItem('ronda') || 1);
			updateStatesFromPlayers(updatedPlayers, currentTurn, round);
		};

		const handlePlayerGameOver = () => {
			setIsGameOver(true);
			setIsMyTurn(false);
			setIsWinner(false);
		};

		const handlePlayerWinner = () => {
			setIsWinner(true);
			setIsMyTurn(false);
			setIsGameOver(false);
		};

		socket.on('turnUpdated', handleTurnUpdate);
		socket.on('roundUpdated', handleRoundUpdate);
		socket.on('roomUpdate', handleRoomUpdate);
		socket.on('playerGameOver', handlePlayerGameOver);
		socket.on('playerWinner', handlePlayerWinner);

		return () => {
			socket.off('turnUpdated', handleTurnUpdate);
			socket.off('roundUpdated', handleRoundUpdate);
			socket.off('roomUpdate', handleRoomUpdate);
			socket.off('playerGameOver', handlePlayerGameOver);
			socket.off('playerWinner', handlePlayerWinner);
		};
	}, [navigate]);

	const handlerScanner = () => {
		if (!isMyTurn || isGameOver || isWinner) return;
		navigate(`/detailCard/${cardNumber}`);
	};

	console.log('Jugadores:', players);

	return (
		<div className='page'>
			<SectionHeader
				title='INGRESA LA CARTA'
				description='Lanza los dados, mueve tu ficha y selecciona la locación en que caíste.'
			/>

			<div className='card-container-wrapper'>
				{isWinner ? (
					<div className='overlay-block game-over'>🎉 ¡HAS GANADO! 🎉</div>
				) : isGameOver ? (
					<div className='overlay-block game-over'>GAME OVER</div>
				) : !isMyTurn ? (
					<div className='overlay-block'>Esperando tu turno...</div>
				) : null}

				<div className='card-container'>
					{isMyTurn && !isGameOver && !isWinner && (
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
