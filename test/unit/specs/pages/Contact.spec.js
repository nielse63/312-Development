import Vue from 'vue';
import Contact from '@/pages/Contact';

function createVM() {
  const Constructor = Vue.extend(Contact);
  return new Constructor().$mount();
}

describe('Contact.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('contact')).to.be.true;
  });
});
