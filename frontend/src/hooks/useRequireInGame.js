import { useEffect } from 'react';

export default function useRequireInGame() {
	useEffect(() => {
		const inGame = localStorage.getItem('inGame');
		if (!inGame) {
			window.location.href = '/';
		}
	}, []);
}
