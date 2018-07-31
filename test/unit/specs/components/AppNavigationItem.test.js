import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AppNavigationItem from '@/components/AppNavigationItem';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppNavigationItem.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AppNavigationItem, {
      propsData: {
        path: '/',
        text: 'Home',
      },
    });
    expect(wrapper.contains('li')).toBe(true);
  });
});
