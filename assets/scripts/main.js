
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($, _c, undefined) {
	'use strict';

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.

	var Sage = {

		//properties
		elements : {
			workBlocks : null,
			services   : null,
			charts     : null,
			inputs     : null
		},
		controller : null,
		supportsTouch : !! _c.support.touch,

		// All pages
		'common': {
			init: function() {

				if( ! _c.support.transition || ! _c.support.transition.end ) {
					_c.showLoading = false;
				}

				if( Sage.supportsTouch ) {
					_c.$html.addClass('touch');
				} else {
					_c.$html.addClass('no-touch');
				}
			},
			finalize: function() {
				// ...
			}
		},
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var fire;
			var namespace = Sage;
			funcname = funcname === undefined ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function() {

			// Fire common init JS
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').replace(/page_/g, '').split(/\s+/), function (i, classnm) {
				// console.log(classnm);
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};

	// Load Events
	// console.log(_c);
	_c.$doc.on('ready loaded', UTIL.loadEvents);

	Sage.UTIL = UTIL;
	window.Sage = Sage;
})(window.jQuery, window.Clique); // Fully reference jQuery after this point.
