import { useNavigate } from 'react-router-dom';
import './home.css';
import { useEffect } from 'react';

const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.clear();
	}, []);

	const handlerCreate = () => {
		navigate('/iniciar');
	};

	return (
		<div className='page home-page'>
			<div className='home-header'>
				<h1 className='home-title'>Blood Moonlight</h1>
				<p className='home-description'>
					Los clanes vampíricos más poderosos del mundo de las tinieblas han iniciado un ritual ancestral: Elegir qué
					clan se quedará con el trono de la noche. Para ello cada clan ha enviado a su vampiro más ágil, astuto y letal
					al pueblo maldito de Crimson, un lugar sumido en tinieblas con un peligro que acecha desde las sombras. La
					prueba es clara: sobrevivir y destacar durante 16 o más noches, recorriendo el pueblo y acumulando Puntos de
					Sangre y fortaleciéndose. El vampiro con más puntos al final del ritual será coronado. Pero hay un peligro
					oculto…
				</p>
			</div>
			<div className='home-image-wrapper'>
				<img src='/images/image1.png' className='home-image' alt='image-home' />
			</div>
			<p className='home-text-below'>
				Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus
				malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.
			</p>
			<div className='home-footer'>
				<button className='start-button' onClick={handlerCreate}>
					Crear Sala
				</button>
				<p className='footer-text'>De 6 a 8 jugadores</p>
			</div>
		</div>
	);
};

export default HomePage;
