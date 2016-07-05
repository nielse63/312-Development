
export default class Events {

	constructor() {
		this.events = {

			scrollstart : {
				setup() {
					const element = $(this);
					const uid = _c.utils.uid('scrollstart');
					const ns = 'scrolling.clique.events.' + uid;
					const handler = function(e) {
						_c.$(e.target).trigger('scrollstart');
					};

					element.on('scrollstart', function() {
						return element.off(ns);
					});

					element.on('scrollend', function() {
						return element.on(ns, handler).data(uid, handler);
					});

					element.data('clique.event.scrollstart.uid', uid);
					return element.on(ns, handler).data(uid, handler);
				},

				teardown() {
					const element = _c.$(this);
					const uid = element.data('clique.event.scrollstart.uid');

					element.off('scrolling.clique.events', element.data(uid));
					element.removeData(uid);
					return element.removeData('clique.event.scrollstart.uid');
				},
			},

			scrollend : {
				latency : 50,
				setup(data) {
					const _data = _c.$.extend({
						latency : _c.$.event.special.scrollend.latency,
					}, data);

					const uid = _c.utils.uid('scrollend');
					let timer = null;
					const handler = function(e, scrollData) {
						if (timer) {
							window.clearTimeout(timer);
						}
						timer = window.setTimeout(function() {
							timer = null;
							const target = _c.$(e.target);
							// console.log(scrollData);
							return target.trigger('scrollend', [scrollData]);
						}, _data.latency);
					};

					_c.$(this).data('clique.event.scrollend.uid', uid);
					return _c.$(this).on('scrolling', _c.utils.debounce(handler, 100)).data(uid, handler);
				},
				teardown() {
					const $element = _c.$(this);
					const uid = $element.data('clique.event.scrollend.uid');
					$element.off('scrolling', $element.data(uid));
					$element.removeData(uid);
					return $element.removeData('clique.event.scrollend.uid');
				},
			},

			resizestart : {
				setup() {
					const element = _c.$(this);
					const uid = _c.utils.uid('resizestart');
					const ns = 'resize.clique.events.' + uid;
					const latency = _c.$.event.special.resizeend.latency + 150;
					let timer;
					const handler = function(e) {
						if (timer) {
							window.clearTimeout(timer);
						}

						const memory = {
							height : window.innerHeight,
							width  : window.innerWidth,
						};
						const target = _c.$(e.target);

						target.one('resizeend', function() {
							if (timer) {
								window.clearTimeout(timer);
							}
						});

						timer = setTimeout(function() {
							timer = null;
							if (memory.height === window.innerHeight && memory.width === window.innerWidth) {
								target.trigger('resizeend');
							}
						}, latency);

						target.trigger('resizestart', e);
					};

					element.data('clique.event.resizestart.uid', uid);
					element.on('resizestart', function() {
						return _c.$(this).off(ns);
					});

					element.on('resizeend', function() {
						return _c.$(this).on(ns, handler).data(uid, handler);
					});

					return element.on(ns, handler).data(uid, handler);
				},

				teardown() {
					const $element = _c.$(this);
					const uid = $element.data('clique.event.resizestart.uid');

					$element.off('resize', $element.data(uid));
					$element.removeData(uid);
					return $element.removeData('clique.event.resizestart.uid');
				},
			},

			resizeend : {
				latency : 250,
				setup(data) {
					let uid = _c.utils.uid('resizeend');
					const _data = _c.$.extend({
						latency : _c.$.event.special.resizeend.latency
					}, data);
					let timer;
					const ns = 'resize.clique.events.' + uid;
					const element = _c.$(this);
					const handler = function(e) {
							if (timer) {
								window.clearTimeout(timer);
							}

							timer = setTimeout(function() {
								timer = null;
								const target = _c.$(e.target);

								return target.trigger('resizeend', e);
							}, _data.latency);
						};

					element.data('clique.event.resizeend.uid', uid);
					element.on('resizeend', function() {
						return _c.$(this).off(ns);
					});

					return element.on('resizestart', function() {
						return _c.$(this).on(ns, handler).data(uid, handler);
					});
				},

				teardown() {
					const $element = _c.$(this);
					const uid = $element.data('clique.event.resizeend.uid');

					$element.off('resize', $element.data(uid));
					$element.removeData(uid);
					return $element.removeData('clique.event.resizeend.uid');
				},
			},
		};

		this.createEvents();
		this.initScroll();

		return this;
	}

	createEvents() {

		Object.keys(this.events).forEach((k) => {
			const v = this.events[k];
			if (typeof v === 'object') {
				_c.$.event.special[k] = v;
				_c.$.fn[k] = function(fn) {
					if (fn) {
						return this.on(k, fn);
					}
					return this.trigger(k);
				};
			}
		});
	}

	initScroll() {
		let memory = -1;
		let working = false;
		let dir = 0;
		let pageY = 0;
		const $doc = $(document);

		function checkScrollPosition() {
			if (working) {
				return;
			}
			working = true;
			pageY = window.pageYOffset;
			if (pageY === memory) {
				working = false;
				window.requestAnimationFrame(checkScrollPosition);
				return;
			}
			dir = pageY > memory ? 1 : -1;
			memory = pageY;

			// fire custom event
			$doc.trigger('scrolling', [{
				y : memory,
				dir,
			}]);

			working = false;
			window.requestAnimationFrame(checkScrollPosition);
		}

		window.requestAnimationFrame(checkScrollPosition);
	}
}
