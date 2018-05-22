

define([
	'require',
], function(require) {
	function message_success(content, delay) {
		var message = $('#message');
		message.show().addClass('message-success').children('.content:first').text(content)
		.prev().removeClass('fa-times-circle').addClass('fa-check-circle-o');
		setTimeout(function() {
			message.show().removeClass('message-success');
		}, 1500);
    }

    function message_error(content, delay) {
		var message = $('#message');
		message.show().addClass('message-error')
		.children('.content:first').text(content).prev().removeClass('fa-check-circle-o').addClass('fa-times-circle')
		setTimeout(function() {
			message.show().removeClass('message-error');
		}, 2000);
    }

	return {
		message: {
            success: message_success,
            error: message_error
        }
	}
});