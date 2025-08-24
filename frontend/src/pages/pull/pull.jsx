import './pull.css';
import Menu from '../../components/menu/menu';
import Card from '../../components/card/card';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const PullPage = () => {
	const [players, setPlayers] = useState([]);
	const [votedPlayer, setVotedPlayer] = useState(null);
	const [hasVoted, setHasVoted] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const roomId = localStorage.getItem('roomId');

		socket.emit('getRoomInfo', { roomId }, (room) => {
			if (!room || !room.players) return;
			const alivePlayers = room.players.filter((p) => (p.points ?? 0) > 0 && (p.alive ?? true));
			setPlayers(alivePlayers);
		});

		const handleVotingRound = ({ players }) => {
			const alivePlayers = players.filter((p) => (p.points ?? 0) > 0 && (p.alive ?? true));
			setPlayers(alivePlayers);
			setHasVoted(false);
			setVotedPlayer(null);
		};

		const handleVotingEnded = ({ nextRound }) => {
			toast(`¡Votación terminada! Comienza la ronda ${nextRound}`, {
				duration: 10000,
				position: 'top-right',
				style: { minWidth: '250px' },
			});

			setTimeout(() => {
				navigate('/cards');
			}, 5000);
		};

		socket.on('votingRound', handleVotingRound);
		socket.on('votingEnded', handleVotingEnded);

		return () => {
			socket.off('votingRound', handleVotingRound);
			socket.off('votingEnded', handleVotingEnded);
		};
	}, [navigate]);

	const handleVote = (targetId) => {
		setVotedPlayer(targetId);
	};

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

	console.log('Jugadores en votación:', players);

	return (
		<div className='page'>
			<Toaster />
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

			<Menu />
		</div>
	);
};

export default PullPage;
