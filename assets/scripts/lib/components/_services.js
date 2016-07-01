
(function(_c) {

	function initServices() {

		// get all elements
		$services = $('.service-circle');
		if( ! $services.length ) {
			return;
		}

		// services transition delay
		$('.service').each(function() {
			var trigger = this;
			var ele = $(this);
			var elements = ele.find('.service-figure, p');
			var delay = Math.random();

			elements.css({
				'transition-delay' : delay + 's'
			});
		});

		// services scroll listener
		var controller = new ScrollMagic.Controller();
		var container = document.querySelector('.services');
		var scroll = new ScrollMagic.Scene({
			triggerElement : container
		})
		.setClassToggle(container, 'active')
		.on('start', function() {
			this.remove();
		})
		.addTo(controller);
	}

	_c.$doc.on('ready loaded', initServices);

})(window.Clique);
