
import state from '@/store/state';

const initialState = Object.assign({}, state);

export function isFunction(object) {
  return typeof object === 'function';
}

export function isArray(object) {
  return Array.isArray(object);
}

export function isObject(object) {
  return !!object && {}.toString.call(object) === '[object Object]';
}

export function isString(object) {
  return typeof object === 'string';
}

export function resetStore(store) {
  if (store) {
    store.replaceState(Object.assign({}, initialState));
  }
}

export function randomNumber(min = 0, max = 100) {
  return Math.floor((Math.random() * max) + min);
}
