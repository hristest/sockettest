
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
io.sockets.on('connection', function(client){

	client.on('setName', function(data){
		client.set('nickname', data.name, function(){
			var nameMessage = data.name + ' is in the house.'
			client.broadcast.emit('chatMessage', {'message': nameMessage, 'name': 'Admin'});
		});
	});

	client.on('chatMessage', function(data){
		client.get('nickname', function(err, name){
			client.broadcast.emit('chatMessage', {'message':data.message, 'name': name});
		});
	});
});

