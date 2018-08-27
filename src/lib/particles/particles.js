import Particle from './particle';

export const create = function particlesCreate(pJS) {
  const { particles } = pJS;
  const { color, opacity } = particles;
  const { value } = opacity;
  for (let i = 0; i < particles.number.value; i += 1) {
    particles.array.push(
      new Particle(pJS, color, value),
    );
  }
};

function moveSingleParticle(p, ms) {
  p.x += p.vx * ms;
  p.y += p.vy * ms;
}

export const update = function particlesUpdate(pJS) { // eslint-disable-line complexity
  const { array, move } = pJS.particles;
  const { speed } = move;
  const ms = speed / 2;
  for (let i = 0; i < array.length; i += 1) {
    /* the particle */
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

    if (p.x - p.radius > pJS.canvas.w) {
      p.x = newPos.x_left;
      p.y = Math.random() * pJS.canvas.h;
    } else if (p.x + p.radius < 0) {
      p.x = newPos.x_right;
      p.y = Math.random() * pJS.canvas.h;
    }
    if (p.y - p.radius > pJS.canvas.h) {
      p.y = newPos.y_top;
      p.x = Math.random() * pJS.canvas.w;
    } else if (p.y + p.radius < 0) {
      p.y = newPos.y_bottom;
      p.x = Math.random() * pJS.canvas.w;
    }

    // events
    pJS.fn.modes.bubbleParticle(p);

    // interaction auto between particles
    for (let j = i + 1; j < array.length; j += 1) {
      const p2 = array[j];
      pJS.fn.interact.linkParticles(p, p2);
    }
  }
};

export const draw = function particlesDraw(pJS) {
  /* clear canvas */
  pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

  /* update each particles param */
  pJS.fn.particlesUpdate();

  /* draw each particle */
  for (let i = 0; i < pJS.particles.array.length; i += 1) {
    const p = pJS.particles.array[i];
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

export const link = function linkParticles(pJS, p1, p2) {
  const dx = p1.x - p2.x;


  const dy = p1.y - p2.y;


  const dist = Math.sqrt(dx * dx + dy * dy);

  /* draw a line between p1 and p2 if the distance between them is under the config distance */
  if (dist <= pJS.particles.line_linked.distance) {
    const opacityLine = pJS.particles.line_linked.opacity - (dist / (1 / pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

    if (opacityLine > 0) {
      /* style */
      const colorLine = pJS.particles.line_linked.color_rgb_line;
      pJS.canvas.ctx.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacityLine})`;
      pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
      // pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

      /* path */
      pJS.canvas.ctx.beginPath();
      pJS.canvas.ctx.moveTo(p1.x, p1.y);
      pJS.canvas.ctx.lineTo(p2.x, p2.y);
      pJS.canvas.ctx.stroke();
      pJS.canvas.ctx.closePath();
    }
  }
};

export const push = function pushParticles(pJS, nb, pos) {
  pJS.tmp.pushing = true;
  const { particles } = pJS;
  const { array, color, opacity } = particles;

  for (let i = 0; i < nb; i += 1) {
    array.push(
      new Particle(
        color,
        opacity.value,
        {
          x: pos ? pos.pos_x : Math.random() * pJS.canvas.w,
          y: pos ? pos.pos_y : Math.random() * pJS.canvas.h,
        },
      ),
    );
    if (i === nb - 1) {
      pJS.tmp.pushing = false;
    }
  }
};

export const remove = function removeParticles(pJS, nb) {
  pJS.particles.array.splice(0, nb);
};
