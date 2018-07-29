import Vue from 'vue';
import defaults from './defaults';

function handleMissingKey(key) {
  console.warn(`Cannot set value for key "${key}" on store`);
}

export default {
  reset(state) {
    state.entry = { ...defaults };
    state.errors = { ...defaults };
  },
  submitting(state, payload) {
    Vue.set(state, 'submitting', payload);
  },
  setValue(state, { name, value }) {
    if (!{}.hasOwnProperty.call(state.entry, name)) {
      handleMissingKey(name);
      return;
    }
    state.entry = { ...state.entry, [name]: value };
  },
  error(state, { name, error }) {
    if (!{}.hasOwnProperty.call(state.errors, name)) {
      handleMissingKey(name);
      return;
    }
    state.errors = { ...state.errors, [name]: error };
  },
  invalid(state) {
    const errors = Object.values(state.errors)
      .filter(error => !!error);
    Vue.set(state, 'invalid', !!errors.length);
  },
};
