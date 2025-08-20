import { players } from '../../data/data';
import PlayerCard from '../../components/playerCard/playerCard';
import './roles.css';
import { useNavigate } from 'react-router-dom';

const RolesPage = () => {
	const navigate = useNavigate();

	const handlerStart = () => {
		navigate('/maps');
	};

	return (
		<div className='page roles-page'>
			<h1 className='roles-title'>Blood Moonlight</h1>
			<div className='roles-qr'>
				<img src='/images/qr.png' className='qr-image' alt='qr-image' />
			</div>
			<p className='roles-text'>Los jugadores deben escanear el código QR para unirse a la sala.</p>
			<p className='roles-players-count'>JUGADORES: 6 / 8</p>
			<div className='roles-players'>
				{players.map((player) => (
					<PlayerCard name={player.name} imageSrc={player.image} position={player.id} />
				))}
			</div>
			<button onClick={handlerStart} className='start-button'>
				Iniciar Juego
			</button>
		</div>
	);
};

export default RolesPage;
