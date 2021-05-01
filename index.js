const express = require('express');
const path = require('path');
const app = express();


//Node sockets serversss
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Sockets Messages



//Path público
const publicPath = path.resolve( __dirname, 'public');

//Settings
app.set('port',process.env.PORT || 3000);

//Starting server
server.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});


//Request
app.use(express.static(publicPath));
