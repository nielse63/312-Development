import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import App from '@/App';
import inView from '@/directives/in-view';

const localVue = createLocalVue();
localVue.directive('in-view', inView);
localVue.prototype.$dispatcher = new Vue();

describe('App.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
    });
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.classes()).toContain('app');
  });

  it('methods alter `isNavOpen` value', () => {
    wrapper.vm.onpageclick();
    expect(wrapper.vm.$data.isNavOpen).toBe(false);

    const oldNavOpenValue = wrapper.vm.$data.isNavOpen;
    wrapper.vm.onnavtoggle();
    expect(wrapper.vm.$data.isNavOpen).toBe(!oldNavOpenValue);

    wrapper.vm.onnavclose();
    expect(wrapper.vm.$data.isNavOpen).toBe(false);
  });
});
