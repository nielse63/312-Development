
import colorbrewer from '../utils/_colorbrew';
import tinycolor from 'tinycolor2';
import ScrollMagic from 'scrollmagic';

export default class WorkGrid {

	constructor() {
		this.$workBlocks = $( '.work-block' );
		if ( ! this.$workBlocks.length ) {
			return;
		}

		this.section = document.querySelector( '.work-section' );

		this.init();
	}

	init() {
		this.colorizeWorkBlocks();
		this.blockHover();
		this.scrollWorkGrid();
	}

	getRandomColor() {
		const keys = Object.keys( colorbrewer );
		const key = keys[Math.floor( Math.random() * keys.length )];
		const array = [];
		for ( const i in colorbrewer[key] ) {
			const v = colorbrewer[key][i];
			array.push( v );
		}
		return array.pop();
	}

	colorizeWorkBlocks() {
		const colors = this.getRandomColor();
		let idx = 0;
		this.$workBlocks.each( function() {
			const $ele = $( this );
			if ( $ele.data( 'colorset' ) ) {
				return;
			}

			$ele.data( 'colorset', true );
			let color;
			if ( ! colors[idx] ) {
				idx = 0;
			}
			color = colors[idx];

			const tc = tinycolor( color );

			// create gradient
			const darker = tc.darken( 35 ).toHexString();
			const gradient = 'linear-gradient(150deg, ' + darker + ', ' + color + ')';

			// get luma
			const rgb = tc.toRgb();
			const luma = ( rgb.r * 0.3 ) + ( rgb.g * 0.59 ) + ( rgb.b * 0.11 );
			if ( luma > 215 ) {
				$ele.addClass( 'dark' );
			}

			// set style
			$ele.css( {
				'background-image': gradient,
			} );
			idx++;
		} );
	}

	blockHover() {
		// bind work blocks scroll listener
		this.$workBlocks.each( function( i ) {
			const $ele = $( this );

			$ele.off( 'mouseenter mouseleave' );
			$ele.on( 'mouseenter', function() {
				$( this ).find( '.work-block-figure' ).addClass( 'hovering' );
			} ).on( 'mouseleave', function() {
				$( this ).find( '.work-block-figure' ).removeClass( 'hovering' );
			} );
		} );
	}

	scrollWorkGrid() {
		const section = this.section;
		let working = false;
		const $workBlocks = this.$workBlocks;

		this.scene = new ScrollMagic.Scene( {
			triggerElement: section,
			duration      : section.clientHeight,
		} )
		.on( 'progress', function( e ) {
			if ( working ) {
				return;
			}
			working = true;
			$workBlocks.filter( ':not(.hovering)' ).each( function( i ) {
				const $ele = $( this );
				const $figure = $ele.find( '.work-block-figure' );
				let diff = $figure.data( 'diff' );
				if ( ! diff ) {
					diff = $ele.outerHeight() - $figure.outerHeight();
					$figure.data( 'diff', diff );
				}
				const y = diff * e.progress * ( i % 2 === 0 ? -1 : 1 );
				$figure.css( {
					transform: 'translateY(' + y + 'px)',
				} );
			} );
			working = false;
		} )
		.addTo( _c.controller );
	}
}
