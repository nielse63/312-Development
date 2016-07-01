
(function(_c) {
	'use strict';

	var controller;

	function bannerScroll() {
		var $banner  = $('.banner');
		var $title   = $('.banner-title');
		var offset   = $banner[0].offsetTop;
		var duration = $title.offset().top + $title.outerHeight() - offset;

		new ScrollMagic.Scene({
			duration : duration,
			offset : offset,
		})
		.on('enter', function() {
			$title.addClass('no-trans');
			this.off('enter');
		})
		.setTween($title[0], {
			y       : '-50vh',
			opacity : 0,
		})
		.addTo(controller);
	}

	function initBanner() {

		if( ! $('.banner').length ) {
			return;
		}

		if( controller ) {
			controller.destroy(true);
		}
		controller = new ScrollMagic.Controller();

		// bind banner scroll listener
		_c.$('.banner-title').each(function() {
			_c.$(this).one(_c.support.transition.end, function() {
				bannerScroll();
			});
		});
	}

	_c.$doc.on('ready loadready loaded', initBanner);

})(window.Clique);
