import './profile.css';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import CardProfile from '../../components/cardProfile/cardProfile';
import CardMission from '../../components/cardMission/cardMission';
import Menu from '../../components/menu/menu';
import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const [player, setPlayer] = useState(null);
	const [ronda, setRonda] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		const playerData = JSON.parse(localStorage.getItem('playerData') || '{}');
		const roomId = playerData.roomId;
		const playerId = playerData.playerId;

		if (!roomId || !playerId) {
			navigate('/', { replace: true });
			return;
		}

		socket.emit('getPlayerInfo', { roomId, playerId }, (res) => {
			setPlayer(res.player);
		});

		const handleRoundStarted = ({ round }) => {
			localStorage.setItem('ronda', round);
			navigate('/ronda', { replace: true, state: { round } });
		};
		socket.on('roundStarted', handleRoundStarted);

		socket.emit('getRoomInfo', { roomId }, (res) => {
			if (res?.round) setRonda(res.round);
		});

		const handleRoomUpdate = (updatedPlayers) => {
			const me = updatedPlayers.find((p) => p.id === playerId);
			if (me) setPlayer(me);
		};
		socket.on('roomUpdate', handleRoomUpdate);

		return () => {
			socket.off('roomUpdate', handleRoomUpdate);
			socket.off('roundStarted', handleRoundStarted);
		};
	}, [navigate]);

	const handleEndTurn = () => {
		const playerData = JSON.parse(localStorage.getItem('playerData') || '{}');
		const roomId = playerData.roomId;
		if (!roomId) return;

		socket.emit('endTurn', roomId, (data) => {
			const { isLastPlayer = false } = data || {};

			localStorage.setItem('isMyTurn', 'false');

			if (!isLastPlayer) {
				navigate('/mapa-inicio', { replace: true });
			}
		});
	};

	if (!player) return <p>Cargando perfil...</p>;

	return (
		<div className='page'>
			<SectionHeader title='PERFIL' description='' />
			<CardProfile
				name={player.name}
				points={player.points}
				role={
					ronda === 1
						? 'Pronto lo sabrás'
						: `${player.role}${
								player.role === 'Vampiro infectado' ? ` (Etapa de infección: ${player.infectionRounds + 1}/4)` : ''
						  }`
				}
				imageSrc={player.image}
			/>
			<CardMission missionsCompleted={player.missionsCompleted} />
			<button className='profile-btn' onClick={handleEndTurn}>
				Terminar Turno
			</button>
			<Menu />
		</div>
	);
};

export default ProfilePage;
