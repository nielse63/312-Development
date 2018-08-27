import hexToRgb from '../hex-to-rgb';

function Particle(pJS, color, opacity, position) {
  /* size */
  // console.log({
  //   color, opacity, position, pJS,
  // });
  this.pJS = pJS;
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
}

Particle.prototype.setPosition = function setPosition(position) {
  this.x = position ? position.x : Math.random() * this.pJS.canvas.w;
  this.y = position ? position.y : Math.random() * this.pJS.canvas.h;
};

Particle.prototype.checkPosition = function checkPosition() {
  if (this.x > this.pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;
  else if (this.x < this.radius * 2) this.x = this.x + this.radius;
  if (this.y > this.pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;
  else if (this.y < this.radius * 2) this.y = this.y + this.radius;
};

Particle.prototype.draw = function draw() {
  const p = this;
  const radius = p.radius_bubble;
  const opacity = p.opacity_bubble;
  const colorValue = `rgba(${p.color.rgb.r},${p.color.rgb.g},${p.color.rgb.b},${opacity})`;
  this.pJS.canvas.ctx.fillStyle = colorValue;
  this.pJS.canvas.ctx.beginPath();
  this.pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
  this.pJS.canvas.ctx.closePath();
  this.pJS.canvas.ctx.fill();
};

export default Particle;
