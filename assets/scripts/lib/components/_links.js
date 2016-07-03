
export default class Links {

	constructor() {
		_c.$('.main a:not(.button):not([data-text])').each(function() {

			let $link = _c.$(this);
			let text = $link.text();

			if( $link.closest('.work-block').length ) {
				return
			}

			$link.attr({
				'data-text' : text
			});
		});
	}
}
