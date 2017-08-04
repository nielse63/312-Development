
const scroll = window.requestAnimationFrame;
let working = false;
let y = window.scrollY;
const evt = new Event('scrolling');

function fireEvent() {
  working = true;
  document.dispatchEvent(evt);
  working = false;
}

export default function scrolling() {
  const nowY = window.scrollY;
  if (!working && nowY !== y) {
    y = nowY;
    fireEvent();
  }
  scroll(scrolling);
}
