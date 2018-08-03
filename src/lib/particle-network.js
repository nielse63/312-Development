/* eslint-disable no-bitwise */
export default function particleNetwork(canvas) {
  const ctx = canvas.getContext('2d');

  const TAU = 2 * Math.PI;
  const LINE_COLOR = '#bebebe';
  const FRAME_RATE = 16;
  let lastTime = Date.now();
  const balls = [];
  const output = {
    active: true,
  };

  function setCanvasSize() {
    /* eslint-disable no-param-reassign */
    const parent = canvas.offsetParent;
    if (!parent) {
      return;
    }
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  function init() {
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = '1px';

    setCanvasSize();
  }

  function Ball(startX, startY, startVelX = 0, startVelY = 0) {
    this.x = startX || Math.random() * canvas.width;
    this.y = startY || Math.random() * canvas.height;
    this.vel = {
      x: startVelX || Math.random() * 2 - 1,
      y: startVelY || Math.random() * 2 - 1,
    };

    this.update = function u() {
      const { width, height } = canvas;
      if (this.x > width + 50 || this.x < -50) {
        this.vel.x = -this.vel.x;
      }
      if (this.y > height + 50 || this.y < -50) {
        this.vel.y = -this.vel.y;
      }
      this.x += this.vel.x / 1.5;
      this.y += this.vel.y / 1.5;
    };

    this.draw = function d() {
      ctx.beginPath();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = LINE_COLOR;
      const x = (0.5 + this.x) | 0;
      const y = (0.5 + this.y) | 0;
      ctx.arc(
        x, y, 3,
        0, TAU, true,
      );
      ctx.fill();
    };
  }

  function update() {
    const diff = Date.now() - lastTime;
    let frame = 0;
    const { length } = balls;
    while (frame * FRAME_RATE < diff) {
      let index = 0;
      while (index < length) {
        balls[index].update();
        index += 1;
      }
      frame += 1;
    }
    lastTime = Date.now();
  }

  function draw() {
    const { length } = balls;
    let index = 0;

    ctx.save();
    ctx.strokeStyle = LINE_COLOR;

    // draw the balls
    while (index < length) {
      const ball = balls[index];
      ball.draw();

      // vars
      const x1 = ball.x;
      const y1 = ball.y;

      // draw the line
      ctx.beginPath();
      let index2 = length - 1;
      while (index2 > index) {
        const ball2 = balls[index2];
        const x2 = ball2.x;
        const y2 = ball2.y;
        const dist = Math.hypot(x1 - x2, y1 - y2);
        if (dist < 100) {
          ctx.globalAlpha = 1 - (dist > 100 ? 0.6 : dist / 10);
          ctx.moveTo(
            (0.5 + x1) | 0,
            (0.5 + y1) | 0,
          );
          ctx.lineTo(
            (0.5 + x2) | 0,
            (0.5 + y2) | 0,
          );
        }
        index2 -= 1;
      }
      ctx.stroke();
      ctx.closePath();
      index += 1;
    }
    ctx.restore();
  }

  let lastFrameTime = 0;
  function loop(elapsedTime) {
    const delta = elapsedTime - (lastFrameTime || 0);
    requestAnimationFrame(loop);
    if (lastFrameTime && delta < 33) {
      return;
    }
    lastFrameTime = elapsedTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
  }

  // set canvas size
  init();

  // create balls
  {
    const { width, height } = canvas;
    let i = 0;
    const count = width * height / (65 * 65);
    while (i < count) {
      balls.push(new Ball(
        Math.random() * width,
        Math.random() * height,
      ));
      i += 1;
    }
  }

  // Start
  output.start = loop;
  return output;
}
