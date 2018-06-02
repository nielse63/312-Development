
export function getCanvas() {
  const canvas = document.querySelector('#scene');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  return { canvas, width, height };
}
