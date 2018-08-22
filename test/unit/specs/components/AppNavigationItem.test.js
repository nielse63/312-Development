import { shallowMount } from '@vue/test-utils';
import AppNavigationItem from '@/components/AppNavigationItem';

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
