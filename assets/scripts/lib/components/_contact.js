
(function(_c) {

	function initContact() {

		$inputs = $('input:not([type="submit"]), textarea', '.form');

		if( ! $inputs.length ) {
			return;
		}

		$inputs.each(function() {

			var $input = $(this);
			var $parent = $input.parent('.input-wrapper');

			$input.on('focus', function() {
				$parent.addClass('focus');
			}).on('blur', function() {
				if( ! $(this).val() ) {
					$parent.removeClass('focus');
				}
			});
		});
	}


	_c.$doc.on('ready loaded', initContact);

})(window.Clique);
