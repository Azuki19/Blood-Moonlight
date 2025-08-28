import './profile.css';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import CardProfile from '../../components/cardProfile/cardProfile';
import CardMission from '../../components/cardMission/cardMission';
import Menu from '../../components/menu/menu';
import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import toast, { Toaster } from 'react-hot-toast';
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
			if (res.error) {
				toast.error(res.error);
				return;
			}
			setPlayer(res.player);
		});

		socket.emit('getRoomInfo', { roomId }, (res) => {
			if (res?.round) setRonda(res.round);
		});

		const handleRoomUpdate = (updatedPlayers) => {
			const me = updatedPlayers.find((p) => p.id === playerId);
			if (me) setPlayer(me);
		};
		socket.on('roomUpdate', handleRoomUpdate);

		return () => socket.off('roomUpdate', handleRoomUpdate);
	}, [navigate]);

	const handleEndTurn = () => {
		const playerData = JSON.parse(localStorage.getItem('playerData') || '{}');
		const roomId = playerData.roomId;
		if (!roomId) return;

		socket.emit('endTurn', roomId);
		localStorage.setItem('isMyTurn', 'false');

		toast('Turno finalizado. Esperando tu turno...', {
			duration: 8000,
			position: 'top-right',
			style: { minWidth: '250px' },
		});

		navigate('/mapa-inicio');
	};

	if (!player) return <p>Cargando perfil...</p>;

	return (
		<div className='page'>
			<Toaster />
			<SectionHeader title='PERFIL' description='' />
			<CardProfile
				name={player.name}
				points={player.points}
				role={ronda === 1 ? 'Pronto lo sabrás' : player.role}
				imageSrc={player.image}
			/>
			<CardMission className='extra-missions' />
			<button className='profile-btn' onClick={handleEndTurn}>
				Terminar Turno
			</button>
			<Menu />
		</div>
	);
};

export default ProfilePage;
