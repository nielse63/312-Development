import Vue from 'vue';
import store from '@/store';
import About from '@/pages/About';

function createVM() {
  const Constructor = Vue.extend(About);
  return new Constructor({
    store,
  }).$mount();
}

describe('About.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.about h1').textContent).to.equal('About Me');
  });
});
