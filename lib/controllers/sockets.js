const socketio = require('socket.io');
const validUri = require('validate.io-uri');
const shortener = require('../shortener');


function init(server) {
	
	const io = socketio(server);

	io.on('connection', (client) => {

		client.on('click', (id) => {
			shortener
				.increment(id)
				.then(urlObj => {
					io.emit('update', urlObj);
				})
				.catch(err => {
					console.error(err);
				});			
		});

		client.on('shorten', (url) => {
			if(validUri(url)) {
				shortener
					.shorten(url)
					.then(urlObj => {
						io.emit('new', urlObj);
					})
					.catch(err => {
						console.error(err);
					});
			} else {
				io.emit('invalid');
			}
		});
	});

	return io;	

}

module.exports = init;