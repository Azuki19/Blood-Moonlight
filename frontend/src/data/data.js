export const mapsData = [
	{
		id: 1,
		image: 'https://pbs.twimg.com/media/Gz8c43sWkAAd6xw?format=jpg&name=900x900',
		name: 'Plaza del reloj',
	},
	{
		id: 2,
		image: 'https://pbs.twimg.com/media/Gz8c-sYWQAAH3PZ?format=jpg&name=900x900',
		name: 'Cementerio de los antiguos',
	},
	{
		id: 3,
		image: 'https://pbs.twimg.com/media/Gz8cc8CXAAA23o5?format=jpg&name=900x900',
		name: 'Catedral de la luna roja',
	},
	{
		id: 4,
		image: 'https://pbs.twimg.com/media/Gz8czvXW0AAg1SC?format=jpg&name=900x900',
		name: 'Barrio olvidado',
	},
	{
		id: 5,
		image: 'https://pbs.twimg.com/media/Gz8cVkhXcAAZz2s?format=jpg&name=900x900',
		name: 'Túneles del susurro',
	},
	{
		id: 6,
		image: 'https://pbs.twimg.com/media/Gz8ggt0WQAEuj67?format=jpg&name=900x900',
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
		id: 10,
		title: 'Sombra Seductora',
		description:
			'Rebuscando entre las sombras encuentras una poción hipnótica, tu encanto vampírico florece. Durante esta ronda debes hablar siempre en susurros.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 12,
		title: 'Aullido del Lobo Interior',
		description:
			'La luna Carmesí se alza frente a la catedral, al contemplarla una bestia interna despierta en ti. Debes aullar o gruñir durante la ronda. Si lo haces, el poder lunar te bendice.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+8 pts',
		isVampireCard: false,
	},
	{
		id: 14,
		title: 'Máscara de Sombras',
		description:
			'Encuentras una máscara de carnaval oscuro, vestigios de lo que era el pueblo de Crimson antes de la maldición. Al ponerla sientes algo extraño dentro de ti, durante esta ronda debes hablar fingiendo otra voz. Si lo logras, tu máscara te otorga poder.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+10 pts',
		isVampireCard: false,
	},
	{
		id: 16,
		title: 'Bendición del Eclipse',
		description:
			'Un eclipse carmesí ilumina tu sendero. Quédate en silencio absoluto hasta tu próximo turno. Si lo cumples, la luna te bendice.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+6 pts',
		isVampireCard: false,
	},
	{
		id: 18,
		title: 'Banquete Carmesí',
		description:
			'Encuentras un festín de sangre fresca servido, ¿Quién lo habrá dejado ahí? Recuperas fuerzas y tu sed se calma.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 20,
		title: 'Festín Oculto',
		description:
			'Encuentras un escondite secreto con botellas de sangre muy antiguas. ¿Cumplirán con los registros sanitarios vampíricos? Haz un brindis con copa imaginaria y bebe con estilo. Si lo haces, disfrutas del “sabor a hierro con añejamiento de 200 años”..',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 22,
		title: 'Poema al Ocaso',
		description:
			'Un trovador vampírico te dedica versos deprimentes sobre la eternidad. Recita cualquier frase dramática como si fuera poesía. Entre más cursi, mejor.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 24,
		title: 'El Karaoke Carmesí',
		description:
			'En el sótano de la catedral alguien dejó un karaoke embrujado. Canta un pedacito de cualquier canción, aunque sea de reguetón (los vampiros también evolucionan). Si lo haces, ganas poder.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 26,
		title: 'El Arte del Engaño',
		description: 'En esta ronda, todo lo que digas debe ser mentira. Si nadie te descubre, serás el vampiro maestro.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+8 pts',
		isVampireCard: false,
	},
	{
		id: 28,
		title: 'Murciélago alado',
		description:
			'La situación lo amerita, conviértete en murciélago, lanza un solo dado y avanza el número de casillas, pero no sacas una nueva carta. Demuestrale a todos tu poder vampírico.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 30,
		title: 'Sombras Chismosas',
		description:
			'Las sombras del pueblo hablan mal de alguien del grupo. Elige un jugador y cuéntale tus sospechas sobre quién es el vampiro sombrío.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 32,
		title: 'Crimson Fitness',
		description:
			'Un vampiro entrenador te ataca, obligandote a hacer ejercicio (sí, los vampiros también se ejercitan). Haz 5 sentadillas o una flexión en el lugar. Si lo haces, recuperas vigor.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+8 pts',
		isVampireCard: false,
	},
	{
		id: 34,
		title: 'Pergamino Enrojecido',
		description: 'El papel gotea sangre. No entiendes cómo, pero al tocarlo recuperas energía. ¿Eran textos antiguos?',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 36,
		title: 'Fruta Carmesí',
		description: 'Un extraño arbusto parlante te ofrece una fruta jugosa que parece… ¿sangre? La comes sin dudar.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+2 pts',
		isVampireCard: false,
	},
	{
		id: 38,
		title: 'Gafas Nocturnas',
		description:
			'Encuentras un cofre con unas gafas especiales para la luz carmesí, ahora nadie notará que eres vampiro… excepto por los colmillos.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 40,
		title: 'Botas vampiricas',
		description:
			'Viste un mercader y compraste unas botas negras que suenan “clac clac” al caminar. Solo por el estilo mereces puntos..',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 42,
		title: 'Sello de rosa oscura',
		description: 'Encuentras una rosa ensangrentada, la clavas en tu pecho y te recorre una energía sombría',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+6 pts',
		isVampireCard: false,
	},
	{
		id: 44,
		title: 'Risa del Conde',
		description:
			'Una carcajada maligna resuena en tu interior. Debes reír como villano de caricatura por 5 segundos. Cuanto más exagerada, mejor.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 46,
		title: 'Colmillos de sangre',
		description:
			'En la plaza del reloj viste a un lustrador de colmillos, ahora están más filosos y pueden absorber más. 100% recomendado',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+3 pts',
		isVampireCard: false,
	},
	{
		id: 48,
		title: 'Susurros del Campanario',
		description:
			'Las campanas de la catedral tocan solas a medianoche. Un murmullo ancestral te envuelve y sientes fuerzas renovadas.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 50,
		title: 'Ataudes ¿En rebaja?',
		description:
			'Un cartel anuncia: Rebajas de ataúdes, ¡2x1 hasta agotar muertos! Te compras uno y tomas un descanso vampirico',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 52,
		title: 'El gato de Crimson',
		description: 'Un gato negro cruza frente a ti, pero en esta ciudad maldita eso se considera buena suerte.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+12 pts',
		isVampireCard: false,
	},
	{
		id: 54,
		title: 'Reflejo Distorsionado',
		description:
			'En un espejo roto logras ver tu silueta, algo imposible para un vampiro. El misterio te otorga poder.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 56,
		title: 'El Cofre Polvoriento',
		description: 'Encuentras un cofre olvidado en los túneles. Dentro, un amuleto te otorga vitalidad.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+6 pts',
		isVampireCard: false,
	},
	{
		id: 58,
		title: 'El Coro Carmesí',
		description: 'En la catedral escuchas un canto invisible. Su armonía oscura aumenta tu poder.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 60,
		title: 'Cupon Vampirico',
		description:
			'El dueño de la tienda de Crimson te reconoce, Ey cuanto tiempo! Te regala un cupón para ir ya mismo a su tienda. Aprovechalo. Te teletransportas a la tienda.',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		points: '+16 pts',
		isVampireCard: false,
	},
	{
		id: 62,
		title: 'Vampiro Fanstasmal',
		description:
			'Visitas una antigua tumba de uno de tus ancestros, mientras recordabas los tiempos pasados, su espíritu apareció y en gratitud, te ofreció teletransportarte a cualquier localidad de tu elección ¡Qué suerte!',
		points: '+4 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 64,
		title: 'Visión Nocturna',
		description:
			'Le compraste al mercader unas gafas de visión nocturna, si sospechas de alguien te permiten ver su rol oculto! seleccionalo y dile que te muestre su rol. Después de eso las gafas se desintegran',
		points: '+4 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 66,
		title: 'Murcielagos Cantores',
		description:
			'Un enjambre de murciélagos forma una sinfonía en el cielo. Imita su chillido (sí, en la vida real). La melodía oscura te bendice.',
		points: '+8 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 68,
		title: 'Brisa Carmesí',
		description:
			'Un viento helado pasa rozándote y te susurra secretos. Cierras los ojos unos segundos para disfrutar el momento. La brisa te renueva..',
		points: '+6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 70,
		title: 'Eterno',
		description:
			'Escuchas un lamento antiguo en las paredes de Crimson. Aunque te hiela la sangre, te inspira a seguir adelante con más fuerza.',
		points: '+7 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 72,
		title: 'Eco Perdido',
		description:
			'Un eco extraño rebota en las calles vacías de Crimson. Te confunde un instante, pero logras aprender de él.',
		points: '+4 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 74,
		title: 'Llama Oculta',
		description: 'Una linterna olvidada arde con fuego Carmesí. Al tocarla, recuperas vitalidad.',
		points: '+8 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 76,
		title: 'Sombras Errantes',
		description:
			'Sombras deformes te siguen por los callejones. Escapas con dificultad, pero su energía extraña se queda contigo.',
		points: '+5 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 78,
		title: 'Ofrenda Carmesí',
		description: 'En un altar secreto hallas un cáliz de sangre fresca. Lo bebes y te fortaleces.',
		points: '+10 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 80,
		title: 'Maldición Breve',
		description: 'Un murmullo oscuro invade tu mente, pero al resistirlo, obtienes una renovada fuerza interior.',
		points: '+6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 82,
		title: 'Luz Carmesí',
		description: 'Un destello rojo ilumina tu camino. Te guía y te llena de poder renovado.',
		points: '+7 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 84,
		title: 'Cruz Quebrada',
		description: 'Tocas una cruz rota y oxidada. En lugar de dañarte, te transmite un poder olvidado.',
		points: '+6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 86,
		title: 'Niebla Roja',
		description: 'La neblina se vuelve densa, pero dentro de ella hallas un sorbo de sangre revitalizante.',
		points: '+5 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 88,
		title: 'Grito Oculto',
		description: 'Un alarido rompe la noche. El susto te despierta los sentidos y obtienes energía inesperada.',
		points: '+4 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 90,
		title: 'Reliquia Obsidiana',
		description: 'Encuentras un cáliz tallado en piedra negra. Al beber, un poder ancestral fluye en ti.',
		points: '+12 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 92,
		title: 'Cadena Sombría',
		description: 'Tropezaste con una cadena oculta. En su interior hay un amuleto que fortalece tu cuerpo.',
		points: '+5 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 94,
		title: 'Velo Carmesí',
		description: 'Una sombra protectora cubre tu figura. Avanzas oculto y con fuerza renovada.',
		points: '+9 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 96,
		title: 'Campanas Huecas',
		description: 'Las campanas suenan en la catedral sin motivo. Su eco lúgubre libera energía extraña que absorbes.',
		points: '+6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},
	{
		id: 98,
		title: 'Estrella Roja',
		description: 'Una estrella Carmesí brilla sobre Crimson. Su energía desciende hacia ti y te vigoriza.',
		points: '+10 pts',
		image: 'https://pbs.twimg.com/media/Gz4WHAfXMAAJ0yM?format=jpg&name=900x900',
		isVampireCard: false,
	},

	{
		id: 11,
		title: 'Cáliz de… ¿Sangría?',
		description:
			'Te cruzas con un mercader torpe y este te ofrece “sangría” en vez de sangre. ¡Qué insulto! Igual te la bebes pero no te cae muy bien.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 13,
		title: 'Maldito Ajo',
		description:
			'Alguien dejó una ristra de ajo colgando en los túneles. Tropiezas con ella y pasas la ronda estornudando como humano. Ajo-lergico',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 15,
		title: 'Reflejo Inquietante',
		description:
			'Al pasar frente a un espejo, ves tu reflejo… ¡pero tú no deberías tener uno! ¿Qué fuiste en otra vida? Te desconcentras por el trauma.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-4 pts',
		isVampireCard: false,
	},
	{
		id: 17,
		title: 'Pesadilla Carmesí',
		description:
			'Duermes en un rincón oscuro del cementerio y tienes un sueño perturbador sobre ser humano otra vez. Te despiertas con menos energía.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-3 pts',
		isVampireCard: false,
	},
	{
		id: 19,
		title: 'Ataque Sombrío',
		description: 'Las sombras del Túnel te susurran secretos oscuros. No entiendes nada, pero te bajan la moral.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-7 pts',
		isVampireCard: false,
	},
	{
		id: 21,
		title: 'Pozo de Sangre',
		description:
			'Caminando te topaste con un pozo oculto, Intentas alimentarte de él, pero la sangre está rancia. ¡Qué asco! Vomitas un poco de tu inmortalidad.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 23,
		title: 'Amor Vampirico',
		description:
			'Te encuentras con tu antiguo amante vampiro. Fue dramático. Fue eterno. Fue tóxico. El drama te cuesta energía.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-8 pts',
		isVampireCard: false,
	},
	{
		id: 25,
		title: 'Música Solar',
		description:
			'Alguien en el barrio olvidado dejó puesta una playlist con sonidos del amanecer. Tu mente arde con cada nota brillante.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 27,
		title: 'Falsa Reliquia',
		description:
			'Encuentras un colmillo antiguo… de plástico. ¡Estafa! Te indigna tanto que pierdes energía solo por el coraje.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-3 pts',
		isVampireCard: false,
	},
	{
		id: 29,
		title: 'Tumba Vacía',
		description: 'Vuelves a tu cripta para descansar, pero alguien saqueó tu ataúd. ¡Ni tus murciélagos te respetan!',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 31,
		title: 'Fantasma Sopero',
		description:
			'Un fantasma en el barrio olvidado te invita amablemente a cenar, pero olvidó el “pequeño” detalle de que su plato especial es sopa… y está llena de ajo. Pasas la noche con náuseas eternas.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-4 pts',
		isVampireCard: false,
	},
	{
		id: 33,
		title: 'Boda Interrumpida',
		description:
			'Cerca de donde estas escuchas ruidos tenebrosos, Invades el lugar pensando que era un banquete de sangre, pero era una boda fantasmal.. ¡Y era vegana! El trauma social te resta poder.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 35,
		title: 'Tormenta de Sangre',
		description: 'Una lluvia carmesí cae del cielo, pero está mezclada con agua bendita. Te quema la piel lentamente.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-8 pts',
		isVampireCard: false,
	},
	{
		id: 37,
		title: 'Sombrero Santo',
		description:
			'En el mercado negro compras un sombrero oscuro para pasar desapercibido, pero sin darte cuenta, agarras un sombrero bendecido. Tu cuero cabelludo arde.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 39,
		title: '¡Yo nunca dije eso!',
		description:
			'Encuentras un libro mágico que cuenta tu propia historia y la de tu clan… con pésima ortografía. El enojo te drena vitalidad.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-3 pts',
		isVampireCard: false,
	},
	{
		id: 41,
		title: 'El Infectado Risueño',
		description:
			'El infectado deambula cerca de ti…Y lo sabes, pero en lugar de atacarte, envía susurros burlándose de tu capa. Que malvado. Pierdes moral y energía.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-7 pts',
		isVampireCard: false,
	},
	{
		id: 43,
		title: 'Hombre Lobo',
		description:
			'Decidiste irte caminando en vez de usar tus habilidades vuelo. Mientras paseabas pacíficamente por el sendero buscando aumentar tus puntos escuchas un rugido… ¡Eres atacado por un hombre lobo! Auch.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 45,
		title: 'Eco del Infectado',
		description:
			'Mientras caminas, escuchas la risa hueca de un infectado. No lo ves, pero sientes que te sigue. Pierdes energía solo del terror.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 47,
		title: 'Beso Frío',
		description:
			'Un espectro romántico intenta besarte. Olvidó que no tienes alma. Te roba calor y vitalidad. Eso te pasa por ser un vampiro guapo',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 49,
		title: 'Niebla Pesada',
		description: 'Una densa niebla cae sobre ti. No ves nada, tropiezas y caes en una zanja.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-2 pts',
		isVampireCard: false,
	},
	{
		id: 51,
		title: 'Pacto Incómodo',
		description:
			'Un brujo ofrece ayudarte a ganar puntos de sangre ¿Aceptas? Aceptas. Pero lo único que hace es robarte vitalidad en el trato.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 53,
		title: 'Feria Maldita',
		description: 'En el barrio viejo hay luces y música de feria. Te acercas… ¡todo huele a ajo caramelizado!',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 55,
		title: 'Los Gatos son Sabios',
		description: 'Una manada de gatos negros te sigue y te miran fijamente. Sientes que saben demasiado.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-4 pts',
		isVampireCard: false,
	},
	{
		id: 57,
		title: 'Araña, arañita',
		description:
			'Una enorme araña baja desde el techo y se cuelga de tu capa. Pasas horas intentando quitártela. Tu dignidad y energía se van juntas.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-4 pts',
		isVampireCard: false,
	},
	{
		id: 59,
		title: 'Linterna de Calabaza',
		description:
			'Una calabaza sonriente te observa en la oscuridad. Crees que te está juzgando por tu peinado vampírico. La inseguridad te resta poder.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-3 pts',
		isVampireCard: false,
	},
	{
		id: 61,
		title: 'Tumba Olvidada',
		description:
			'Vagando por el cementerio encuentras tu nombre escrito en una tumba vieja. ¿Mala broma? ¿Profecía? Sea lo que sea, te quita el sueño.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 63,
		title: 'El Arañazo de Viuda Negra',
		description:
			'Una viuda negra del tamaño de un perro te muerde y su veneno te arde como fuego. Apenas logras seguir caminando.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-11 pts',
		isVampireCard: false,
	},
	{
		id: 65,
		title: 'Telaraña de Medianoche',
		description:
			'Caes en una telaraña gigantesca. No hay arañas… pero la red está hecha de maldiciones antiguas que te chupan la fuerza.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-9 pts',
		isVampireCard: false,
	},
	{
		id: 67,
		title: 'La Mirada del Bosque',
		description:
			'Los árboles secos tienen ojos. Pasas la noche caminando bajo sus miradas acusadoras. Tu espíritu se debilita y tropiezas con una raiz gigante ¿Cómo no la viste?.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-8 pts',
		isVampireCard: false,
	},
	{
		id: 69,
		title: 'La Calabaza del Enojo',
		description:
			'Te enojas por perder puntos de sangre la ronda pasada, pateas una pobre calabaza que se cruzó en el camino, pero estaba poseída. Ahora te odia el espíritu que vivía dentro. Mal Vampiro',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-12 pts',
		isVampireCard: false,
	},
	{
		id: 71,
		title: 'Refugio Equivocado',
		description:
			'Creías que esa cueva era un escondite perfecto… hasta que los murciélagos que vivían allí te expulsan a golpes de ala.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 73,
		title: '¿Donde Está Mi Capa?',
		description:
			'Despiertas y descubres que tu elegante capa fue robada por el vampiro a tu derecha. La humillación es insoportable.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 75,
		title: 'Banquete Robado',
		description: 'El vampiro frente a ti bebe la sangre que habías cazado con esfuerzo. ¡Eres víctima de su gula!',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 77,
		title: 'El collar de Ajo',
		description:
			'El jugador a tu derecha coloca un collar de ajo cerca de ti. ¡Pasas toda la ronda débil y mareado! ¿Por qué un vampiro tendría un ajo? sospechoso.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-14 pts',
		isVampireCard: false,
	},
	{
		id: 79,
		title: 'Acusaciones Vampíricas',
		description: 'El jugador con menos puntos te acusa de esconder víctimas humanas. El clan duda de ti.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-14 pts',
		isVampireCard: false,
	},
	{
		id: 81,
		title: 'Ronda de Sangría',
		description:
			'Invitas a todos los vampiros a beber contigo, pero alguien mezcló sangría en vez de sangre. Todos se ríen de ti, pierdes puntos.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-10 pts',
		isVampireCard: false,
	},
	{
		id: 83,
		title: 'Poción del silencio',
		description:
			'En la plaza del reloj, un mercader te ofrece una muestra gratis de su poción vampírica, aceptas ¿Quién no acepta una prueba gratis? La poción te hace perder el habla durante esta ronda.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-12 pts',
		isVampireCard: false,
	},
	{
		id: 85,
		title: 'La Rosa de Falacia',
		description:
			'En el camino encontraste una rosa violeta, qué extraña, la agarras para olerla pero una de sus espinas te lastima. Era la rosa de la mentira, durante esta ronda todo lo que digas debe ser mentira',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-6 pts',
		isVampireCard: false,
	},
	{
		id: 87,
		title: 'Gato Blanco',
		description: 'Te encuentras un gato…¿blanco? Oh no! Aquí eso es de mala suerte!',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-4 pts',
		isVampireCard: false,
	},
	{
		id: 89,
		title: 'Amanecer Inesperado',
		description:
			'Creíste que era medianoche eterna, pero un rayo de sol se coló entre las nubes. Tu piel se quema ligeramente',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-7 pts',
		isVampireCard: false,
	},
	{
		id: 91,
		title: 'Murciélago Chismoso',
		description: 'Un murciélago te delató con los cazadores. Pasas la noche escondido y sin banquete.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-8 pts',
		isVampireCard: false,
	},
	{
		id: 93,
		title: 'Árbol Retorcido',
		description:
			'Un árbol seco atrapó tu capa con sus ramas filosas, ocasionando que te caigas hacia atrás. Lanza los dados y retrocede el número de casillas que indiquen. No sacas una nueva carta',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-5 pts',
		isVampireCard: false,
	},
	{
		id: 95,
		title: 'El Pozo Maldito',
		description:
			'Cerca de donde estás, logras ver un pozo lleno de sangre para tomar, que delicia! Cuando te acercas, sientes que algo te empuja por la espalda y caes dentro. El pozo te teletransporta. Mueve tu ficha hasta el ataúd del inicio del tablero',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-13 pts',
		isVampireCard: false,
	},
	{
		id: 97,
		title: 'El Lago Carmesí',
		description: 'El agua parecía sangre a la luz de la luna. Bebiste de ella, pero solo era fango maldito.',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-7 pts',
		isVampireCard: false,
	},
	{
		id: 99,
		title: 'Cuervo Sombrío',
		description:
			'Un cuervo demasiado grande pasa volando encima tuyo, sus garras te atrapan y te mueven 12 casillas hacia atrás',
		image: 'https://pbs.twimg.com/media/Gz4WORlWcAAdRT5?format=png&name=900x900',
		points: '-7 pts',
		isVampireCard: false,
	},

	{
		id: 100,
		title: 'Daga Amenazante',
		description:
			'Una daga bastante filosa, si alguno de los vampiros presentes ha comprado un objeto, ¡robaselo! En Crimson no hay testigos.',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		points: '+4 pts',
	},
	{
		id: 101,
		title: 'Duelo Tenebroso',
		description:
			'Selecciona a otro compañero vampirico para desafíar. Libren un duelo del antiguo arte del piedra papel o tijera, el ganador se lleva los puntos, seleccionalo en la app.',
		points: '+10 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 102,
		title: 'Apuesta Sangrienta',
		description:
			'Tira un dado contra otro jugador. El número más alto gana los puntos vampiricos. Si empatan, repiten hasta que uno venza.',
		points: '+7 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 103,
		title: 'Reflejo Maldito',
		description:
			'Señala a un jugador y enfréntense en un duelo de miradas. El primero que parpadee pierde. Selecciona al ganador en la app.',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		points: '+5 pts',
		isVampireCard: true,
	},
	{
		id: 104,
		title: 'Duelo Menos Uno',
		description:
			'Selecciona a otro compañero vampirico para desafíar. Libren un duelo de piedra papel o tijera MENOS UNO, el ganador se lleva los puntos, seleccionalo en la app.',
		points: '+10 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 105,
		title: 'Cruz Carmesí',
		description: 'Haz un duelo de pulseada (rápida) con otro jugador. El ganador recibe los puntos.',
		points: '+6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 106,
		title: 'Chillido Vampírico',
		description:
			'Elige un jugador y grita juntos un chillido vampírico. El que lo haga más dramático (a votación de los demás) gana. Seleccionalo en la app.',
		points: '+6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 107,
		title: 'Amigos inseparables',
		description:
			'Selecciona un jugador y vuelvelo tu amigo inseparable. Teletransportalo a tu casilla. ¿Bendición o maldición? ¡Cuidado con que no sea el infectado!',
		points: '+5 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 108,
		title: 'Viaje de negocios',
		description:
			'Te encuentras con el mercader andante, te ofrece un viaje en su carruaje, lo que no sabes es que en realidad es una trampa consumista, te obliga a comprar uno de sus productos! Teletransportarte a la tienda y compra algo.',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		points: '+5 pts',
		isVampireCard: false,
	},
	{
		id: 109,
		title: 'Dado de la Desgracia',
		description:
			'Reta a otro jugador a tirar un dado. Quien saque el número más bajo pierde y el ganador se lleva los puntos. Selecciona al ganador en la app.',
		points: '+7 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 110,
		title: 'Baile de Medianoche',
		description: 'Participas en el baile secreto de los vampiros. La música oscura te llena de vida.',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		points: '+4 pts',
		isVampireCard: false,
	},
	{
		id: 111,
		title: 'Sueño Reparador',
		description:
			'Descansas en un ataúd de terciopelo. Te despiertas más fuerte que nunca… Pero despiertas en el ataud del inicio del tablero. ¿Sonambulismo? Mueve tu ficha al inicio',
		points: '+14 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: false,
	},
	{
		id: 112,
		title: 'La tirada vampirica',
		description:
			'Tira un dado contra otro jugador. El número más alto PIERDE!. Si empatan, repiten hasta que uno venza. Selecciona el vampiro perdedor en la app',
		points: '+7 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 113,
		title: 'Pan Bendito',
		description: 'Un aldeano dejó pan bendito en tu guarida. El olor te debilita horriblemente.',
		points: '-6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: false,
	},
	{
		id: 114,
		title: 'La tirada vampirica',
		description:
			'Tira un dado contra otro jugador. El número más alto PIERDE!. Si empatan, repiten hasta que uno venza. Selecciona el vampiro perdedor en la app',
		points: '+7 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 115,
		title: 'Candelabro Caído',
		description: 'Un candelabro se desploma en la cripta y casi te aplasta. Mala fortuna.',
		points: '-6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: false,
	},
	{
		id: 116,
		title: 'Campanas Hirientes',
		description: 'Las campanas de la iglesia suenan y hieren tus oídos inmortales.',
		points: '-6 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: false,
	},
	{
		id: 117,
		title: 'Dados del destino',
		description:
			'Los dados se transformaron, son los dados del destino! lanzalos y retrocede las casillas que indiquen.',
		points: '-5 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: false,
	},
	{
		id: 118,
		title: 'Llamarada Sagrada',
		description: 'Un rayo de luz entra en la cripta. Retrocede 2 casillas y pierdes vitalidad.',
		points: '-6 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 119,
		title: 'La voz de La Luna',
		description: 'La luna te llama, eres el elegido. Lanza los dados y avanza las casillas que indiquen.',
		points: '+4 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 120,
		title: 'Seis Vampiritos',
		description:
			'Seis Vampiritos crearon un duelo. Reta al jugador a tu derecha a un duelo de seis. Cada uno agarre un dado y tirelo repetidamente, el primero en sacar el número 6 gana. Selecciona el ganador en la app.',
		points: '+6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 121,
		title: 'Moneda Maldita',
		description:
			'Lanza una moneda contra otro jugador. Si sale cara, tú ganas. Si sale sello, gana tu oponente. Selecciona el ganador en la app.',
		points: '+5 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 122,
		title: 'Pulso Oscuro',
		description: 'Reta a un jugador a un duelo de pulgares rápidos. El ganador absorbe la fuerza del otro.',
		points: '+6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 123,
		title: 'Número Oculto',
		description:
			'Elige en secreto un número del 1 al 5 contra otro jugador. Revelen al mismo tiempo. El que haya pensado en el número más alto gana los puntos. Selecciona el ganador en la app',
		points: '+5 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 124,
		title: 'Adivina Oscura',
		description:
			'Selecciona a un vampiro como tu rival. Piensa en un número del 1 al 5. Si tu rival lo adivina, él gana. Si falla, ganas tú.',
		points: '+8 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 125,
		title: 'Duelo Tenebroso 2',
		description:
			'Selecciona a otro compañero vampirico para desafíar. Libren un duelo del antiguo arte del piedra papel o tijera, No pierdas, pues se te restarán puntos, selecciona al perdedor en la app.',
		points: '-10 pts',
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
		isVampireCard: true,
	},
	{
		id: 126,
		title: 'Cham Carmesí',
		description:
			'Reta a un jugador al duelo coreano "Cham Cham Cham". Paso a paso: 1) Mira a tu rival y di en voz alta: "Cham Cham Cham". 2) Al terminar de decir la frase, ambos apunten con su dedo rápidamente hacia la izquierda o derecha. 3) Si el rival señaló hacia el mismo lado que señalaste, ganas tú. Si señaló al lado contrario, gana él.',
		points: '+10 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 127,
		title: 'Adivina o Muere',
		description:
			'Selecciona a tu rival, dile que esconde un dado en una mano, sin que tú veas. Si adivinas en cuál está, ganas. Si fallas, tu rival se lleva los puntos.',
		points: '+6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 128,
		title: 'Destino Sellado',
		description:
			'Ambos jugadores levantan un pulgar al mismo tiempo (arriba o abajo). Si coinciden, gana el desafiante. Si no, gana el otro.',
		points: '+7 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 129,
		title: 'Dedo Sangriento',
		description:
			'Ambos jugadores muestran un número con los dedos al mismo tiempo. Si el total es par, gana el desafiante. Si es impar, gana el otro. Selecciona al perdedor en la app',
		points: '-6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 130,
		title: 'Bullying Sombrío',
		description:
			'Las paredes se ríen de ti mientras caminas por los pasillos de Crimson. Sí, te están haciendo bullying. Pierdes Aura',
		points: '-4 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 131,
		title: 'Risa Macabra',
		description:
			'Ambos deben reír como vampiros. El grupo vota cuál fue la más convincente. El ganador obtiene los puntos.',
		points: '+7 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 132,
		title: 'Secreto Carmesí',
		description:
			'Elige al mejor contrincante vampírico. Piensa en un color del tablero. Tu rival debe adivinarlo en un intento. Si acierta, gana él. Si falla, ganas tú.',
		points: '+8 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 133,
		title: 'Choque Carmesí',
		description:
			'Selecciona un rival, a la cuenta de 3 ambos muestran un número con los dedos. Si suman 7 exacto, ganas tú. Si no, gana tu rival.',
		points: '+9 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 134,
		title: 'Golpe Silencioso',
		description: 'Ambos ponen sus manos listas para chocar. El primero en aplaudir cuando alguien diga “¡ya!” gana.',
		points: '+6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 135,
		title: 'Suspiro Mortal',
		description:
			'Selecciona a un rival, Ambos deben aguantar la respiración. El primero en soltar aire pierde. Selecciona el perdedor en la app. Una disculpa a los vampiros con poca capacidad pulmonar ',
		points: '-7 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 136,
		title: 'Última Mirada',
		description: 'Mírate con tu rival. El primero que se ría o mire a otro lado pierde.',
		points: '+7 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 137,
		title: 'Crujido Maldito',
		description: 'Un ataúd se abre de golpe y el susto te hace tambalear. Pierdes algunos puntos en el proceso.',
		points: '-4 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 138,
		title: 'Futbolito Sombrío',
		description:
			'Los vampiros también juegan fútbol, ¿Quién dijo que no? Con un dado como balón, delimiten una cancha sobre la mesa. Usa tus dedos como si fueran pies y empuja el balón. El primero en anotar un gol gana el duelo.',
		points: '+10 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 139,
		title: 'Reflejo Veloz',
		description:
			'Coloca un dado en el centro de la mesa. A la señal, ambos deben atraparlo. Quien lo tome primero gana el duelo.',
		points: '+9 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 140,
		title: 'Pesadilla Despierta',
		description:
			'¿Qué comiste anoche? La sopa de ajo no fue la mejor decisión. Confundes la realidad con tus sueños oscuros por culpa de la sazón. Pierdes claridad y puntos.',
		points: '-5 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 141,
		title: 'El Voto Oculto',
		description:
			'Todos los jugadores votan señalando a otro. El que reciba más votos pierde puntos. ¿Injusto? Tal vez, pero siempre debe haber un sacrificio, bienvenidos a Crimson!',
		points: '-6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 142,
		title: 'El Voto Feliz',
		description:
			'Todos los jugadores votan señalando a otro. El que reciba más votos gana puntos. ¿Caridad? ¡Convence a los demás que eres digno de esos puntos!',
		points: '+14 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 143,
		title: 'Cadena de Risas',
		description:
			'Un jugador comienza riéndose como vampiro. Cada uno debe continuar la risa sin cortar la cadena. Si alguien falla, pierde puntos. Selecciona al perdedor',
		points: '-6 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 144,
		title: 'La Mirada Colectiva',
		description:
			'Todos deben mirarse fijamente entre sí durante 10 segundos sin reírse. Si alguien se ríe, ese jugador pierde puntos.',
		points: '-7 pts',
		isVampireCard: true,
		image: 'https://pbs.twimg.com/media/Gz4WUeEXEAAVRuK?format=png&name=900x900',
	},
	{
		id: 666,
		title: 'Ojo de Murcielago',
		description:
			'Un ojo que nunca parpadea… porque está seco desde hace siglos. Aun así, revela más de lo que quisieras. Puedes ver el rol secreto de un jugador en tu misma locación.',
		points: '-25 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz8sbtbW4AAIK-N?format=jpg&name=900x900',
	},
	{
		id: 999,
		title: 'Ajo Sombrío',
		description:
			'Un ajo tan viejo y oscuro que ya ni sirve para cocinar. Pero vaya que espanta. Elige un jugador: queda paralizado y no podrá moverse en su próximo turno.',
		points: '-30 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz8svalWkAAFppl?format=jpg&name=900x900',
	},
	{
		id: 777,
		title: 'Pluma de Cuervo',
		description:
			'Una pluma caída de un cuervo que aún grazna en sueños. Al sostenerla, el viento susurra tu destino y te permite volar (o al menos simularlo). Puedes moverte a la localidad que quieras.',
		points: '-30 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz8ssr6W8AA_U0-?format=jpg&name=900x900',
	},
	{
		id: 333,
		title: 'Caliz Carmesí',
		description:
			'Antiguo, elegante y con dudosos estándares de higiene. Si lo levantas al cielo, la luna sonríe irónicamente y las posiciones cambian. Elige a un jugador y cámbiate de lugar con él.',
		points: '-30 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz8sp4vWsAA_IlR?format=jpg&name=900x900',
	},
	{
		id: 222,
		title: 'Colmillo de plata',
		description:
			'Dicen que perteneció a un vampiro supersticioso con pésima dentadura. Ahora es tu amuleto. Si alguien usa un objeto contra ti, este colmillo anula su acción maligna.',
		points: '-25 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz8skkQXkAEmfCv?format=jpg&name=900x900',
	},
	{
		id: 888,
		title: 'Daga de Hueso',
		description:
			'Forjada con tibias de algún pobre desdichado. La amenaza es silenciosa pero clara: obligas a un jugador de tu misma localidad a mudarse a otra, por tu seguridad.',
		points: '-25 pts',
		isVampireCard: false,
		image: 'https://pbs.twimg.com/media/Gz8sgxaXoAAyiKW?format=jpg&name=900x900',
	},
];
