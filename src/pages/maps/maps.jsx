import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Card from '../../components/card/card';
import Menu from '../../components/menu/menu';
import { mapsData } from '../../data/data';
import './maps.css';

const MapsPage = () => {
	return (
		<div className='page'>
			<SectionHeader
				title='MAPA'
				description='Lanza los dados, mueve tu ficha y selecciona la locación en que caíste.'
			/>
			<div className='cards-grid'>
				{mapsData.map((map) => (
					<Card imageSrc={map.image} text={map.name} />
				))}
			</div>
			<Menu />
		</div>
	);
};

export default MapsPage;
