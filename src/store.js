import { createStore } from 'redux';

let ACTIONS = {
  SET_TITLE: ({ title, ...state }, { text }) => ({
    title: [...title, {
      id: Math.random().toString(36).substring(2),
      text
    }],
    ...state
  }),
  SET_DESCRIPTION: ({ description, ...state }, { text }) => ({
    description: [...description, {
      id: Math.random().toString(36).substring(2),
      text
    }],
    ...state
  }),
};

const INITIAL = {
  title: '',
  description: '',
};

export default createStore((state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
