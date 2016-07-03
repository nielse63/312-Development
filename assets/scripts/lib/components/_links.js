
export default class Links {

	constructor() {
		_c.$( '.main a:not(.button):not([data-text])' ).each( function() {
			const $link = _c.$( this );
			const text = $link.text();

			if ( $link.closest( '.work-block' ).length ) {
				return;
			}

			$link.attr( {
				'data-text': text,
			} );
		} );
	}
}
