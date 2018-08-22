import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FormInput from '@/components/FormInput';
import mockStore from '../../utils/store';
import inView from '@/directives/in-view';


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive('in-view', inView);

describe('FormInput.vue', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(FormInput, {
      propsData: {
        label: 'Label Text',
      },
      localVue,
      store,
    });
    expect(wrapper).not.toBeNull();
  });
});
