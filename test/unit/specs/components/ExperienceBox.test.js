import { shallowMount } from '@vue/test-utils';
import ExperienceBox from '@/components/ExperienceBox';

describe('ExperienceBox.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ExperienceBox, {
      propsData: {
        header:      'Box Header',
        description: 'Lorem ipsum dolor sit amet',
      },
    });
    expect(wrapper).not.toBeNull();
  });
});
