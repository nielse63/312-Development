import Vue from 'vue';
import ReadingPanel from '@/components/Home/ReadingPanel';

function createVM() {
  const Constructor = Vue.extend(ReadingPanel);
  return new Constructor().$mount();
}

describe('ReadingPanel.vue', () => {
  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('panel')).to.be.true;
  });

  it('should print title', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('h2').textContent).to.equal('What I\'m Reading');
  });
});
