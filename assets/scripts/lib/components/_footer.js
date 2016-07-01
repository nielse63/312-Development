
(function(_c) {
	'use strict';

	function setupFooter() {

		var $footer = $('.footer');
		var offsetTop = $footer.offset().top;
		var offsetBottom = offsetTop + $footer.outerHeight();

		var $paths = $footer.find('path');
		var controller = new ScrollMagic.Controller();
		$paths.each(function() {
			var $path  = $(this);

			// see if we even need to set object
			var rects  = $path[0].getBoundingClientRect();
			var top    = $path.offset().top;
			var bottom = top + rects.height;

			if( bottom < offsetTop || top > offsetBottom ) {
				return;
			}

			var length = this.getTotalLength();
			$path.css({
				'stroke-dasharray'  : length,
				'stroke-dashoffset' : length,
			});
		});

		var footer = document.querySelector('.footer');
		var _scroll = new ScrollMagic.Scene({
			triggerElement : $footer[0],
			triggerHook    : 'onEnter',
			offset         : $footer[0].clientHeight / 2,
		})
		.setClassToggle($footer[0], 'inview')
		.addTo(controller);
	}

	_c.$doc.on('ready loaded', setupFooter);

})(window.Clique);
