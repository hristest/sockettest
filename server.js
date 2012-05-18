
var http = require('http'),
	nodeStatic = require('node-static'),
	io = require('socket.io'),
	util = require('util');

var server = http.createServer(function(request, response){

	var staticServer = new nodeStatic.Server('./public', {'cache':false});

	request.addListener('end', function() {
		staticServer.serve(request, response);
	});
});

io = io.listen(server);
server.listen(8000);

//console.log(util.inspect(io.sockets));
io.sockets.on('connection', function(socket){

	socket.on('chatMessage', function(data){
		io.sockets.emit('chatMessage', {'message':data.message});
	});
});

