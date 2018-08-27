import getDefaults from './defaults';
import getValues from './values';
import * as canvas from './canvas';
import * as particles from './particles';
import * as drawing from './drawing';
import * as init from './init';
import * as bubble from './bubble';

function ParticlesJS(element) {
  const canvasElement = element.querySelector('.particles-js-canvas-el');
  this.pJS = getDefaults(canvasElement);
  const { pJS } = this;
  pJS.tmp.obj = getValues(pJS);

  // setup canvas
  pJS.fn.canvasInit = canvas.init.bind(null, pJS);
  pJS.fn.canvasSize = canvas.size.bind(null, pJS);
  pJS.fn.canvasPaint = canvas.paint.bind(null, pJS);
  pJS.fn.canvasClear = canvas.clear.bind(null, pJS);

  // create particles
  pJS.fn.particlesCreate = particles.create.bind(null, pJS);
  pJS.fn.particlesUpdate = particles.update.bind(null, pJS);
  pJS.fn.particlesDraw = particles.draw.bind(null, pJS);
  pJS.fn.particlesEmpty = particles.empty.bind(null, pJS);
  pJS.fn.particlesRefresh = particles.refresh.bind(null, pJS);
  pJS.fn.interact.linkParticles = particles.link.bind(null, pJS);
  pJS.fn.modes.bubbleParticle = bubble.init.bind(null, pJS);

  // drawing functions
  pJS.fn.vendors.densityAutoParticles = drawing.density.bind(null, pJS);
  pJS.fn.vendors.draw = drawing.draw.bind(null, pJS);
  pJS.fn.vendors.checkBeforeDraw = drawing.preDraw.bind(null, pJS);

  // define init functions
  pJS.fn.retinaInit = init.retina.bind(null, pJS);
  pJS.fn.vendors.eventsListeners = init.listeners.bind(null, pJS);
  pJS.fn.vendors.init = init.init.bind(null, pJS);
  pJS.fn.vendors.start = init.start.bind(null, pJS);

  pJS.fn.vendors.eventsListeners();
  pJS.fn.vendors.start();
}

export default (element) => {
  const parent = element || document.querySelector('#scene');
  /* pJS elements */
  const canvasClass = 'particles-js-canvas-el';

  // remove canvas if exists into the pJS target tag
  const existingCanvases = parent.querySelectorAll(`.${canvasClass}`);
  existingCanvases.forEach((existingCanvas) => {
    element.removeChild(existingCanvas);
  });

  // create canvas element
  const canvasElement = document.createElement('canvas');
  canvasElement.className = canvasClass;

  // set size canvas
  canvasElement.style.width = '100%';
  canvasElement.style.height = '100%';

  // launch particle.js
  if (parent.appendChild(canvasElement)) {
    return new ParticlesJS(parent);
  }
  return null;
};
