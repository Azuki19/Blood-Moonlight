import './profile.css';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import CardProfile from '../../components/cardProfile/cardProfile';
import CardMission from '../../components/cardMission/cardMission';
import Menu from '../../components/menu/menu';
import { useEffect, useState } from 'react';
import useRequireInGame from '../../hooks/useRequireInGame';

const ProfilePage = () => {
	const [player, setPlayer] = useState(null);

	useRequireInGame();

	useEffect(() => {
		const storedPlayer = localStorage.getItem('player');
		if (storedPlayer) {
			setPlayer(JSON.parse(storedPlayer));
		}
	}, []);

	if (!player) {
		return <p>Cargando perfil...</p>;
	}

	return (
		<div className='page'>
			<SectionHeader title='PERFIL' description='' />
			<CardProfile name={player.name} points={player.points} role={player.role} imageSrc={player.image} />
			<CardMission className='extra-missions' />
			<button className='profile-btn'>Terminar Turno</button>
			<Menu />
		</div>
	);
};

export default ProfilePage;
