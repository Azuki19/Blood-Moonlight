import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/home';
import RolesPage from '../pages/roles/roles';
import CardPage from '../pages/cardPage/cardPage';
import MapsPage from '../pages/maps/maps';
import ProfilePage from '../pages/profile/profile';
import PullPage from '../pages/pull/pull';

const AppRoutes = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/roles' element={<RolesPage />} />
					<Route path='/cards' element={<CardPage />} />
					<Route path='/maps' element={<MapsPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/pull' element={<PullPage />} />
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
