import { shallowMount, createLocalVue } from '@vue/test-utils';
import ContentSectionAbout from '@/components/ContentSectionAbout';
import inView from '@/directives/in-view';

const localVue = createLocalVue();
localVue.directive('in-view', inView);

describe('ContentSectionAbout.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ContentSectionAbout, {
      localVue,
    });
    expect(wrapper).not.toBeNull();
  });
});
