import Vue from 'vue';
import InputCol from '@/components/Contact/InputCol';

function createVM() {
  const Constructor = Vue.extend(InputCol);
  return new Constructor({
    propsData: {
      name: 'Input Name',
    },
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
    expect(
      input.name,
    ).to.equal('input-name');
    expect(
      input.type,
    ).to.equal('text');
  });
});
