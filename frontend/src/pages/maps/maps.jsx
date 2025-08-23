import SectionHeader from '../../components/sectionHeader/sectionHeader';
import Card from '../../components/card/card';
import Menu from '../../components/menu/menu';
import { mapsData } from '../../data/data';
import './maps.css';
import { useEffect, useState } from 'react';
import socket from '../../socket/socket';
import toast, { Toaster } from 'react-hot-toast';

const MapsPage = () => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [confirmed, setConfirmed] = useState(false);

	const playerId = localStorage.getItem('playerId');
	const roomId = localStorage.getItem('roomId');

	const handlerSelected = () => {
		if (selectedCard !== null) {
			const map = mapsData[selectedCard];
			socket.emit('mapSelected', { roomId, playerId, map });
		}
	};

	useEffect(() => {
		socket.on('mapConfirmed', () => {
			setConfirmed(true);
			toast.success('Mapa seleccionado, ve al perfil para terminar tu turno', {
				duration: 10000,
				position: 'top-right',
				style: { minWidth: '250px' },
			});
		});
		return () => {
			socket.off('mapConfirmed');
		};
	}, []);

	return (
		<div className='page'>
			<Toaster position='top-right' reverseOrder={false} />
			<SectionHeader
				title='MAPA'
				description='Lanza los dados, mueve tu ficha y selecciona la locación en que caíste.'
			/>
			<div className='cards-grid'>
				{mapsData.map((map, index) => (
					<Card
						key={map.id}
						imageSrc={map.image}
						text={map.name}
						selected={selectedCard === index}
						onClick={() => !confirmed && setSelectedCard(index)}
						disabled={confirmed}
					/>
				))}
			</div>
			<button className='maps-btn' onClick={handlerSelected} disabled={selectedCard === null || confirmed}>
				Seleccionar
			</button>
			<Menu />
		</div>
	);
};

export default MapsPage;
