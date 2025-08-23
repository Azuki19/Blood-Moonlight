import './cardProfile.css';

const CardProfile = ({ name, points, role, imageSrc }) => {
	return (
		<div className='profile-card-group'>
			<div className='profile-card'>
				<div className='profile-image'>
					<img src={imageSrc} alt={name} />
				</div>
				<div className='profile-input'>
					<h2>{name}</h2>
					<p>{points} pts</p>
				</div>
			</div>
			<div className='role-card'>
				<p>Role: {role}</p>
			</div>
		</div>
	);
};

export default CardProfile;
