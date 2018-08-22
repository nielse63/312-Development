import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import FormSubmit from '@/components/FormSubmit';
import mockStore from '../../utils/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.prototype.$dispatcher = new Vue();

describe('FormSubmit.vue', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(FormSubmit, {
      localVue,
      store,
    });
    expect(wrapper).not.toBeNull();
  });
});
