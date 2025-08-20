import { useParams } from 'react-router-dom';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Menu from '../../components/menu/menu';
import './detailCard.css';
import { cardData } from '../../data/data';

const DetailCard = () => {
	const { idCard } = useParams();

	const card = cardData.find((card) => card.id.toString() === idCard);
	if (!card) {
		return <div className='page'>Carta no encontrada</div>;
	}

	return (
		<div className='page'>
			<SectionHeader title={idCard} description='' />
			<div className='detail-card'>
				<h2 className='detail-title'>{card.title}</h2>
				<p className='detail-description'>{card.description}</p>
				<img src={card.image} alt={card.title} />
				<p className='detail-points'>{card.points}</p>
			</div>
			<button className='start-button'>Obtener</button>
			<Menu />
		</div>
	);
};

export default DetailCard;
