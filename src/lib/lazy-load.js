
function loadImage(element) {
  const src = element.getAttribute('data-lazy-load');
  element.removeAttribute('data-lazy-load');
  if (element.nodeName.toLowerCase() === 'img') {
    element.src = src;
  } else {
    element.style.backgroundImage = `url(${src})`;
  }
}

function onload() {
  document.querySelectorAll('[data-lazy-load]').forEach(loadImage);
}

export default function lazyLoad() {
  /* istanbul ignore if */
  if (document.readyState !== 'complete') {
    window.addEventListener('load', lazyLoad, false);
    return;
  }

  onload();
}
