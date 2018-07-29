
module.exports = function debounce(func, wait = 250, immediate = false) {
  let timeout;
  return function fn(...args) {
    const context = this;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, ...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, ...args);
  };
};