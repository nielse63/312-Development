import { shallowMount, createLocalVue } from '@vue/test-utils';
import CardTool from '@/components/CardTool';
import inView from '@/directives/in-view';

const localVue = createLocalVue();
localVue.directive('in-view', inView);

describe('CardTool.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CardTool, {
      propsData: {
        title: 'Card Title',
        image: 'some/image/path.jpg',
      },
      localVue,
    });
    expect(wrapper).not.toBeNull();
  });
});
