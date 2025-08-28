import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './roundPage.css';

const RoundPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [roundNumber, setRoundNumber] = useState(1);

	useEffect(() => {
		const playerData = JSON.parse(localStorage.getItem('playerData'));
		if (playerData?.ronda) setRoundNumber(playerData.ronda);

		const timer = setTimeout(() => navigate('/mapa-inicio', { replace: true }), 3000);
		return () => clearTimeout(timer);
	}, [navigate]);

	console.log(location);

	return (
		<div className='page round-page'>
			<div className='round-content'>
				<h1 className='round-title'>Ronda {roundNumber}</h1>
				<img src='/images/murcielago.png' alt='round' className='round-image' />
			</div>
		</div>
	);
};

export default RoundPage;
