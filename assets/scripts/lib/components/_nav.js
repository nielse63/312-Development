
(function(_c) {
	'use strict';

	function initActiveLine() {
		var $line = _c.$('.body-wrap').last().find('.nav-menu .line');

		// guards
		if( ! $line.is(':visible') ) {
			return;
		}

		var $items  = $line.prevAll('li');
		var $active = $items.filter('.active');
		var timeout;
		var hovering = false;

		function setActiveLine($ele) {
			var left  = $ele.position().left + parseFloat( $ele.css('margin-left') ) + parseFloat( $ele.css('padding-left') );
			var width = $ele.width();

			$line.css({
				transform : 'translate(' + left + 'px, 0)',
				width : width
			});
		}

		setActiveLine( $active );
		$items.each(function() {
			$(this).off('mouseenter mouseleave');
			$(this).on('mouseenter', function() {
				hovering = true;

				if( timeout ) {
					clearTimeout(timeout);
					timeout = null;
				}

				var $this = $(this);
				var t = setTimeout(function() {
					if( ! hovering ) {
						clearTimeout(t);
						t = null;
						return;
					}

					setActiveLine( $this );
				}, 150);
			}).on('mouseleave', function() {
				hovering = false;
				timeout = setTimeout(function() {
					setActiveLine( $active );
				}, 1000);
			});
		});
	}

	_c.$doc.on('ready loadready loaded', initActiveLine);

})(window.Clique);
