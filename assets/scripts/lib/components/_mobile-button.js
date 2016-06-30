
(function(_c) {
	'use strict';

	var trigger  = $('.js-hamburger'),
		isClosed = !! _c.$html.hasClass('menu-open');

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

	// _c.$html.on('click', '.js-hamburger', function() {
	// 	console.log('howdy');
	// 	burgerTime();
	// });

})(window.Clique);
