import Vue from 'vue';
import FourOhFour from '@/pages/404';

function createVM() {
  const Constructor = Vue.extend(FourOhFour);
  return new Constructor().$mount();
}

describe('404.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });

  it('renders correct title', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.page-title').textContent).to.equal('404 - Page Not Found');
  });
});
