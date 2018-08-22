import { shallowMount } from '@vue/test-utils';
import COMPONENT_NAME from '@/components/COMPONENT_NAME';

describe('COMPONENT_NAME.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(COMPONENT_NAME);
    expect(wrapper).not.toBeNull();
  });
});
