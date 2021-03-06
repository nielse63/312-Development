import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppNavigation from '@/components/AppNavigation';
import mockStore from '../../utils/store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppNavigation.vue', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(AppNavigation, { store, localVue });
    expect(wrapper.classes()).toContain('app-navigation');
  });
});
