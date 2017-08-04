
import { scaleLinear, scaleQuantize, range, select, timer } from 'd3';

export function getSize() {
  const wrapper = document.getElementById('bubbles');
  return { width: wrapper.clientWidth, height: wrapper.clientHeight };
}

export function getRangeData(width, colors) {
  const colorScale = scaleQuantize().domain([0, 1]).range(colors);
  let rangeValue = Math.floor((40 / 1280) * width);
  if (rangeValue < 20) {
    rangeValue = 20;
  }

  return range(rangeValue).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    yv: Math.random() * 0.2,
    size: (Math.random() * 50) + 5,
    color: colorScale(Math.random()),
  }));
}

export default function bubbles() {
  if (!document.getElementById('bubbles')) {
    return;
  }

  const { width, height } = getSize();

  let x = scaleLinear()
    .domain([0, 100])
    .range([0, width]);

  let y = scaleLinear()
    .domain([0, 100])
    .range([0, height]);

  const colors = ['rgba(236, 55, 108, 0.5)'];
  const data = getRangeData(width, colors);

  const canvas = select('#bubbles').append('canvas')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'canvas');

  let context = canvas.node().getContext('2d');

  /* istanbul ignore next */
  select(window).on('resize', () => {
    const htmlCanvas = document.getElementById('canvas');
    context = htmlCanvas.getContext('2d');
    const sizes = getSize();
    htmlCanvas.width = sizes.width;
    htmlCanvas.height = sizes.height;
    x = scaleLinear()
      .domain([0, 100])
      .range([0, width]);
    y = scaleLinear()
      .domain([0, 100])
      .range([0, height]);
  });

  /* istanbul ignore next */
  timer(() => {
    context.clearRect(0, 0, width, height);
    data.forEach((d) => {
      d.y -= d.yv;
      if (d.y < (0 - d.size)) {
        d.y = 100 + d.size;
      }
      context.fillStyle = d.color;
      context.beginPath();
      context.arc(x(d.x), y(d.y), d.size, 0, 2 * Math.PI);
      context.fill();
    });
  });
}
