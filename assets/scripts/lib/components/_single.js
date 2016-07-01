
(function(_c) {

	function initSingle() {

		if( ! $('pre').length ) {
			return;
		}
		console.log(window.Prism);

		window.Prism.highlightAll(false, function() {
			console.log(this);
			var $code = $(this);
			var $pre = $code.parent('pre');
			// var $syntax = $pre.prev('.prism-show-language');
			// if( $syntax.length ) {
			// 	$pre = $pre.add($syntax);
			// }
			$pre.wrapAll('<div class="single-blog-code" />');
		});
	}

	_c.$doc.on('ready loaded', initSingle);

})(window.Clique);
