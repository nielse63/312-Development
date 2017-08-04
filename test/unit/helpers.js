
export function isFunction(object) {
  return typeof object === 'function';
}

export function isArray(object) {
  return {}.toString.call(object) === '[object Array]';
}

export function isObject(object) {
  return {}.toString.call(object) === '[object Object]';
}

export function isString(object) {
  return typeof object === 'string';
}
