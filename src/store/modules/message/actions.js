
import api from '@/lib/api';

const VALIDATION_RULES = {
  required: {
    rgx:     /[a-zA-Z]+/,
    message: 'This field is required',
  },
  email: {
    rgx:     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Please enter a valid email address',
  },
  url: {
    rgx:     /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, // eslint-disable-line no-useless-escape
    message: 'Please enter a valid url',
  },
};

export default {
  setValue({ commit, dispatch }, payload) {
    dispatch('validateOne', payload);
    commit('setValue', payload);
  },
  validateOne({ commit }, { name, value }) {
    const errors = Object.keys(VALIDATION_RULES)
      .filter(key => key === 'required' || key === name)
      .map(key => VALIDATION_RULES[key])
      .filter(({ rgx }) => !rgx.test(value))
      .map(({ message }) => message);
    const error = errors[0] || '';
    commit('error', { name, error });
    commit('invalid');
  },
  validate({ dispatch, state }) {
    Object.entries(state.entry).forEach(([key, value]) => {
      dispatch('validateOne', { name: key, value });
    });
  },
  submit: async ({ commit, state }) => {
    const response = await api('/api/messages', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body:     JSON.stringify(state.entry),
    });
    if (!response.ok) {
      commit('submitError', true);
    }
  },
  reset({ commit }) {
    commit('submitError', false);
    commit('reset');
  },
};
