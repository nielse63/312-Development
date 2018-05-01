
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/App';

function createVM() {
  const Constructor = Vue.extend(App);
  return new Constructor({ store, router }).$mount();
}

describe('App.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('app')).to.be.true;
  });
});
