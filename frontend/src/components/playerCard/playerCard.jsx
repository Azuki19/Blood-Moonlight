import './playerCard.css';

const PlayerCard = ({ position, name }) => {
	return (
		<div className='player-card'>
			<span className='player-position'>#{position}</span>
			<img src='/images/userImage.png' className='player-image' alt='image-user' />
			<span className='player-name'>{name}</span>
		</div>
	);
};

export default PlayerCard;
