/* eslint-disable no-param-reassign */

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
export default {
  closeMenu(state) {
    state.menuOpen = false;
  },
  toggleMenu(state) {
    state.menuOpen = !state.menuOpen;
  },
  saveRepos(state, repos) {
    state.repos = repos;
  },
  saveModule(state, payload) {
    state.modules[payload.name] = payload.data;
  },
  saveTweets(state, payload) {
    state.tweets = payload;
  },
};
