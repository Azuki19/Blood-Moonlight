export const mapsData = [
	{
		id: 1,
		image: '/images/plazaMapa.png',
		name: 'Plaza del reloj',
	},
	{
		id: 2,
		image: '/images/cementerioMapa.png',
		name: 'Cementerio de los antiguos',
	},
	{
		id: 3,
		image: '/images/catedralMapa.png',
		name: 'Catedral de la luna roja',
	},
	{
		id: 4,
		image: '/images/barrioMapa.png',
		name: 'Barrio olvidado',
	},
	{
		id: 5,
		image: '/images/tunelesMapa.png',
		name: 'Túneles del susurro',
	},
	{
		id: 6,
		image: '/images/castilloMapa.png',
		name: 'Castillo del consejo',
	},
];

export const missions = [
	{
		text: 'Visita la Plaza del reloj al inicio',
		points: 5,
		mapIds: [1],
		completed: false,
	},
	{
		text: 'Explora el Cementerio de los antiguos',
		points: 6,
		mapIds: [2],
		completed: false,
	},
	{
		text: 'Llega a la Catedral de la luna roja',
		points: 8,
		mapIds: [3],
		completed: false,
	},
	{
		text: 'Camina por los Túneles del susurro',
		points: 10,
		mapIds: [5],
		completed: false,
	},
	{
		text: 'Visita el Castillo del consejo',
		points: 7,
		mapIds: [6],
		completed: false,
	},
	{
		text: 'Recorre la Plaza y luego el Barrio olvidado',
		points: 9,
		mapIds: [1, 4],
		completed: false,
	},
	{
		text: 'Completa un tour por el Castillo y la Catedral',
		points: 12,
		mapIds: [6, 3],
		completed: false,
	},
	{
		text: 'Explora el Cementerio y los Túneles en la misma ronda',
		points: 11,
		mapIds: [2, 5],
		completed: false,
	},
	{
		text: 'Visita todos los mapas de la ciudad vieja: Plaza, Barrio y Cementerio',
		points: 15,
		mapIds: [1, 2, 4],
		completed: false,
	},
	{
		text: 'Haz un recorrido completo por los lugares sagrados: Catedral y Castillo',
		points: 14,
		mapIds: [3, 6],
		completed: false,
	},
	{
		text: 'Explora los Túneles y el Barrio olvidado en cualquier orden',
		points: 13,
		mapIds: [4, 5],
		completed: false,
	},
	{
		text: 'La ruta maestra: Plaza, Cementerio, Catedral, Barrio y Túneles',
		points: 20,
		mapIds: [1, 2, 3, 4, 5],
		completed: false,
	},
];

export const cardData = [
	{
		id: 128,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '+7 pts',
		isVampireCard: false,
	},
	{
		id: 129,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '+12 pts',
		isVampireCard: false,
	},
	{
		id: 130,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '+18 pts',
		isVampireCard: false,
	},
	{
		id: 131,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 132,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '-50 pts',
		isVampireCard: false,
	},
	{
		id: 133,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '-25 pts',
		isVampireCard: false,
	},
	{
		id: 134,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '-30 pts',
		isVampireCard: false,
	},
	{
		id: 590,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '-5 pts',
		isVampireCard: true,
	},
	{
		id: 588,
		title: 'Colmillos de sangre',
		description:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit tortor mauris nec varius in urna, rutrum senectus malesuada habitant nibh. Sapien fusce integer ante dapibus ullamcorper torquent risus.',
		image: '/images/cardVampire.png',
		points: '+5 pts',
		isVampireCard: true,
	},
];
