
// node modules
import NProgress from 'nprogress';

// core
import Clique from './lib/utils/_core';
window._c = new Clique();

// modules
import Nav from './lib/components/_nav';
import Banner from './lib/components/_banner';

// modules
import BodyClass from './lib/modules/_body-class';
import Form from './lib/modules/_form';

import MobileButton from './lib/vendor/hamburger';

import LazyLoad from './lib/components/_lazyload';
import Links from './lib/components/_links';
import Homepage from './lib/components/_homepage';
import WorkGrid from './lib/components/_work-grid';
import Photos from './lib/components/_photos';
import Services from './lib/components/_services';
import Share from './lib/components/_share';
import Footer from './lib/components/_footer';

// globals
let didLoad = false;
const modules = [
	{
		preload : false,
		Cls     : MobileButton,
		val     : null,
	}, {
		preload : false,
		Cls     : Banner,
		val     : null,
	}, {
		once    : true,
		preload : true,
		Cls     : Nav,
		val     : null,
	}, {
		preload : false,
		Cls     : Homepage,
		val     : null,
	}, {
		preload : true,
		Cls     : WorkGrid,
		val     : null,
	}, {
		preload : false,
		Cls     : Services,
		val     : null,
	}, {
		preload : false,
		Cls     : Photos,
		val     : null,
	}, {
		preload : true,
		Cls     : Links,
		val     : null,
	}, {
		preload : false,
		Cls     : Form,
		val     : null,
	}, {
		preload : false,
		Cls     : LazyLoad,
		val     : null,
	}, {
		preload : false,
		Cls     : Footer,
		val     : null,
	}, {
		preload : false,
		Cls     : Share,
		val     : null,
	},
];
const transitionEvent = _c.support.transition.end + '.app';
const scenes = [];

_c.$win.on('resizeend', function() {
	for (let i = 0; i < scenes.length; i++) {
		if (_c.utils.isArray(scenes[i])) {
			scenes[i].forEach(function(scene) {
				scene.update();
			});
		} else {
			scenes[i].update();
		}
	}
});

function initModules(preload = false) {
	function killScenes() {
		for (let i = 0; i < scenes.length; i++) {
			if (_c.utils.isArray(scenes[i])) {
				scenes[i].forEach(function(scene) {
					scene.destroy(true);
				});
			} else {
				scenes[i].destroy(true);
			}
		}
	}

	_c.$('.transition-enter').off(transitionEvent, killScenes);
	_c.$('.transition-enter').one(transitionEvent, killScenes);

	for (let i = 0; i < modules.length; i++) {
		const Module = modules[i];

		// guards
		if (Module.preload !== preload || (Module.once && Module.val)) {
			continue;
		}

		// destroy scroll scene
		if (Module.val && Module.val.scene) {
			const scene = Module.val.scene;
			scenes.push(scene);

			if (_c.utils.isArray(scene)) {
				scene.forEach(function(_scene) {
					_scene.destroy(true);
				});
			} else {
				scene.destroy(true);
			}
		}

		// create new class
		Module.val = new Module.Cls();
	}
}

function preMount() {
	BodyClass.exec();
	initModules(true);
}

function enterPage() {
	preMount();

	const delay = didLoad ? 700 : 0;

	let t = setTimeout(function() {
		clearTimeout(t);
		t = null;

		if (! delay) {
			_c.$html.addClass('app-ready');
		}

		_c.controller.update();
		initModules();

		didLoad = true;
	}, delay);
}

function messageCallback(e) {

	if (e.data === 'loaded') {
		if( didLoad ) {
			if( window.pageYOffset ) {
				window.scroll(0, 0);
			}
		}

		enterPage();

		setTimeout(function() {
			NProgress.done();
		}, 500);
	}
}

function initSW() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', {
			scope: '/'
		}).then(function(reg) {
			console.log(reg);
		}).catch(function(err) {
			console.log(err);
		});
	}
}

// start progress bar
NProgress.start();
// initSW();

window.addEventListener('message', messageCallback, false);
