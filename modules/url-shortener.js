const randomstring = require('randomstring');

const generate = () => {
	const rand = randomstring.generate({length: 5, charset: 'alphabetic'});
	const shortenURL = `${ rand }`;

	return shortenURL;
}

module.exports = {
	generate
}