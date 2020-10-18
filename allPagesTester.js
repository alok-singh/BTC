let routes = [
	'/',
	'/graph',
	'/history',
	'/sin',
	'/paint-ball',
	'/random-motion',
	'/defined-motion',
	'/change-logs',
	'/collisions'
];

routes.forEach(val => window.open(`https://localhost:8000${val}`));