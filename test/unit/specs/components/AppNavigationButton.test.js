import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import AppNavigationButton from '@/components/AppNavigationButton';

const localVue = createLocalVue();
localVue.prototype.$dispatcher = new Vue();

describe('AppNavigationButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AppNavigationButton, { localVue });
    expect(wrapper.classes()).toContain('app-navigation-button');
  });

  it('sets `open` property', () => {
    const wrapper = shallowMount(AppNavigationButton, {
      propsData: {
        open: true,
      },
      localVue,
    });
    expect(wrapper.classes()).toContain('button-open');
  });

  it('should emit `navtoggle` event', () => {
    const wrapper = shallowMount(AppNavigationButton, { localVue });
    wrapper.vm.onclick();
    expect(wrapper.emitted('navtoggle')).toBeTruthy();
  });
});
