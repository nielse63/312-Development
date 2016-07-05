
export default class Share {

	constructor() {
		var SHARE = {
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
					return _c.$body.append('<script src="//apis.google.com/js/client:platform.js" async defer></script>');
				},

				facebook() {
					window.fbAsyncInit = function() {
						return window.FB.init({
							appId   : '834389063291117',
							xfbml   : true,
							version : 'v2.4',
						});
					};
					return function(d, s, id) {
						var fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id)) {
							return;
						}
						var js = d.createElement(s);
						js.id = id;
						js.src = '//connect.facebook.net/en_US/sdk.js';
						return fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk');
				},

				twitter() {
					return _c.$body.append('<script src="//platform.twitter.com/widgets.js" async defer></script>');
				},
			},

			share : {

				facebook(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');

					if (!SHARE.data.url) {
						throw new Error('No URL provided for Facebook share button.');
					}
					return window.FB.ui({
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
						return window.gapi.client.load('plus', 'v1').then(function() {
							var shareUrl = SHARE.data.url;
							var url = 'https://plus.google.com/share?url=' + shareUrl;
							_c.utils.openWindow(url);
						});
					}

					return window.gapi.load('auth2', function() {
						var auth2 = window.gapi.auth2.init({
							client_id : '507239089267-8c37f28d595ct2ubpfpbbsa7jlue6o3b.apps.googleusercontent.com',
							scope     : 'profile',
						});
						return auth2.then(function() {
							if (!auth2.isSignedIn.get()) {
								auth2.isSignedIn.listen(function(signedin) {
									if (signedin) {
										var user = auth2.currentUser.get().getBasicProfile();
										return share(user);
									}
								});
								return auth2.signIn();
							} else {
								var user = auth2.currentUser.get().getBasicProfile();
								return share(user);
							}
						});
					});
				},

				twitter(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');
					if (! SHARE.data.url) {
						throw new Error('No URL provided for Twitter share button.');
					}
					// console.log(btn.attr('href'), SHARE.data.url);
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
					return btn.off('click').trigger('click');
				},

				linkedin(btn) {
					SHARE.data.url = btn.attr('href') ? btn.attr('href') : btn.attr('data-url');
					if (!SHARE.data.url) {
						throw new Error('No URL provided for LinkedIn share button.');
					}
					_c.utils.openWindow(SHARE.data.url);
				},
			},
		};

		function activateShareButton(ele, global, method) {
			if (ele.length && typeof SHARE.load[method] !== 'undefined') {
				ele.addClass('disabled');
				var interval = setInterval(function() {
					if (window[global]) {
						clearInterval(interval);
						return ele.removeClass('disabled');
					}
				}, 50);
				return SHARE.load[method]();
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
				var ele = _c.$(this),
					type = ele.data('share');
				if (!SHARE.loaded[type]) {
					var _global;
					switch (type) {
					case 'facebook':
						_global = 'FB';
						break;

					case 'googleplus':
						_global = 'gapi';
						break;

					case 'twitter':
						_global = 'twttr';
						break;

					case 'pinterest':
						_global = 'PDK';
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

		_c.$html.on('click', '[data-share]', function(e) {
			e.preventDefault();
			var type = _c.$(this).data('share');
			return SHARE.share[type](_c.$(this));
		});

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
