
export default class Share {

	constructor() {
		const SHARE = {
			modal  : null,
			loaded : {
				gplus     : false,
				facebook  : false,
				twitter   : false,
				pinterest : false,
			},
			data : {
				title       : '',
				description : '',
				image       : '',
				url         : '',
			},
			load : {

				googleplus() {
					_c.$body.append('<script src="//apis.google.com/js/client:platform.js" async defer></script>');
				},

				facebook() {
					window.fbAsyncInit = function() {
						return window.FB.init({
							appId   : '834389063291117',
							xfbml   : true,
							version : 'v2.4',
						});
					};
					(function(d, s, id) {
						const fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id)) {
							return;
						}
						const js = d.createElement(s);
						js.id = id;
						js.src = '//connect.facebook.net/en_US/sdk.js';
						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));
				},

				twitter() {
					_c.$body.append('<script src="//platform.twitter.com/widgets.js" async defer></script>');
				},
			},

			share : {

				facebook(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');

					if (!SHARE.data.url) {
						throw new Error('No URL provided for Facebook share button.');
					}
					window.FB.ui({
						method : 'share',
						href   : SHARE.data.url,
					}, function(response) {
						_c.$doc.trigger('didshare.clique.dom', [{
							service : 'facebook',
							response,
							target  : btn,
						}]);
					});
				},

				googleplus(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');
					if (!SHARE.data.url) {
						throw new Error('No URL provided for Google+ share button.');
					}

					function share() {
						window.gapi.client.load('plus', 'v1').then(function() {
							const shareUrl = SHARE.data.url;
							const url = 'https://plus.google.com/share?url=' + shareUrl;
							_c.utils.openWindow(url);
						});
					}

					window.gapi.load('auth2', function() {
						const auth2 = window.gapi.auth2.init({
							client_id : '507239089267-8c37f28d595ct2ubpfpbbsa7jlue6o3b.apps.googleusercontent.com',
							scope     : 'profile',
						});
						auth2.then(function() {
							if (!auth2.isSignedIn.get()) {
								auth2.isSignedIn.listen(function(signedin) {
									if (signedin) {
										share(auth2.currentUser.get().getBasicProfile());
										return;
									}
								});
								auth2.signIn();
								return
							}
							share(auth2.currentUser.get().getBasicProfile());
						});
					});
				},

				twitter(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');
					if (! SHARE.data.url) {
						throw new Error('No URL provided for Twitter share button.');
					}
					if (btn.attr('href') === SHARE.data.url) {
						return;
					}
					window.twttr.events.bind('tweet', function(e) {
						_c.$doc.trigger('didshare.clique.dom', [{
							service  : 'twitter',
							response : e,
							target   : btn,
						}]);
					});
					btn.attr('href', SHARE.data.url);
					btn.off('click').trigger('click');
				},

				linkedin(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');
					if (!SHARE.data.url) {
						throw new Error('No URL provided for LinkedIn share button.');
					}
					return _c.utils.openWindow(SHARE.data.url);
				},
			},
		};

		function activateShareButton(ele, g, method) {
			if (ele.length && typeof SHARE.load[method] !== 'undefined') {
				ele.addClass('disabled');
				let interval = setInterval(function() {
					if (window[g]) {
						clearInterval(interval);
						interval = null;
						ele.removeClass('disabled');
					}
				}, 50);
				SHARE.load[method]();
			}
		}

		function loadInstances() {
			if (_c.$('[data-retweet]').length) {
				if (document.readyState === 'complete') {
					SHARE.load.twitter();
				} else {
					_c.$win.one('load', SHARE.load.twitter);
				}
			}

			_c.$('[data-share]').each(function() {
				const ele = _c.$(this);
				const type = ele.data('share');
				if (!SHARE.loaded[type]) {
					let _global;
					switch (type) {
						case 'googleplus':
							_global = 'gapi';
							break;

						case 'twitter':
							_global = 'twttr';
							break;

						case 'pinterest':
							_global = 'PDK';
							break;

						case 'facebook':
						default:
							_global = 'FB';
							break;
					}

					if (!_global || !_c.utils.isString(type)) {
						return;
					}
					activateShareButton(ele, _global, type);
					SHARE.loaded[type] = true;
				}
			});
		}

		const cb = function(e) {
			e.preventDefault();
			const type = _c.$(this).data('share');
			return SHARE.share[type](_c.$(this));
		};

		_c.$html.off('click', '[data-share]', cb);
		_c.$html.on('click', '[data-share]', cb);

		const selector = '[data-retweet], [data-share]';
		let checked = 0;
		let interval = setInterval(function() {
			if (checked > 12 || _c.$(selector).length) {
				clearInterval(interval);
				interval = null;
				loadInstances();
			}

			checked++;
		}, 250);

		return this;
	}
}
