import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Menu from '../../components/menu/menu';
import './cardPage.css';

const CardPage = () => {
	const navigate = useNavigate();
	const [cardNumber, setCardNumber] = useState('');

	const playerData = JSON.parse(localStorage.getItem('playerData'));

	if (!playerData?.playerId || !playerData?.roomId) {
		navigate('/', { replace: true });
		return null;
	}

	const handleSubmit = () => {
		if (!cardNumber) return;

		const updatedPlayerData = {
			...playerData,
			cardNumber,
		};
		localStorage.setItem('playerData', JSON.stringify(updatedPlayerData));

		navigate(`/detalle-carta/${cardNumber}`);
	};

	return (
		<div className='page'>
			<SectionHeader
				title='INGRESA LA CARTA'
				description='Ingresa el número de tu carta para descubrir lo que el juego tiene preparado.'
			/>

			<div className='card-container-wrapper'>
				<div className='card-container'>
					<input
						type='text'
						className='card-number-input'
						placeholder='Ingresa el número'
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>
					<button className='card-button' onClick={handleSubmit}>
						Escanear
					</button>
					<img className='card-image' src='/images/cardImage.png' alt='' />
					<p className='card-instruction'>
						En el dorso de la carta encontrarás un código, ingrésalo arriba y descubre lo que el juego tiene preparado
						para ti.
					</p>
				</div>
			</div>

			<Menu />
		</div>
	);
};

export default CardPage;
