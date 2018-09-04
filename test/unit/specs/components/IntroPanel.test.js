import { shallowMount, createLocalVue } from '@vue/test-utils';
import IntroPanel from '@/components/IntroPanel';

const localVue = createLocalVue();

describe('IntroPanel.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(IntroPanel, {
      propsData: {
        title: 'Panel Title',
      },
      localVue,
      attachToDocument: true,
    });
  });

  it('renders correctly', () => {
    expect(wrapper.classes()).toContain('canvas');
  });

  it('renders canvas', () => {
    wrapper.vm.startCanvas();
    expect(wrapper.contains('.particles-js-canvas-el')).toBeTruthy();
  });

  it('outputs title', () => {
    expect(wrapper.find('h1').text()).toBe('Panel Title');
  });
});
