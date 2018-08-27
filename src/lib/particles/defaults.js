
export default canvasElement => ({
  isPaused:  false,
  isRunning: false,
  canvas:    {
    el: canvasElement || null,
    w:  canvasElement ? canvasElement.offsetWidth : 0,
    h:  canvasElement ? canvasElement.offsetHeight : 0,
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
        opacity:  0.3,
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
});
