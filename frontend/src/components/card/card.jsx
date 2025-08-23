import './card.css';

const Card = ({ imageSrc, text, selected, onClick, disabled }) => {
	return (
		<div
			className={`card-container ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
			onClick={() => !disabled && onClick()}
		>
			<div className='card-image-wrapper'>
				<img src={imageSrc} alt={text} className='card-image' />
				{disabled && !selected && <div className='overlay'></div>}
			</div>
			<p className='card-text'>{text}</p>
		</div>
	);
};

export default Card;
