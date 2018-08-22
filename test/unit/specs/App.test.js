import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App';
import inView from '@/directives/in-view';
import mockStore from '../utils/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive('in-view', inView);

describe('App.vue', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(App, {
      store,
      localVue,
    });
    expect(wrapper).not.toBeNull();
  });
});
