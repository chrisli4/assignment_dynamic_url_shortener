const router = require('express').Router();
const shortener = require('../shortener');


function routes(io) {

	router.get('/', (req, res) => {
		shortener
			.retrieve()
			.then(urls => {
				res.render('index', { urls });
			})
			.catch(err => {
				console.error(err);
				res.redirect('/');
			});
	});

	router.post('/update', (req, res) => {
		shortener
			.shorten(req.body.originalURL)
			.then(urlObj => {
				console.log(urlObj);
				io.emit('new', urlObj);
				res.redirect('/');
			})
			.catch(err => {
				console.error(err);
				res.redirect('/');
			});
	});

	router.get('/s/:id', (req, res) => {

		shortener
			.increment(req.params.id)
			.then(urlObj => {
				io.emit('update', urlObj);
				res.redirect(urlObj.oURLPath);
			})
			.catch(err => {
				console.error(err.stack);
				res.redirect('/');
			});

	});

	return router;

};

module.exports = routes