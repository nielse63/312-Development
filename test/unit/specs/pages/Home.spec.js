import Vue from 'vue';
import store from '@/store';
import Home from '@/pages/Home';

function createVM() {
  const Constructor = Vue.extend(Home);
  return new Constructor({
    store,
  }).$mount();
}

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('home')).to.be.true;
    expect(vm.$el.querySelector('.site-title').textContent).to.equal('Erik Nielsen');
    expect(vm.$el.querySelector('.site-title__sub').textContent).to.equal('UI/UX Software Engineer');
    expect(vm.$el.querySelector('.site-title__sub__sub').textContent).to.equal('At Enova International');
  });
});
