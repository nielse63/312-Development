import Vue from 'vue';
import InputCol from '@/components/Contact/InputCol';

const defaults = {
  name: 'Input Name',
};

function createVM(input = {}) {
  const props = Object.assign({}, defaults, input);
  const Constructor = Vue.extend(InputCol);
  return new Constructor({
    propsData: props,
  }).$mount();
}

describe('InputCol.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('row')).to.be.true;
    expect(vm.$el.querySelector('input')).to.not.be.null;
  });

  it('should render label test', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('label').textContent).to.equal('Your Input Name');
  });

  it('should generate proper attributes', () => {
    const vm = createVM();
    const input = vm.$el.querySelector('input');
    expect(input.name).to.equal('input-name');
  });

  describe('isValidEmail', () => {
    it('should be true', () => {
      const fn = InputCol.methods.isEmailValid;
      expect(fn('something@somewhere.com')).to.be.true;
    });

    it('should be false', () => {
      const fn = InputCol.methods.isEmailValid;
      expect(fn('string')).to.be.false;
    });
  });

  describe('type validation', () => {
    it('should create text input by default', () => {
      const vm = createVM();
      const input = vm.$el.querySelector('input');
      expect(input.type).to.equal('text');
    });

    it('should create textarea', (done) => {
      const vm = createVM({ type: 'textarea' });
      Vue.nextTick(() => {
        const input = vm.$el.querySelector('textarea');
        expect(input).to.not.be.null;
        done();
      });
    });

    it('should create email input', (done) => {
      const vm = createVM({ type: 'email' });
      Vue.nextTick(() => {
        const input = vm.$el.querySelector('input');
        expect(input.type).to.equal('email');
        done();
      });
    });
  });

  describe('computed props', () => {
    it('should create be false for text inputs', () => {
      const vm = createVM();
      expect(vm.needsValidation).to.be.false;
    });

    it('should create be false for textareas', () => {
      const vm = createVM({ type: 'textarea' });
      expect(vm.needsValidation).to.be.false;
    });

    it('should create be true for email inputs', () => {
      const vm = createVM({ type: 'email' });
      expect(vm.needsValidation).to.be.true;
    });
  });

  describe('is valid', () => {
    it('should be true by default', () => {
      const vm = createVM();
      expect(vm.valid).to.be.true;
    });

    it('should be false', () => {
      const vm = createVM();
      const e = {
        target: {
          value: '',
        },
      };
      vm.onblur(e);
      expect(vm.valid).to.be.false;
    });

    it('should be true', () => {
      const vm = createVM();
      const e = {
        target: {
          value: 'Value',
        },
      };
      vm.onblur(e);
      expect(vm.valid).to.be.true;
    });

    it('should be false for email', () => {
      const vm = createVM({ type: 'email' });
      const e = {
        target: {
          value: 'Value',
        },
      };
      vm.onblur(e);
      expect(vm.valid).to.be.false;
    });

    it('should be true for email', () => {
      const vm = createVM({ type: 'email' });
      const e = {
        target: {
          value: 'test@test.com',
        },
      };
      vm.onblur(e);
      expect(vm.valid).to.be.true;
    });
  });
});
