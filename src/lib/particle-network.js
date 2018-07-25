/* eslint-disable no-bitwise */

export default function particleNetwork() {
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const TAU = 2 * Math.PI;
  const LINE_COLOR = '#bebebe';
  const FRAME_RATE = 50;
  let lastTime = Date.now();
  const balls = [];

  function Ball(startX, startY, startVelX, startVelY) {
    this.x = startX || Math.random() * canvas.width;
    this.y = startY || Math.random() * canvas.height;
    this.vel = {
      x: startVelX || Math.random() * 2 - 1,
      y: startVelY || Math.random() * 2 - 1,
    };

    this.update = function u(cvs) {
      if (this.x > cvs.width + 50 || this.x < -50) {
        this.vel.x = -this.vel.x;
      }
      if (this.y > cvs.height + 50 || this.y < -50) {
        this.vel.y = -this.vel.y;
      }
      this.x += this.vel.x;
      this.y += this.vel.y;
    };

    this.draw = function d(ctx1) {
      /* eslint-disable no-param-reassign */
      ctx1.beginPath();
      ctx1.globalAlpha = 0.4;
      ctx1.fillStyle = LINE_COLOR;
      ctx1.arc(
        (0.5 + this.x) | 0,
        (0.5 + this.y) | 0,
        3,
        0,
        TAU,
        false,
      );
      ctx1.fill();
    };
  }

  function update() {
    const diff = Date.now() - lastTime;
    let frame = 0;
    const { length } = balls;
    while (frame * FRAME_RATE < diff) {
      let index = 0;
      while (index < length) {
        balls[index].update(canvas);
        index += 1;
      }
      frame += 1;
    }
    lastTime = Date.now();
  }

  function draw() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let index = 0;
    const { length } = balls;
    while (index < length) {
      const ball = balls[index];
      ball.draw(ctx, canvas);
      ctx.beginPath();
      let index2 = length - 1;
      while (index2 > index) {
        const ball2 = balls[index2];
        const dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
        if (dist < 100) {
          ctx.strokeStyle = LINE_COLOR;
          ctx.globalAlpha = 1 - (dist > 100 ? 0.8 : dist / 150);
          ctx.lineWidth = '1px';
          ctx.moveTo(
            (0.5 + ball.x) | 0,
            (0.5 + ball.y) | 0,
          );
          ctx.lineTo(
            (0.5 + ball2.x) | 0,
            (0.5 + ball2.y) | 0,
          );
        }
        index2 += -1;
      }
      ctx.stroke();
      index += 1;
    }
  }

  function loop() {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // create balls
  {
    const { width, height } = canvas;
    let i = 0;
    while (i < width * height / (65 * 65)) {
      balls.push(new Ball(
        Math.random() * width,
        Math.random() * height,
      ));
      i += 1;
    }
  }

  // Start
  loop();
}
