
module.exports = (func, limit = 250) => {
  let throttling;
  return function fn(...argz) {
    if (throttling) return;

    const args = argz;
    const context = this;
    func.apply(context, args);
    throttling = true;
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      throttling = false;
    }, limit);
  };
};
