
function offsetTop(element) {
  const top = element.getBoundingClientRect().top;
  if (!element.hasAttribute('data-top')) {
    element.setAttribute('data-top', top);
  }
  return parseInt(element.getAttribute('data-top'), 10);
}

function inView(element) {
  const y = window.scrollY + window.innerHeight;
  const top = offsetTop(element);
  if (y < top) {
    return;
  }
  element.removeAttribute('data-is-in-view');
  element.removeAttribute('data-top');
  element.classList.add('visible');
}

function onscroll() {
  document.querySelectorAll('[data-is-in-view]').forEach(inView);
}

export default function isVisible() {
  if (!window.isInViewBound) {
    window.isInViewBound = true;
    document.addEventListener('scrolling', onscroll, false);
  }
}
