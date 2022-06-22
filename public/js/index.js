$(document).ready(function(){
	$('.visitor .counter').each(function(){
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		},{
			duration: 3500,
			easing: 'swing',
			step: function (now){
				$(this).text(Math.ceil(now));
			}
		});
	});
});