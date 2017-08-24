import Vue from 'vue';
import Contact from '@/pages/Contact';

function createVM() {
  const Constructor = Vue.extend(Contact);
  return new Constructor().$mount();
}

describe('Contact.vue', () => {
  before(() => {
    window.IN_TESTING = true;
  });

  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('contact')).to.be.true;
  });

  describe('submission', () => {
    it('should prevent form submission', () => {
      const vm = createVM();
      const children = vm.$children.filter(child => !!child.name);
      const half = children.length / 2;
      children.forEach((child, i) => {
        if (i < half) {
          child.valid = false;
        } else {
          child.value = child.name === 'Email Address' ? 'test@test.com' : 'Test Value';
          child.valid = true;
        }
      });
      vm.onsubmit();
      expect(vm.valid).to.be.false;
    });

    it('set child invalid', () => {
      const vm = createVM();
      const children = vm.$children.filter(child => !!child.name);
      children.forEach((child) => {
        child.value = '';
        child.valid = true;
      });
      vm.onsubmit();
      expect(vm.valid).to.be.false;
    });

    it('should allow form submission', () => {
      const vm = createVM();
      const children = vm.$children.filter(child => !!child.name);
      children.forEach((child) => {
        child.value = child.name === 'Email Address' ? 'test@test.com' : 'Test Value';
        child.valid = true;
      });
      vm.onsubmit();
      expect(vm.valid).to.be.true;
    });
  });
});
