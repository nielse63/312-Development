
// node modules
import NProgress from 'nprogress';

// core
import Clique from './lib/utils/_core';
window._c = new Clique();

// modules
// import Loading from "./lib/components/_loading"
import Nav from './lib/components/_nav';
import Banner from './lib/components/_banner';

// plugins
import ScrollTo from './lib/plugins/_scrollto';

// modules
import BodyClass from './lib/modules/_body-class';
// import Banner from "./lib/modules/_checkbox"
// import Banner from "./lib/modules/_radio"
// import Banner from "./lib/modules/_select"
// import Banner from "./lib/modules/_file-input"
import Form from './lib/modules/_form';
// import Banner from "./lib/modules/_scrollto"
// import Banner from "./lib/modules/_deadlinks"

import MobileButton from './lib/vendor/hamburger';
// import Banner from "./lib/vendor/prism"
// import Banner from "./lib/vendor/animation.gsap"

import LazyLoad from './lib/components/_lazyload';
import Links from './lib/components/_links';
import Homepage from './lib/components/_homepage';
import WorkGrid from './lib/components/_work-grid';
// import Banner from "./lib/components/_contact"
// import Banner from "./lib/components/_single"
import Photos from './lib/components/_photos';
import Services from './lib/components/_services';
// import Contact from './lib/components/_contact';
// import Banner from "./lib/components/_charts"
import Share from './lib/components/_share';
import Footer from './lib/components/_footer';


// immediate modules
// new Loading()

// globals
let didLoad = false;
const modules = [
	                    {
		                                        preload : false,
		                                        cls     : MobileButton,
		                                        val     : null,
	                    }, {
		                    preload : false,
		                    cls     : Banner,
		                    val     : null,
	}, {
		                    once    : true,
		                    preload : true,
		                    cls     : Nav,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : Homepage,
		                    val     : null,
	}, {
		                    preload : true,
		                    cls     : WorkGrid,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : Services,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : Photos,
		                    val     : null,
	}, {
		                    preload : true,
		                    cls     : Links,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : Form,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : LazyLoad,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : Footer,
		                    val     : null,
	}, {
		                    preload : false,
		                    cls     : Share,
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
		                    const module = modules[i];

		// guards
		                    if (module.preload !== preload || (module.once && module.val)) {
			                    continue;
		}

		// destroy scroll scene
		                    if (module.val && module.val.scene) {
			                    const scene = module.val.scene;
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
		                    module.val = new module.cls();
	}
}

function preMount() {
	                    BodyClass.exec();
	                    new ScrollTo();

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

NProgress.start();

function messageCallback(e) {
	// console.log(e);
	// if (! e.isTrusted) {
	// 	return;
	// }

	// console.log('howdy');
	// if (e.data === 'loading') {
	// 	NProgress.start();
	// }

	                    if (e.data === 'loaded') {
		                    enterPage();

		                    setTimeout(function() {
			                    NProgress.done();
		}, 500);
	}
}

window.addEventListener('message', messageCallback, false);
