
function inView(element) {
  const y = window.scrollY + window.innerHeight;
  const top = element.offsetTop;
  if (y < top) {
    return;
  }
  element.removeAttribute('data-is-in-view');
  element.classList.add('visible');
}

function onscroll() {
  document.querySelectorAll('[data-is-in-view]').forEach(inView);
}

export default function isVisible() {
  document.addEventListener('scrolling', onscroll, false);
}
