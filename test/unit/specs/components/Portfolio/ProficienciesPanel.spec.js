import Vue from 'vue';
import ProficienciesPanel from '@/components/Portfolio/ProficienciesPanel';

function createVM() {
  const Constructor = Vue.extend(ProficienciesPanel);
  return new Constructor().$mount();
}

describe('ProficienciesPanel.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
