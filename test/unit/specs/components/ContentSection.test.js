import { shallowMount, createLocalVue } from '@vue/test-utils';
import ContentSection from '@/components/ContentSection';
import inView from '@/directives/in-view';

const localVue = createLocalVue();
localVue.directive('in-view', inView);

describe('ContentSection.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ContentSection, {
      propsData: {
        title: 'Section Title',
      },
      localVue,
    });
    expect(wrapper).not.toBeNull();
  });
});
