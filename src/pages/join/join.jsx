import { useParams } from 'react-router-dom';
import './join.css';

const JoinPage = () => {
	const { roomId } = useParams();

	return (
		<div className='page join-page'>
			<h1 className='title'>Blood Moonlight</h1>
			<div className='join-card'>
				<h2 className='join-title'>Unirse a la sala</h2>
				<p className='join-room'>
					Sala: <span>{roomId}</span>
				</p>
				<input className='join-input' type='text' placeholder='Escribe tu nombre' />
				<button className='join-button'>Unirme</button>
			</div>
		</div>
	);
};

export default JoinPage;
