
import { get } from 'js-cookie';

export function hasFormSubmission() {
  return !!get('form_submission');
}
