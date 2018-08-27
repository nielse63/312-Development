import hexToRgb from '../hex-to-rgb';

function onscroll(el, pJS) {
  const canvasBottom = el.clientHeight;
  const windowTop = window.scrollY;
  if (!pJS.isPaused && windowTop > canvasBottom) {
    pJS.isPaused = true;
  } else if (pJS.isPaused && windowTop < canvasBottom) {
    pJS.isPaused = false;
  }
}

function onvisibilitychange(el, pJS) {
  const canvasBottom = el.clientHeight;
  const windowTop = window.scrollY;
  if (document.hidden || windowTop > canvasBottom) {
    pJS.isPaused = true;
  } else if (!document.hidden && windowTop < canvasBottom) {
    pJS.isPaused = false;
  }
}

function onmousemove({ tmp, interactivity, canvas }, e) {
  const posX = e.clientX;
  const posY = e.clientY;

  interactivity.mouse.pos_x = posX;
  interactivity.mouse.pos_y = posY;

  if (tmp.retina) {
    interactivity.mouse.pos_x *= canvas.pxratio;
    interactivity.mouse.pos_y *= canvas.pxratio;
  }
}

function onresizeend(pJS) {
  pJS.canvas.w = pJS.canvas.el.offsetWidth;
  pJS.canvas.h = pJS.canvas.el.offsetHeight;

  // resize canvas
  if (pJS.tmp.retina) {
    pJS.canvas.w *= pJS.canvas.pxratio;
    pJS.canvas.h *= pJS.canvas.pxratio;
  }

  // set canvas size
  pJS.fn.canvasSize();

  // density particles enabled
  pJS.fn.vendors.densityAutoParticles();
}

let timeout;
function onresize(pJS) {
  pJS.isPaused = true;
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(() => {
    pJS.isPaused = false;
    timeout = null;
    onresizeend(pJS);
  }, 200);
}

export const retina = function retina(pJS) {
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

export const listeners = function listeners(pJS) {
  /* events target element */
  const { el } = pJS.canvas;

  window.addEventListener('mousemove', onmousemove.bind(null, pJS), false);
  window.addEventListener('scroll', onscroll.bind(null, el, pJS), false);
  document.addEventListener('visibilitychange', onvisibilitychange.bind(null, el, pJS), false);

  // const onResizeend = () => {
  //   pJS.canvas.w = pJS.canvas.el.offsetWidth;
  //   pJS.canvas.h = pJS.canvas.el.offsetHeight;

  //   // resize canvas
  //   if (pJS.tmp.retina) {
  //     pJS.canvas.w *= pJS.canvas.pxratio;
  //     pJS.canvas.h *= pJS.canvas.pxratio;
  //   }

  //   // set canvas size
  //   pJS.fn.canvasSize();

  //   // density particles enabled
  //   pJS.fn.vendors.densityAutoParticles();
  // };

  // let timeout;
  // const callback = () => {
  //   pJS.isPaused = true;
  //   if (timeout) {
  //     clearTimeout(timeout);
  //     timeout = null;
  //   }
  //   timeout = setTimeout(() => {
  //     pJS.isPaused = false;
  //     timeout = null;
  //     onResizeend();
  //   }, 200);
  // };
  window.addEventListener('resize', onresize.bind(null, pJS), false);
};

export const init = function init(pJS) {
  pJS.fn.retinaInit();
  pJS.fn.canvasInit();
  pJS.fn.canvasSize();
  pJS.fn.canvasPaint();
  pJS.fn.particlesCreate();
  pJS.fn.vendors.densityAutoParticles();
  pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);
};

export const start = function start(pJS) {
  pJS.fn.vendors.checkBeforeDraw();
};
