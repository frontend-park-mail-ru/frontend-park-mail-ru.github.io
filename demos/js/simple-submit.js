(function () {
	$('form').on('submit', function (event) {
		event.preventDefault();
		$('body').hide();
		setTimeout(function (){
			$('body').show();
			$('#info').text($('#input').val());
			$('#input').val('');
		},100)

	})
})();
