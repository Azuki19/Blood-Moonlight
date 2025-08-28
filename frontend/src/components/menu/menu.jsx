import { NavLink } from 'react-router-dom';
import './menu.css';

const Menu = () => {
	return (
		<div className='menu'>
			<NavLink className='menu-item' to='/maps'>
				<img src='/icons/castle.png' className='menu-icon' alt='icon-castle' />
				<span>Castillo</span>
			</NavLink>
			<NavLink className='menu-item' to='/cards'>
				<img src='/icons/cardStar.png' className='menu-icon' alt='icon-cardStar' />
				<span>Cartas</span>
			</NavLink>
			<NavLink className='menu-item' to='/profile'>
				<img src='/icons/user.png' className='menu-icon' alt='icon-user' />
				<span>Perfil</span>
			</NavLink>
			<NavLink className='menu-item' to='/pull'>
				<img src='/icons/emergency.png' className='menu-icon' alt='icon-emergency' />
				<span>Votaciones</span>
			</NavLink>
		</div>
	);
};

export default Menu;
