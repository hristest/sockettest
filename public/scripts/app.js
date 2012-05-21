

$(function(){

	var port = 8000;
	var serverUrl = 'http://' + document.location.hostname;
	// console.log(serverUrl);
	var socket = io.connect(serverUrl);
	var maxLimitReached = false;

	$('#infoBox').hide();

	socket.on('chatMessage', function(data){
		var messageLength = data.message.length;

		if(messageLength > 0 && messageLength < 50){
			var displayMessage = data.name + ' : ' + data.message;
			var $newMessageBox = $('<li>',{ 'text':displayMessage, class:'message'});
			$newMessageBox.hide();
			$('#messageList').prepend($newMessageBox);
			$newMessageBox.fadeIn(200);
		}
	});

	function chatformSubmit(e) { 
		e.preventDefault();
		var $inputBox = $('#messagetxt');

		// message display
		var $myMessageBox = $('<li>',{ 'text':$inputBox.val(), class:'message myMessage'});
		$myMessageBox.hide();
		$('#messageList').prepend($myMessageBox);
		$myMessageBox.fadeIn(200);

		socket.emit('chatMessage', {'message':$inputBox.val()});

		$inputBox.val('');
	}

	$('#mainForm').on('submit', chatformSubmit);

	

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
			if(maxLimitReached) {
				$('#mainForm').on('submit', chatformSubmit);
			}
			
			maxLimitReached = false;
			$('#submitbtn').removeClass('disabled');
			$('#infoBox').slideUp();
			
		}

	});

	$('#submitbtn').on('click', function(){
		if(maxLimitReached){
			return false;
		}

	});

	function nameformSubmit(e) { 
		e.preventDefault();
		var $inputBox = $('#nametxt');
		socket.emit('setName', {'name':$inputBox.val()});
		$('#nameBox').slideUp();
		$('#chatBox').slideDown();
	}

	$('#nameForm').on('submit', nameformSubmit);

});













