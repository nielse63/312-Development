export default {
  open(state) {
    state.open = true;
  },
  close(state) {
    state.open = false;
  },
  toggle(state) {
    state.open = !state.open;
  },
};
