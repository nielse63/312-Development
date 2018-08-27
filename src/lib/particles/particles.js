import Particle from './particle';
import { particles } from './defaults';
import { clear as clearCanvas } from './canvas';

const LINE_OPACITY = particles.line_linked.opacity;
const LINE_WIDTH = particles.line_linked.width;
const LINE_DISTANCE = particles.line_linked.distance;
const LINE_COLOR = particles.line_linked.color_rgb_line;

function moveSingleParticle(p, ms) {
  p.x += p.vx * ms;
  p.y += p.vy * ms;
}

function particleIsOutOfCanvas(p, newPos, { canvas }, axis) {
  const axis2 = axis === 'x' ? 'y' : 'x';
  const newPosAxes = axis === 'x' ? {
    first:  'x_left',
    second: 'x_right',
  } : {
    first:  'y_top',
    second: 'y_bottom',
  };
  if (p[axis] - p.radius > canvas.w) {
    p[axis] = newPos[newPosAxes.first];
    p[axis2] = Math.random() * canvas.h;
  } else if (p.x + p.radius < 0) {
    p[axis] = newPos[newPosAxes.second];
    p[axis2] = Math.random() * canvas.h;
  }
}

export const create = function particlesCreate(pJS) {
  const {
    array, color, opacity, number,
  } = pJS.particles;
  const { value } = opacity;
  for (let i = 0; i < number.value; i += 1) {
    array.push(
      new Particle(pJS, color, value),
    );
  }
};

export const link = function linkParticles(pJS, p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const { canvas } = pJS;
  const { ctx } = canvas;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // draw a line between p1 and p2 if the distance between them is under the config distance
  if (dist > LINE_DISTANCE) return;

  const opacityLine = LINE_OPACITY - (dist / (1 / LINE_OPACITY)) / LINE_DISTANCE;

  if (opacityLine < 0) return;

  // style
  const { r, g, b } = LINE_COLOR;
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacityLine})`;
  ctx.lineWidth = LINE_WIDTH;

  // path
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.closePath();
};

export const update = function particlesUpdate(pJS) { // eslint-disable-line complexity
  const { array, move } = pJS.particles;
  const { speed } = move;
  const ms = speed / 2;
  for (let i = 0; i < array.length; i += 1) {
    // the particle
    const p = array[i];

    // move the particle
    moveSingleParticle(p, ms);

    // change particle position if it is out of canvas
    const newPos = {
      x_left:   -p.radius,
      x_right:  pJS.canvas.w + p.radius,
      y_top:    -p.radius,
      y_bottom: pJS.canvas.h + p.radius,
    };

    particleIsOutOfCanvas(p, newPos, pJS, 'x');
    particleIsOutOfCanvas(p, newPos, pJS, 'y');

    // events
    pJS.fn.modes.bubbleParticle(p);

    // interaction auto between particles
    for (let j = i + 1; j < array.length; j += 1) {
      link(pJS, p, array[j]);
    }
  }
};

export const draw = function particlesDraw(pJS) {
  // clear canvas
  clearCanvas(pJS);

  // update each particles param
  update(pJS);

  // draw each particle
  const { array } = pJS.particles;
  for (let i = 0; i < array.length; i += 1) {
    const p = array[i];
    p.draw();
  }
};

export const empty = function particlesEmpty(pJS) {
  pJS.particles.array = [];
};

export const refresh = function particlesRefresh(pJS) {
  /* init all */
  cancelAnimationFrame(pJS.fn.checkAnimFrame);
  cancelAnimationFrame(pJS.fn.drawAnimFrame);
  pJS.tmp.source_svg = undefined;
  pJS.tmp.img_obj = undefined;
  pJS.tmp.count_svg = 0;
  pJS.fn.particlesEmpty();
  pJS.fn.canvasClear();

  /* restart */
  pJS.fn.vendors.start();
};

export const push = function pushParticles(pJS, nb) {
  pJS.tmp.pushing = true;
  const { canvas } = pJS;
  const { array, color, opacity } = pJS.particles;

  for (let i = 0; i < nb; i += 1) {
    const x = Math.random() * canvas.w;
    const y = Math.random() * canvas.h;
    array.push(
      new Particle(pJS, color, opacity.value, { x, y }),
    );
  }
  pJS.tmp.pushing = false;
};

export const remove = function removeParticles(pJS, nb) {
  pJS.particles.array.splice(0, nb);
};
