import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntroPanel from '@/components/IntroPanel';
import inView from '@/directives/in-view';

const localVue = createLocalVue();
localVue.directive('in-view', inView);

describe('IntroPanel.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(IntroPanel, {
      localVue,
    });
    expect(wrapper).not.toBeNull();
  });
});
