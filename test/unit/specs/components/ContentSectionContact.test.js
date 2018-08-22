import { shallowMount } from '@vue/test-utils';
import ContentSectionContact from '@/components/ContentSectionContact';

describe('ContentSectionContact.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ContentSectionContact);
    expect(wrapper).not.toBeNull();
  });
});
