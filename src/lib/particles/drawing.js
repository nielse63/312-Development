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

export const check = function checkOverlap(pJS, p1, position) {
  const { array } = pJS.particles;
  for (let i = 0; i < array.length; i += 1) {
    const p2 = array[i];
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= p1.radius + p2.radius) {
      const newp1 = { ...p1 };
      newp1.x = position ? position.x : Math.random() * pJS.canvas.w;
      newp1.y = position ? position.y : Math.random() * pJS.canvas.h;
      pJS.fn.vendors.checkOverlap(newp1);
    }
  }
};

export const draw = function draw(pJS, frame) {
  pJS.fn.drawAnimFrame = requestAnimationFrame(pJS.fn.vendors.draw);
  if (pJS.isPaused || pJS.isRunning) {
    cancelAnimationFrame(frame);
    return;
  }
  pJS.isRunning = true;
  pJS.fn.particlesDraw();
  pJS.isRunning = false;
};

export const preDraw = function checkBeforeDraw(pJS) {
  pJS.fn.vendors.init();
  pJS.fn.vendors.draw();
};
