const randomstring = require('randomstring');
const redis = require('./redis');
const env = require('../../env');

const shortener = {

	shorten: function(url) {
		const key = randomstring.generate({length: 5, charset: 'alphabetic'});

		return new Promise((resolve, reject) => {
			Promise
				.all([redis.set('urls', key, url), redis.set('counts', key, 0)])
				.then(([urlsObj, countsObj]) => {
					resolve(_buildObj(urlsObj, countsObj)[0])
				})
				.catch(err => reject(err));
		});
	},

	increment: function(key) {
		return new Promise((resolve, reject) => {
			Promise
				.all([redis.incr('counts', key, 1), redis.get('urls', key)])
				.then(([countsObj, urlsObj]) => {
					resolve(_buildObj(urlsObj, countsObj)[0])
				})
				.catch(err => reject(err));
		});
	},

	retrieve: function() {
		return new Promise((resolve, reject) => {
			Promise
				.all([redis.getAll('urls'), redis.getAll('counts')])
				.then(([urlsObj, countsObj]) => {
					resolve(_buildObj(urlsObj, countsObj));
				})
				.catch(err => reject(err));
		});
	}
}

const _buildObj = (urlsObj, countsObj) => {

	let urls = [],
		qualified = `${env.hostname}:${env.port}/s/`

	for(let id in urlsObj) {

		urls.push({
			qualified: `${ qualified }${ id }`,
			sURL: id,
			oURL: urlsObj[id],
			oURLPath: `//${ urlsObj[id] }`,
			count: countsObj[id]
		});
	};

	return urls;
}


module.exports = shortener;