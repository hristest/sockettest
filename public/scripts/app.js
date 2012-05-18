

$(function(){

	var socket = io.connect('http://localhost:8000');

	$('#infoBox').hide();

	socket.on('chatMessage', function(data){
		var messageLength = data.message.length;

		if(messageLength > 0 && messageLength < 10){
			$('#messageList').prepend($('<li>',{ 'text':data.message, class:'message'}));
		}
	});

	$('#mainForm').on('submit', function(e) { 
		e.preventDefault();
		var $inputBox = $('#messagetxt');
		socket.emit('chatMessage', {'message':$inputBox.val()});

		$inputBox.val('');
	});

	$('#messagetxt').on('keydown', function(e){
		var messageLength = $(this).val().length;
		if(messageLength > 10){
			
			$('#infoBox').text('Max character limit reached : 50');
			$('#infoBox').slideDown();
			$('#infoBox').on('click',function(){
				$(this).slideUp();
			});
			
		}
		else{
			$('#infoBox').slideUp();

		}

	});

});

