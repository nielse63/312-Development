import { shallowMount } from '@vue/test-utils';
import ContentSectionPortfolio from '@/components/ContentSectionPortfolio';

describe('ContentSectionPortfolio.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ContentSectionPortfolio);
    expect(wrapper).not.toBeNull();
  });
});
