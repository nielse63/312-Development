import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppNavigationButton from '@/components/AppNavigationButton';
import mockStore from '../../utils/store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppNavigationButton.vue', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(AppNavigationButton, { store, localVue });
    expect(wrapper.classes()).toContain('app-navigation-button');
  });
});
