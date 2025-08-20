import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Menu from '../../components/menu/menu';
import './cardPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardPage = () => {
	const [cardNumber, setCardNumber] = useState('');

	const navigate = useNavigate();

	const handlerScanner = () => {
		navigate(`/detailCard/${cardNumber}`);
	};

	return (
		<div className='page'>
			<SectionHeader
				title='INGRESA LA CARTA'
				description='Lanza los dados, mueve tu ficha y selecciona la locación en que caíste.'
			/>
			<div className='card-container'>
				<input
					type='text'
					className='card-number-input'
					placeholder='Digita el #'
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
				/>
				<button className='card-button' onClick={handlerScanner}>
					Escanear
				</button>
				<img className='card-image' src='/images/cardImage.png' />
				<p className='card-instruction'>
					En el dorso de la carta encontraras un código, ingresalo arriba y descubre lo que el juego tiene preparado
					para ti.
				</p>
			</div>
			<Menu />
		</div>
	);
};

export default CardPage;
