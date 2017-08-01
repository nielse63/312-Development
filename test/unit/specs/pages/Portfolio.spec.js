import Vue from 'vue';
import store from '@/store';
// import { getGithubData } from '@/lib/data';
import Portfolio from '@/pages/Portfolio';

// let repos = [];

function createVM() {
  const Constructor = Vue.extend(Portfolio);
  return new Constructor({
    store,
  }).$mount();
}

describe('Portfolio.vue', () => {
  // before((done) => {
  //   getGithubData().then((data) => {
  //     repos = data;
  //     done();
  //   })
  // })

  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('portfolio')).to.be.true;
    expect(vm.$el.querySelector('.page-title').textContent).to.equal('Portfolio');
  });
});
