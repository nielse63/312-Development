
import { get } from 'js-cookie';

export function debounce(func, wait, immediate) {
  let timeout;
  return function rfn(...args) {
    const context = this;
    const later = function callback() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function hasFormSubmission() {
  return !!get('form_submission');
}

export function inTesting() {
  return window.navigator.userAgent.indexOf('HeadlessChrome') > -1;
}
