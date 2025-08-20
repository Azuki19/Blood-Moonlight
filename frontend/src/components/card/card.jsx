import './card.css';

const Card = ({ imageSrc, text }) => {
	return (
		<div className='card-container'>
			<div className='card-image-wrapper'>
				<img src={imageSrc} alt={text} className='card-image' />
			</div>
			<p className='card-text'>{text}</p>
		</div>
	);
};

export default Card;
