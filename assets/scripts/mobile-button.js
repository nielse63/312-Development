

(function(_c) {


	var trigger  = $('#hamburger'),
		isClosed = true;

	function burgerTime() {
		if( isClosed === true ) {
			trigger
				.removeClass('is-open')
				.addClass('is-closed');
			isClosed = false;
		} else {
			trigger
				.removeClass('is-closed')
				.addClass('is-open');
			isClosed = true;
		}
	}

	_c.$html.on('click', '#hamburger', function () {
		burgerTime();
	});

})(window.Clique);
