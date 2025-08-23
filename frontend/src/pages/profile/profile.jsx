import './profile.css';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import CardProfile from '../../components/cardProfile/cardProfile';
import CardMission from '../../components/cardMission/cardMission';
import Menu from '../../components/menu/menu';
import { useEffect, useState } from 'react';
import useRequireInGame from '../../hooks/useRequireInGame';
import socket from '../../socket/socket';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const [player, setPlayer] = useState(null);
	const navigate = useNavigate();

	useRequireInGame();

	useEffect(() => {
		const roomId = localStorage.getItem('roomId');
		const playerId = localStorage.getItem('playerId');

		socket.emit('getPlayerInfo', { roomId, playerId }, (response) => {
			if (response.error) {
				console.error(response.error);
				return;
			}
			setPlayer(response.player);
			localStorage.setItem('player', JSON.stringify(response.player));
		});
	}, []);

	const handleEndTurn = () => {
		const roomId = localStorage.getItem('roomId');
		socket.emit('endTurn', roomId);

		localStorage.setItem('isMyTurn', 'false');

		toast('Turno finalizado. Esperando tu turno...', {
			duration: 10000,
			position: 'top-right',
			style: { minWidth: '250px' },
		});

		navigate('/cards');
	};

	if (!player) {
		return <p>Cargando perfil...</p>;
	}

	return (
		<div className='page'>
			<Toaster />
			<SectionHeader title='PERFIL' description='' />
			<CardProfile name={player.name} points={player.points} role={player.role} imageSrc={player.image} />
			<CardMission className='extra-missions' />
			<button className='profile-btn' onClick={handleEndTurn}>
				Terminar Turno
			</button>
			<Menu />
		</div>
	);
};

export default ProfilePage;
