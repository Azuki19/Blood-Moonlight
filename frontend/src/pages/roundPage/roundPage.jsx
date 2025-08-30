import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './roundPage.css';

const RoundPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const roundNumber = location.state?.round || 1;

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/mapa-inicio', { replace: true });
		}, 2500);

		return () => clearTimeout(timer);
	}, [navigate]);

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
