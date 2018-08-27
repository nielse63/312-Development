
export const init = function canvasInit(pJS) {
  pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
};

export const size = function canvasSize(pJS) {
  pJS.canvas.el.width = pJS.canvas.w;
  pJS.canvas.el.height = pJS.canvas.h;
};

function setCanvasContext(pJS, method) {
  pJS.canvas.ctx[method](0, 0, pJS.canvas.w, pJS.canvas.h);
}

export const paint = function canvasPaint(pJS) {
  setCanvasContext(pJS, 'fillRect');
};

export const clear = function canvasClear(pJS) {
  setCanvasContext(pJS, 'clearRect');
};
