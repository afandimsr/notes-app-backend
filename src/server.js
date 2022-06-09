/* eslint-disable no-tabs */
/* eslint-disable indent */
// console.log('Helo kita akan memulai membuat Resful API\r\n');
'use strict';
const Hapi = require('@Hapi/hapi');
const routes = require('./routes');


const init = async () => {
	const server = Hapi.server({
		port: 5000,
		host: 'localhost',
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});
	server.route(routes);
	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
