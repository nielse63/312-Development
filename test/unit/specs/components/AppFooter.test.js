import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/AppFooter';

describe('AppFooter.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.classes()).toContain('footer');
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
