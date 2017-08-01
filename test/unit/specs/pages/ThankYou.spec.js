import Vue from 'vue';
import ThankYou from '@/pages/ThankYou';

function createVM() {
  const Constructor = Vue.extend(ThankYou);
  return new Constructor().$mount();
}

describe('ThankYou.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('thank-you')).to.be.true;
    expect(vm.$el.querySelector('.page-title').textContent).to.equal('Thank You');
  });
});
