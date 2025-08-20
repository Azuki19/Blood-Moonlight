import './cardMission.css';
import { missions } from '../../data/data';

const CardMission = () => {
	return (
		<div className='extra-missions'>
			<h4>Misiones Extra</h4>
			{missions.map((mission) => (
				<div className='mission-row'>
					<div className='mission-col-left'>
						<input type='checkbox' className='mission-checkbox' />
					</div>
					<div className='mission-col-right'>
						<p className='mission-text'>{mission.text}</p>
						<span className='mission-points'>+ {mission.points} pts</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardMission;
