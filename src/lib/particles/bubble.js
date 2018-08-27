

export const setBubbleSize = function setBubbleSize({ pJS, p, ratio }) {
  const size = p.radius + (pJS.interactivity.modes.bubble.size * ratio);
  if (size >= 0) {
    p.radius_bubble = size;
  }
};

export const setBubbleOpacity = function setBubbleOpacity({ pJS, p, ratio }) {
  const opacity = pJS.interactivity.modes.bubble.opacity * ratio;
  if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
    p.opacity_bubble = opacity;
  }
};

export const init = function bubbleParticle(pJS, p) { // eslint-disable-line complexity
  /* on hover event */
  const dxMouse = p.x - pJS.interactivity.mouse.pos_x;
  const dyMouse = p.y - pJS.interactivity.mouse.pos_y;
  const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
  const ratio = 1 - distMouse / pJS.interactivity.modes.bubble.distance;

  /* mousemove - check ratio */
  if (distMouse > pJS.interactivity.modes.bubble.distance) {
    p.opacity_bubble = p.opacity;
    p.radius_bubble = p.radius;
    return;
  }

  if (ratio < 0) return;

  /* size */
  if (pJS.interactivity.modes.bubble.size !== pJS.particles.size.value) {
    setBubbleSize({ pJS, p, ratio });
  }

  /* opacity */
  if (pJS.interactivity.modes.bubble.opacity !== pJS.particles.opacity.value) {
    setBubbleOpacity({ pJS, p, ratio });
  }
};
