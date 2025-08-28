import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/home';
import RolesPage from '../pages/roles/roles';
import CardPage from '../pages/cardPage/cardPage';
import MapsInicioPage from '../pages/mapsInicio/mapsInicio';
import ProfilePage from '../pages/profile/profile';
import PullPage from '../pages/pull/pull';
import InfectedPage from '../pages/infectedPage/infectedPage';
import DetailCard from '../pages/detailCard/detailCard';
import JoinPage from '../pages/join/join';
import RolesWaitPage from '../pages/rolesWait/rolesWait';
import RoundPage from '../pages/roundPage/roundPage';
import MapsFinalPage from '../pages/mapsFinal/mapsFinal';

const AppRoutes = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/iniciar' element={<RolesPage />} />
					<Route path='/cartas' element={<CardPage />} />
					<Route path='/mapa-inicio' element={<MapsInicioPage />} />
					<Route path='/mapa-fin' element={<MapsFinalPage />} />
					<Route path='/perfil' element={<ProfilePage />} />
					<Route path='/votaciones' element={<PullPage />} />
					<Route path='/infectar/:idCard' element={<InfectedPage />} />
					<Route path='/detalle-carta/:idCard' element={<DetailCard />} />
					<Route path='/unirse/:roomId' element={<JoinPage />} />
					<Route path='/sala-espera' element={<RolesWaitPage />} />
					<Route path='/ronda' element={<RoundPage />} />
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
