import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppNavigation from '@/components/AppNavigation';

const fakeStore = {
  modules: {
    nav: {
      state: {
        open: false,
      },
    },
  },
};
const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppNavigation.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(fakeStore);
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(AppNavigation, { store, localVue });
    expect(wrapper.classes()).toContain('app-navigation');
  });
});
