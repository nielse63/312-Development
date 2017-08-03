
/* istanbul ignore next */
function loadImageElement(element, src, callback) {
  if (!element.hasAttribute('data-lazy-load')) {
    callback();
    return;
  }

  element.onload = () => {
    callback();
  };
  element.setAttribute('src', src);
}

/* istanbul ignore next */
function loadBackgroundImage(element, src, callback) {
  if (!element.hasAttribute('data-lazy-load')) {
    callback();
    return;
  }

  element.style.backgroundImage = `url(${src})`;
  callback();
}

/* istanbul ignore next */
function loadImage(element, callback = () => {}) {
  const src = element.getAttribute('data-lazy-load');
  if (element.nodeName.toLowerCase() === 'img') {
    loadImageElement(element, src, callback);
  } else {
    loadBackgroundImage(element, src, callback);
  }
}

/* istanbul ignore next */
export default function lazyLoad() {
  if (document.readyState !== 'complete') {
    document.onreadystatechange = lazyLoad;
    return;
  }

  const elements = document.querySelectorAll('[data-lazy-load]');
  elements.forEach((element) => {
    loadImage(element);
    element.removeAttribute('data-lazy-load');
  });
}
