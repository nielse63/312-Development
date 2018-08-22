import { shallowMount, createLocalVue } from '@vue/test-utils';
import CardPortfolio from '@/components/CardPortfolio';
import inView from '@/directives/in-view';

const localVue = createLocalVue();
localVue.directive('in-view', inView);

describe('CardPortfolio.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CardPortfolio, {
      propsData: {
        title: 'Card Title',
        image: 'https://via.placeholder.com/350x150',
        url:   'https://google.com/',
      },
      localVue,
    });
    expect(wrapper).not.toBeNull();
  });
});
