import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppNavigationButton from '@/components/AppNavigationButton';

const fakeStore = {
  modules: {
    nav: {
      state: {
        open: false,
      },
      actions: {
        toggle: jest.fn(),
      },
    },
  },
};
const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppNavigationButton.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(fakeStore);
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(AppNavigationButton, { store, localVue });
    expect(wrapper.classes()).toContain('app-navigation-button');
  });
});
