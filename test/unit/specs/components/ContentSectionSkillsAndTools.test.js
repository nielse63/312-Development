import { shallowMount } from '@vue/test-utils';
import ContentSectionSkillsAndTools from '@/components/ContentSectionSkillsAndTools';

describe('ContentSectionSkillsAndTools.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ContentSectionSkillsAndTools);
    expect(wrapper).not.toBeNull();
  });
});
