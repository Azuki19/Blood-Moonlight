import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket/socket';
import Card from '../../components/card/card';
import Menu from '../../components/menu/menu';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import toast, { Toaster } from 'react-hot-toast';
import './pull.css';

const PullPage = () => {
	const [players, setPlayers] = useState([]);
	const [votedPlayer, setVotedPlayer] = useState(null);
	const [hasVoted, setHasVoted] = useState(false);
	const [round, setRound] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		const roomId = localStorage.getItem('roomId');

		socket.emit('getRoomInfo', { roomId }, (room) => {
			if (!room) return;
			setRound(room.round ?? 1);
			setPlayers(room.players.filter((p) => p.alive ?? true));
		});

		const handleVotingRound = ({ players, round }) => {
			setRound(round);
			setPlayers(players.filter((p) => p.alive ?? true));
			setHasVoted(false);
			setVotedPlayer(null);
		};

		const handleVotingEnded = ({ nextRound }) => {
			setRound(nextRound);
			toast(`¡Votación terminada! Comienza la ronda ${nextRound}`, {
				duration: 10000,
				position: 'top-right',
				style: { minWidth: '250px' },
			});
			setTimeout(() => navigate('/cartas'), 5000);
		};

		socket.on('votingRound', handleVotingRound);
		socket.on('votingEnded', handleVotingEnded);

		return () => {
			socket.off('votingRound', handleVotingRound);
			socket.off('votingEnded', handleVotingEnded);
		};
	}, [navigate]);

	const handleVote = (targetId) => setVotedPlayer(targetId);

	const submitVote = () => {
		const playerId = localStorage.getItem('playerId');
		if (!votedPlayer) return;

		socket.emit('submitVote', {
			roomId: localStorage.getItem('roomId'),
			voterId: playerId,
			votedPlayerId: votedPlayer,
		});
		setHasVoted(true);
	};

	const votingRounds = [4, 8, 12, 16];
	const isVotingRound = votingRounds.includes(round);

	return (
		<div className='page'>
			<Toaster />
			{!isVotingRound ? (
				<div className='waiting-container'>
					<h2 className='waiting-title'>VOTACIÓN BLOQUEADA</h2>
					<p className='waiting-description'>
						Espera a que sea la ronda de votación. Si tienes sospechas de alguien, habla con tus compañeros vampíricos y
						diríjanse al centro del tablero.
					</p>
					<img src='/images/vampiro.png' alt='Vampiro' className='waiting-image' />
				</div>
			) : (
				<>
					<SectionHeader title='VOTACIÓN' description='Confirma tus sospechas, ¡estaca al vampiro sombrío!' />
					<div className='vote-grid'>
						{players.map((player) => (
							<Card
								key={player.id}
								imageSrc={player.image}
								text={player.name}
								onClick={() => handleVote(player.id)}
								selected={votedPlayer === player.id}
							/>
						))}
					</div>
					<button className='pull-btn' onClick={submitVote} disabled={!votedPlayer || hasVoted}>
						{hasVoted ? 'Esperando a los demás...' : 'Estacar'}
					</button>
				</>
			)}
			<Menu />
		</div>
	);
};

export default PullPage;
