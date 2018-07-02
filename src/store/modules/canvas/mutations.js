
export default {
  setElement(state, payload) {
    state.element = payload;
  },
  setFunction(state, payload) {
    state.function = payload;
  },
  start(state) {
    state.running = true;
    state.paused = false;
  },
  pause(state) {
    state.running = false;
    state.paused = true;
  },
  reset(state) {
    state.paused = false;
    state.running = false;
    state.function = null;
    state.animationFrameId = null;
  },
};
