
(function(_c) {
	'use strict';

	var CACHE = {};

	function shouldFetchPage(a) {
		if( a instanceof jQuery  ) {
			a = a[0];
		}

		if(a.target ||
			! a.href ||
			a.hasAttribute('data-share') ||
			a.href.indexOf('tel') === 0 ||
			a.href.indexOf('mailto') === 0 ||
			a.hasAttribute('download') ||
			a.href.indexOf( window.location.protocol + '//' + window.location.host ) < 0 ||
			a.href[0] === '#') {
			return false;
		}
		return true;
	}

	function getURL(url) {
		if( CACHE[url] ) {
			return CACHE[url];
		}

		return fetch(url).then(function(response) {
			if( ! response.ok ) {
				throw new Error('Unable to fetch ' + response.url + '. Status ' + response.status);
			}
			return response.text();
		})
		.then(function(html) {
			CACHE[url] = html;
			return html;
		});
	}

	function displayHTML(html) {
		if( ! html ) {
			throw new Error('No HTML passed to function');
		}
		var $bodyWrap = _c.$('.body-wrap');
		$bodyWrap.addClass('loaded');
		_c.$('html').removeClass('loaded');

		// cache existing dom objects
		$bodyWrap.addClass('transition-out-wrapper');
		var $curMain = _c.$('.transition-out-wrapper');

		var _doc = document.implementation.createHTMLDocument('');
		_doc.documentElement.innerHTML = html;
		var title = _doc.title;
		var $main = _c.$(_doc.body).find('.body-wrap');
		$main.addClass('transition-in-wrapper');

		$curMain.before( $main );

		// reinit sage
		_c.$body.removeAttr('class');
		var slug = _c.utils.makeSlug(CACHE.currentURL);
		_c.$body.addClass('page-' + (slug ? slug : 'home'));
		window.Sage.UTIL.loadEvents();

		_c.$html.addClass('transitioning');

		$curMain.one(_c.support.animation.end, function(e) {
			$(this).remove();
		});

		$main.one(_c.support.animation.end, function(e) {
			_c.$html.removeClass('transitioning');

			// update history
			window.history.pushState(null, title, CACHE.currentURL);

			// re-add html class
			setTimeout(function() {
				_c.$html.addClass('loaded');
				_c.$('.body-wrap').attr('class', 'body-wrap');
				_c.$doc.trigger('loaded');
			}, 0);
		});

		// add new page
		setTimeout(function() {
			$curMain.addClass('leaving');
			$main.addClass('coming');
		}, 0);
	}

	function loadURL(url) {
		CACHE.currentURL = url;
		var returnVal = getURL( url );
		var t = setTimeout(function() {

			clearTimeout(t);
			t = null;

			if( typeof returnVal !== 'string' && !! returnVal.then ) {
				returnVal.then(displayHTML);
			} else {
				displayHTML(returnVal);
			}
		}, 100);
	}

	var timestamp;
	function mobileTransitionEndHandler(e) {
		timestamp = _c.utils.now();
	}

	if( ! _c.support.touch ) {

		_c.$html.on('click', 'a', function(e) {
			if( shouldFetchPage( this ) ) {
				e.preventDefault();
				var url = this.href;
				if( _c.$html.hasClass('menu-open') ) {
					var interval = setInterval(function() {
						if( ! timestamp ) {
							return;
						}
						var diff = _c.utils.now() - timestamp;
						if( diff < 175 ) {
							return;
						}

						// reset counter;
						clearInterval(interval);
						interval = null;

						// unbind listener
						_c.$('.body-wrap').off(_c.support.transition.end, mobileTransitionEndHandler);

						// reset timestamp var
						timestamp = undefined;

						// exec function
						loadURL(url);
					}, 150);
					_c.$('.body-wrap').on(_c.support.transition.end, mobileTransitionEndHandler);
				} else {
					loadURL(url);
				}
			}
		});

		_c.$(window).one('load', function() {
			CACHE[window.location.href] = _c.$html[0].outerHTML;
		});

		window.onpopstate = function(e) {
			loadURL( document.location.href );
		};
	}

})(window.Clique);
