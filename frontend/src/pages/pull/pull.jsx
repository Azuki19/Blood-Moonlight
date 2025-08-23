import './pull.css';
import Menu from '../../components/menu/menu';
import Card from '../../components/card/card';
import SectionHeader from '../../components/sectionHeader/sectionHeader';

const PullPage = () => {
	return (
		<div className='page'>
			<SectionHeader title='VOTACIÓN' description='Confirma tus sospechas, ¡estaca al vampiro sombrío!' />
			<div className='vote-grid'>
				{/* {players.map((player) => (
					<Card imageSrc={player.image} text={player.name} />
				))} */}
			</div>
			<button className='pull-btn'>Estacar</button>
			<Menu />
		</div>
	);
};

export default PullPage;
