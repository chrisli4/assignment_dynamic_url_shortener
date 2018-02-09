const randomstring = require('randomstring');

const generate = () => {
	const rand = randomstring.generate({length: 5, charset: 'alphabetic'});
	const shortenURL = `${ rand }`;

	return shortenURL;
}

const combine = (urls, counts) => {

	let results = [];

	if(urls == null || Object.keys(urls).length === 0)
		return results

	const ids = Object.keys(urls);
		  results = ids.map(id => {

		return { sURL: id, oURL: urls[id], count: counts[id] }

	});

	return results;
};

module.exports = {
	generate,
	combine
}