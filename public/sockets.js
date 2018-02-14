$(document).ready(() => {

	let socket = io.connect('http://localhost:3000');

	socket.on('update', (urlObj) => {
		$(`#${ urlObj.sURL } .count`).text(urlObj.count);
	});

	socket.on('new', (urlObj) => {

		let newRow = $('<tr>').attr('id', urlObj.sURL);
		let shortLink = $('<a>').attr('href', urlObj.oURLPath).text(urlObj.oURL);
		newRow.append($('<td>').append(shortLink))

		let longLink = $('<a>')
       					.attr('href', urlObj.qualified)
       					.text(urlObj.qualified);

     	newRow.append($('<td>').append(longLink));
     	newRow.append($('<td>').addClass('count').text(urlObj.count));

		$('tbody').append(newRow);
	});

	$('.qualified').on('click', event => {
		socket.emit('click', $(event.target).attr('value'));
	});
});