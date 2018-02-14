// Express
const express = require('express');
const app = express();

// Socket.io
const server = require('http').createServer(app);
const sockets = require('./lib/controllers/sockets')(server);

app.use('/socket.io', express.static(__dirname + 'node_modules/socket.io-client/dist/'));

// Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

// Router
const routes = require('./lib/controllers/routes')(sockets);
app.use('/', routes);

// Server
const env = require('./env');
server.listen(env.port, env.hostname, () => {
	console.log(`LISTENING ON ${ env.hostname }:${ env.port }`);
});