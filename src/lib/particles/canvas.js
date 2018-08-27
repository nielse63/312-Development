
export const init = function canvasInit(pJS) {
  pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
};

export const size = function canvasSize(pJS) {
  pJS.canvas.el.width = pJS.canvas.w;
  pJS.canvas.el.height = pJS.canvas.h;
};

export const paint = function canvasPaint(pJS) {
  pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
};

export const clear = function canvasClear(pJS) {
  pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
};
