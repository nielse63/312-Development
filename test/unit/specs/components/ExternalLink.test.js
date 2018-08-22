import { shallowMount } from '@vue/test-utils';
import ExternalLink from '@/components/ExternalLink';

describe('ExternalLink.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ExternalLink, {
      propsData: {
        href:  'https://google.com',
        title: 'Some text',
      },
    });
    expect(wrapper).not.toBeNull();
  });
});
