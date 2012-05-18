

$(function(){

	var socket = io.connect('http://10.8.0.21:8000');

	$('#submitbtn').on('click',function(){
		socket.emit('chatMessage', {'message':$('#messagetxt').val()});
	});

	socket.on('chatMessage', function(data){
		$('#messageList').prepend($('<li>',{ 'text':data.message, class:'message'}));
	});
});

