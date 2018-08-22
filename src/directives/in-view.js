import Vue from 'vue';
import throttle from '@nielse63/throttle';

let elements = [];

function getViewport() {
  const { scrollY, innerHeight } = window;

  return {
    top:    scrollY,
    height: innerHeight,
    bottom: scrollY + innerHeight,
  };
}

function isElementInView(element, viewport) {
  if (element.height >= viewport.height && element.top <= viewport.top && element.bottom >= viewport.bottom) {
    return true;
  }
  return element.top >= viewport.top && element.bottom <= viewport.bottom;
}

function isOutsideViewport(element, viewport) {
  const elTop = element.top;
  const elBottom = element.bottom;
  const vpTop = viewport.top;
  const vpBottom = viewport.bottom;
  return elBottom < vpTop || elTop > vpBottom;
}

function checkElement(object, viewport) {
  const outsideViewport = isOutsideViewport(object, viewport);
  if (outsideViewport) {
    return true;
  }
  const inview = isElementInView(object, viewport);
  if (inview !== object.inview) Object.assign(object, { inview });
  return !inview;
}

function getOffsetTop(element) {
  let elementToCheck = element;
  let top = elementToCheck.offsetTop;
  if (!elementToCheck.offsetParent) {
    return top;
  }
  let shouldCheck = true;
  while (shouldCheck) {
    elementToCheck = elementToCheck.offsetParent;
    const elementNodeName = elementToCheck.nodeName.toLowerCase().trim();
    shouldCheck = elementNodeName !== 'body';
    if (shouldCheck) {
      top += elementToCheck.offsetTop;
    }
  }
  return top;
}

function setElement(object) {
  const element = object.element ? object.element : object;
  const { offsetHeight } = element;
  const top = getOffsetTop(element);

  return {
    element,
    top,
    bottom:  top + offsetHeight,
    height:  offsetHeight,
    $inview: null,
    get inview() {
      return this.$inview;
    },
    set inview(value) {
      if (value === this.$inview) return;
      this.$inview = value;
      this.element.dataset.inView = value;
    },
  };
}

function onViewportChange() {
  elements = [...elements.map(setElement)];
}

// eslint-disable-next-line no-use-before-define
const onscroll = throttle(onViewportMove, 25);
const onresize = throttle(onViewportChange, 100);

function onViewportMove() {
  const viewport = getViewport();
  const elementsNotInView = elements.filter(element => checkElement(element, viewport));
  elements = elementsNotInView;
  if (!elements.length) {
    ['load', 'resize', 'scroll'].forEach((evt) => {
      if (evt !== 'scroll') window.removeEventListener(evt, onresize);
      window.removeEventListener(evt, onscroll);
    });
  }
}


export default () => {
  ['load', 'resize', 'scroll'].forEach((evt) => {
    if (evt !== 'scroll') window.addEventListener(evt, onresize, false);
    window.addEventListener(evt, onscroll, false);
  });

  Vue.directive('in-view', (el) => {
    elements.push(setElement(el));
  });
};
