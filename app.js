const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const server = require('http').createServer(app);
const redis = require('./modules/redis-lib');
const shortener = require('./modules/url-shortener');

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));


const hostname = 'localhost:3000';

app.get('/', (req, res) => {

	res.render('index');

});

app.get('/:shortenURL', (req, res) => {

	const sURL = req.params.shortenURL;

	redis
		.getURL(sURL)
		.then(data => {
			if(data) console.log(data);
		})
		.catch(err => {
			console.log(err);
		});
});

app.post('/submit', (req, res) => {

	const sURL = shortener.generate();
	const oURL = req.body.originalURL;
	let urls,
		counts = [],
		results = [];

	redis
		.writeURL(sURL, oURL)
		.then(data => {
			if(data) console.log('wrote OK');
			return redis.initCount(sURL);
		})
		.then(data => {
			if(data) console.log('count initiated');
			return redis.getURLs();
		})
		.then(data => {
			urls = data;
			return redis.getCounts();
		})
		.then(data => {
			counts = data;

			keys = Object.keys(urls);

			for(var i = 0; i < keys.length; i++) {

				let item = { name: keys[i], count: counts[keys[i]], oURL: urls[keys[i]]};

				results.push(item);
			}

			res.render('index', { results });

		})
		.catch(err => {
			console.log(err);
		});
});




server.listen(3000, () => {
	console.log(`LISTENING ON: localhost:3000`);
});