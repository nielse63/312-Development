
(function(_c) {

	function initServices() {

		// get all elements
		$figures = $('.where-figure');
		if( ! $figures.length ) {
			return;
		}

		// 'where i work' transition delay
		$figures.each(function(i) {
			var delay = i * 0.15;
			$(this).css({
				'transition-delay' : delay + 's'
			});
		});

		// where i work scroll listener
		var controller = new ScrollMagic.Controller();
		container = document.querySelector('.where-i-work');
		scroll = new ScrollMagic.Scene({
			triggerElement : container,
		})
		.setClassToggle(container, 'active')
		.on('start', function() {
			this.remove();
		})
		.addTo(controller);
	}

	_c.$doc.on('ready loaded', initServices);

})(window.Clique);
