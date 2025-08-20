import './infectedPage.css';
import Menu from '../../components/menu/menu';
import Card from '../../components/card/card';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import { players } from '../../data/data';

const InfectedPage = () => {
	return (
		<div className='page'>
			<SectionHeader
				title='INFECCIÓN'
				description='Selecciona al jugador que quieres infectar, si estás es una locación externa, robaras 18 puntos.'
			/>
			<div className='infected-grid'>
				{players.map((player) => (
					<Card imageSrc={player.image} text={player.name} />
				))}
			</div>
			<div className='infected-buttons'>
				<button className='back-btn'>← Volver</button>
				<button className='pull-btn'>¡INFECTAR!</button>
			</div>
			<Menu />
		</div>
	);
};

export default InfectedPage;
