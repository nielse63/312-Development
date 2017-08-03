
import { get } from 'js-cookie';

export function inTesting() {
  return window.navigator.userAgent.indexOf('HeadlessChrome') > -1;
}

export function hasFormSubmission() {
  return !!get('form_submission');
}
