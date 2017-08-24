import Vue from 'vue';
import store from '@/store';
import Portfolio from '@/pages/Portfolio';

function createVM() {
  const Constructor = Vue.extend(Portfolio);
  return new Constructor({
    store,
  }).$mount();
}

describe('Portfolio.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('portfolio')).to.be.true;
    expect(vm.$el.querySelector('.page-title').textContent).to.equal('Portfolio');
  });
});
