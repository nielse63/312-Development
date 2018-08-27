// import throttle from '@nielse63/throttle';

let isPaused = false;

Object.deepExtend = function deepExtend(destination, source) {
  const output = destination;
  Object.keys(source).forEach((key) => {
    if (source[key] && source[key].constructor === Object) {
      output[key] = destination[key] || {};
      Object.deepExtend(destination[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });
  return output;
};

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const newhex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newhex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

// function isInArray(value, array) {
//   return array.indexOf(value) > -1;
// }

function ParticlesJS(elementId, params) {
  const canvasElement = document.querySelector(`#${elementId} > .particles-js-canvas-el`);

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvasElement,
      w:  canvasElement.offsetWidth,
      h:  canvasElement.offsetHeight,
    },
    particles: {
      number: {
        value:   250,
        density: {
          enable:     true,
          value_area: 800,
        },
      },
      color: {
        value: '#fff',
      },
      shape: {
        type:   'circle',
        stroke: {
          width: 0,
          color: '#ff0000',
        },
      },
      opacity: {
        value:  0.1,
        random: false,
        anim:   {
          enable:      false,
          speed:       2,
          opacity_min: 0,
          sync:        false,
        },
      },
      size: {
        value:  3,
        random: false,
        anim:   {
          enable:   false,
          speed:    20,
          size_min: 0,
          sync:     false,
        },
      },
      line_linked: {
        enable:   true,
        distance: 100,
        color:    '#fff',
        opacity:  0.5,
        width:    1,
      },
      move: {
        enable:    true,
        speed:     3,
        direction: 'none',
        random:    false,
        // straight:  false,
        // out_mode:  'out',
        // bounce:    false,
        // attract:   {
        //   enable:  false,
        //   rotateX: 3000,
        //   rotateY: 3000,
        // },
      },
      array: [],
    },
    interactivity: {
      detect_on: 'window',
      events:    {
        onhover: {
          enable: true,
          mode:   'bubble',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 200,
          size:     10,
          duration: 0.5,
        },
      },
      mouse: {},
    },
    retina_detect: true,
    fn:            {
      interact: {},
      modes:    {},
      vendors:  {},
    },
    tmp: {},
  };

  const { pJS } = this;

  /* params settings */
  if (params) {
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value:           pJS.particles.size.value,
    size_anim_speed:      pJS.particles.size.anim.speed,
    move_speed:           pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width:    pJS.particles.line_linked.width,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size:     pJS.interactivity.modes.bubble.size,
  };

  pJS.fn.retinaInit = function retinaInit() {
    if (pJS.retina_detect && window.devicePixelRatio > 1) {
      pJS.canvas.pxratio = window.devicePixelRatio;
      pJS.tmp.retina = true;
    } else {
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
  };

  /* ---------- pJS functions - canvas ------------ */
  pJS.fn.canvasInit = function canvasInit() {
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function canvasSize() {
    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    const onResizeend = () => {
      pJS.canvas.w = pJS.canvas.el.offsetWidth;
      pJS.canvas.h = pJS.canvas.el.offsetHeight;

      /* resize canvas */
      if (pJS.tmp.retina) {
        pJS.canvas.w *= pJS.canvas.pxratio;
        pJS.canvas.h *= pJS.canvas.pxratio;
      }

      pJS.canvas.el.width = pJS.canvas.w;
      pJS.canvas.el.height = pJS.canvas.h;

      /* density particles enabled */
      pJS.fn.vendors.densityAutoParticles();
    };

    let timeout;
    const callback = () => {
      isPaused = true;
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        isPaused = false;
        timeout = null;
        onResizeend();
      }, 200);
    };
    window.addEventListener('resize', callback, false);
  };

  pJS.fn.canvasPaint = function canvasPaint() {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function canvasClear() {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  /* --------- pJS functions - particles ----------- */
  pJS.fn.Particle = function particle(color, opacity, position) {
    /* size */
    this.radius = pJS.particles.size.value;

    /* position */
    this.setPosition(position);
    this.checkPosition();

    /* color */
    this.color = color;
    this.color.rgb = hexToRgb(this.color.value);

    /* opacity */
    this.opacity = pJS.particles.opacity.value;

    /* animation - velocity for speed */
    const velbase = { x: 0, y: 0 };
    this.vx = velbase.x + Math.random() - 0.5;
    this.vy = velbase.y + Math.random() - 0.5;
    this.vx_i = this.vx;
    this.vy_i = this.vy;

    this.shape = pJS.particles.shape.type;
  };

  pJS.fn.Particle.prototype.setPosition = function setPosition(position) {
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;
  };

  pJS.fn.Particle.prototype.checkPosition = function checkPosition() {
    if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;
    else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;
    else if (this.y < this.radius * 2) this.y = this.y + this.radius;
  };

  pJS.fn.Particle.prototype.draw = function draw() {
    const p = this;
    const radius = p.radius_bubble;
    const opacity = p.opacity_bubble;
    const colorValue = `rgba(${p.color.rgb.r},${p.color.rgb.g},${p.color.rgb.b},${opacity})`;
    pJS.canvas.ctx.fillStyle = colorValue;
    pJS.canvas.ctx.beginPath();
    pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
    pJS.canvas.ctx.closePath();
    pJS.canvas.ctx.fill();
  };

  pJS.fn.particlesCreate = function particlesCreate() {
    for (let i = 0; i < pJS.particles.number.value; i += 1) {
      pJS.particles.array.push(new pJS.fn.Particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function particlesUpdate() { // eslint-disable-line complexity
    const { array } = pJS.particles;
    for (let i = 0; i < array.length; i += 1) {
      /* the particle */
      const p = array[i];

      /* move the particle */
      const ms = pJS.particles.move.speed / 2;
      p.x += p.vx * ms;
      p.y += p.vy * ms;

      /* change particle position if it is out of canvas */
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

      /* events */
      pJS.fn.modes.bubbleParticle(p);

      /* interaction auto between particles */
      for (let j = i + 1; j < array.length; j += 1) {
        const p2 = array[j];
        pJS.fn.interact.linkParticles(p, p2);
      }
    }
  };

  pJS.fn.particlesDraw = function particlesDraw() {
    if (isPaused) return;
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

  pJS.fn.particlesEmpty = function particlesEmpty() {
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function particlesRefresh() {
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

  pJS.fn.interact.linkParticles = function linkParticles(p1, p2) {
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

  /* ---------- pJS functions - modes events ------------ */
  pJS.fn.modes.pushParticles = function pushParticles(nb, pos) { // eslint-disable-line complexity
    pJS.tmp.pushing = true;

    for (let i = 0; i < nb; i += 1) {
      pJS.particles.array.push(
        new pJS.fn.Particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            x: pos ? pos.pos_x : Math.random() * pJS.canvas.w,
            y: pos ? pos.pos_y : Math.random() * pJS.canvas.h,
          },
        ),
      );
      if (i === nb - 1) {
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }
  };

  pJS.fn.modes.removeParticles = function removeParticles(nb) {
    pJS.particles.array.splice(0, nb);
  };

  pJS.fn.modes.bubbleParticle = function bubbleParticle(p) { // eslint-disable-line complexity
    /* eslint-disable no-param-reassign */
    /* on hover event */
    const dxMouse = p.x - pJS.interactivity.mouse.pos_x;
    const dyMouse = p.y - pJS.interactivity.mouse.pos_y;
    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    const ratio = 1 - distMouse / pJS.interactivity.modes.bubble.distance;

    /* mousemove - check ratio */
    if (distMouse <= pJS.interactivity.modes.bubble.distance) {
      if (ratio >= 0 && pJS.interactivity.status === 'mousemove') {
        /* size */
        if (pJS.interactivity.modes.bubble.size !== pJS.particles.size.value) {
          if (pJS.interactivity.modes.bubble.size > pJS.particles.size.value) {
            const size = p.radius + (pJS.interactivity.modes.bubble.size * ratio);
            if (size >= 0) {
              p.radius_bubble = size;
            }
          } else {
            const dif = p.radius - pJS.interactivity.modes.bubble.size;
            const size = p.radius - (dif * ratio);
            if (size > 0) {
              p.radius_bubble = size;
            } else {
              p.radius_bubble = 0;
            }
          }
        }

        /* opacity */
        if (pJS.interactivity.modes.bubble.opacity !== pJS.particles.opacity.value) {
          if (pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value) {
            const opacity = pJS.interactivity.modes.bubble.opacity * ratio;
            if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
              p.opacity_bubble = opacity;
            }
          } else {
            const opacity = p.opacity - (pJS.particles.opacity.value - pJS.interactivity.modes.bubble.opacity) * ratio;
            if (opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity) {
              p.opacity_bubble = opacity;
            }
          }
        }
      }
    } else {
      p.opacity_bubble = p.opacity;
      p.radius_bubble = p.radius;
    }
  };

  pJS.fn.vendors.eventsListeners = function eventsListeners() {
    /* events target element */
    if (pJS.interactivity.detect_on === 'window') {
      pJS.interactivity.el = window;
    } else {
      pJS.interactivity.el = pJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if (pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable) {
      pJS.interactivity.el.addEventListener('mousemove', (e) => {
        let posX;
        let posY;
        if (pJS.interactivity.el === window) {
          posX = e.clientX;
          posY = e.clientY;
        } else {
          posX = e.offsetX || e.clientX;
          posY = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = posX;
        pJS.interactivity.mouse.pos_y = posY;

        if (pJS.tmp.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';
      });
    }
  };

  pJS.fn.vendors.densityAutoParticles = function densityAutoParticles() {
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
      pJS.fn.modes.pushParticles(Math.abs(missingParticles));
    } else {
      pJS.fn.modes.removeParticles(missingParticles);
    }
  };

  pJS.fn.vendors.checkOverlap = function checkOverlap(p1, position) {
    for (let i = 0; i < pJS.particles.array.length; i += 1) {
      const p2 = pJS.particles.array[i];
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

  pJS.fn.vendors.draw = function draw() {
    pJS.fn.particlesDraw();
    pJS.fn.drawAnimFrame = requestAnimationFrame(pJS.fn.vendors.draw);
  };

  pJS.fn.vendors.checkBeforeDraw = function checkBeforeDraw() {
    pJS.fn.vendors.init();
    pJS.fn.vendors.draw();
  };

  pJS.fn.vendors.init = function init() {
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);
  };

  pJS.fn.vendors.start = function start() {
    pJS.fn.vendors.checkBeforeDraw();
  };

  pJS.fn.vendors.eventsListeners();
  pJS.fn.vendors.start();
}

// window.pJSDom = [];

window.particlesJS = function particlesJS(elementId, params = {}) {
  /* pJS elements */
  const element = document.getElementById(elementId);
  const canvasClass = 'particles-js-canvas-el';
  const existingCanvas = element.getElementsByClassName(canvasClass);

  /* remove canvas if exists into the pJS target tag */
  if (existingCanvas.length) {
    while (existingCanvas.length > 0) {
      element.removeChild(existingCanvas[0]);
    }
  }

  /* create canvas element */
  const canvasElement = document.createElement('canvas');
  canvasElement.className = canvasClass;

  /* set size canvas */
  canvasElement.style.width = '100%';
  canvasElement.style.height = '100%';

  /* append canvas */
  const canvas = document.getElementById(elementId).appendChild(canvasElement);

  /* launch particle.js */
  if (canvas !== null) {
    const pJSDom = [];
    pJSDom.push(
      new ParticlesJS(elementId, params),
    );
  }
};
