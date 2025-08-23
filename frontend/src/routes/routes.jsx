import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/home';
import RolesPage from '../pages/roles/roles';
import CardPage from '../pages/cardPage/cardPage';
import MapsPage from '../pages/maps/maps';
import ProfilePage from '../pages/profile/profile';
import PullPage from '../pages/pull/pull';
import InfectedPage from '../pages/infectedPage/infectedPage';
import DetailCard from '../pages/detailCard/detailCard';
import JoinPage from '../pages/join/join';
import RolesWaitPage from '../pages/rolesWait/rolesWait';

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
					<Route path='/infected/:idCard' element={<InfectedPage />} />
					<Route path='/detailCard/:idCard' element={<DetailCard />} />
					<Route path='/join/:roomId' element={<JoinPage />} />
					<Route path='/roles-wait' element={<RolesWaitPage />} />
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
