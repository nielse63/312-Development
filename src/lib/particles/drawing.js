import * as particles from './particles';

export const density = function checkDensity(pJS) {
  /* calc area */
  let area = (pJS.canvas.el.width * pJS.canvas.el.height) / 1000;
  if (pJS.tmp.retina) {
    area /= (pJS.canvas.pxratio * 2);
  }

  /* calc number of particles based on density area */
  const nbParticles = (area * pJS.particles.number.value) / pJS.particles.number.density.value_area;

  /* add or remove X particles */
  const missingParticles = pJS.particles.array.length - nbParticles;
  if (missingParticles < 0) {
    particles.push(pJS, Math.abs(missingParticles));
  } else {
    particles.remove(pJS, missingParticles);
  }
};

export const draw = function draw(pJS, frame) {
  pJS.fn.drawAnimFrame = requestAnimationFrame(pJS.fn.vendors.draw);
  if (pJS.isPaused) {
    cancelAnimationFrame(frame);
    return;
  }
  // pJS.isRunning = true;
  pJS.fn.particlesDraw();
  // pJS.isRunning = false;
};

export const preDraw = function checkBeforeDraw(pJS) {
  pJS.fn.vendors.init();
  pJS.fn.vendors.draw();
};
