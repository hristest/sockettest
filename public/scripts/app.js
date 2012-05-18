

$(function(){

	var socket = io.connect('http://localhost:8000');
	var maxLimitReached = false;

	$('#infoBox').hide();

	socket.on('chatMessage', function(data){
		var messageLength = data.message.length;

		if(messageLength > 0 && messageLength < 50){
			$('#messageList').prepend($('<li>',{ 'text':data.message, class:'message'}));
		}
	});

	function formSubmit(e) { 
		e.preventDefault();
		var $inputBox = $('#messagetxt');
		socket.emit('chatMessage', {'message':$inputBox.val()});

		$inputBox.val('');
	}

	$('#mainForm').on('submit', formSubmit);

	

	$('#messagetxt').on('keydown', function(e){
		var messageLength = $(this).val().length;
		if(messageLength == 50){
			maxLimitReached = true;
			$('#submitbtn').addClass('disabled');
			$('#infoBox').text('Max character limit reached : 50');
			$('#infoBox').slideDown();
			$('#infoBox').on('click',function(){
				$(this).slideUp();
			});
			$('#mainForm').off();
		}
		else{
			maxLimitReached = false;
			$('#submitbtn').removeClass('disabled');
			$('#infoBox').slideUp();
			$('#mainForm').on('submit', formSubmit);
		}

	});

	$('#submitbtn').on('click', function(){
		if(maxLimitReached){
			return false;
		}

	});

});













