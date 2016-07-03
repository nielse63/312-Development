
(function(_c) {

	function initSingle() {

		if( ! $('pre').length ) {
			return;
		}

		window.Prism.highlightAll(false, function() {
			var $code = $(this);
			var $pre = $code.parent('pre');
			$pre.wrapAll('<div class="single-blog-code" />');
		});
	}

	_c.$doc.on('ready loaded', initSingle);

})(window.Clique);
