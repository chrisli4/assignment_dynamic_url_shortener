const client = require('redis').createClient();

const appKey = 'URL_HASH';
const countKey = 'COUNT_HASH';

const writeURL = (shortenURL, originalURL) => {
	return new Promise((resolve, reject) => {
		client.hsetnx(appKey, shortenURL, originalURL, (err, data) => {
			if(err) 
				reject(err);
			else
				resolve(data);
		});
	});
};

const getURL = (shortenURL) => {
	return new Promise((resolve, reject) => {
		client.hget(appKey, shortenURL, (err, data) => {
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
};

const getURLs = () => {
	return new Promise((resolve, reject) => {
		client.hgetall(appKey, (err, data) => {
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
};

const initCount = (shortenURL) => {
	return new Promise((resolve, reject) => {
		client.hset(countKey, shortenURL, 0, (err, data) => {
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
};

const getCount = (shortenURL) => {
	return new Promise((resolve, reject) => {
		client.hget(countKey, shortenURL, (err, data) => {
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
};

const getCounts = () => {
	return new Promise((resolve, reject) => {
		client.hgetall(countKey, (err, data) => {
			if(err)
				reject(err)
			else
				resolve(data);
		});
	});
};

const incr = (shortenURL) => {
	return new Promise((resolve, reject) => {
		client.hincrby(countKey, shortenURL, 1, (err, data) => {
			if(err)
				reject(err);
			else
				resolve(data);
		});
	});
};

module.exports = {
	writeURL,
	getURL,
	getURLs,
	initCount,
	getCount,
	getCounts,
	incr
}

