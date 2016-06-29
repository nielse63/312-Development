
(function(_c) {
	'use strict';

	function setupFooter() {
		var $paths = $('.footer path');
		var controller = new ScrollMagic.Controller();
		$paths.each(function() {
			var $path  = $(this);
			var length = this.getTotalLength();
			$path.css({
				'stroke-dasharray'  : length,
				'stroke-dashoffset' : length,
			}).data('length', length);
		});

		var footer = document.querySelector('.footer');
		var _scroll = new ScrollMagic.Scene({
			triggerElement : footer,
			triggerHook    : 'onEnter',
			offset         : footer.clientHeight / 2,
		})
		.setClassToggle(footer, 'inview')
		.addTo(controller);
	}

	_c.$doc.on('ready loaded', setupFooter);

})(window.Clique);
