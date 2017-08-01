import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import Navigation from '@/components/Navigation';

function createVM() {
  const Constructor = Vue.extend(Navigation);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('Navigation.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('navigation')).to.be.true;
  });
});
