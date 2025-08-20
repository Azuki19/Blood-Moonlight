import './profile.css';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import CardProfile from '../../components/cardProfile/cardProfile';
import CardMission from '../../components/cardMission/cardMission';
import Menu from '../../components/menu/menu';

const ProfilePage = () => {
	return (
		<div className='page'>
			<SectionHeader title='PERFIL' description='' />
			<CardProfile name='Ana Lucía' points='128 pts' role='Vampiro Común' imageSrc='/images/userImage.png' />
			<CardMission className='extra-missions' />
			<button className='profile-btn'>Terminar Turno</button>
			<Menu />
		</div>
	);
};

export default ProfilePage;
