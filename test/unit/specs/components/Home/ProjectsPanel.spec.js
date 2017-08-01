import Vue from 'vue';
import ProjectsPanel from '@/components/Home/ProjectsPanel';

function createVM() {
  const Constructor = Vue.extend(ProjectsPanel);
  return new Constructor().$mount();
}

describe('ProjectsPanel.vue', () => {
  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('panel__pink')).to.be.true;
  });
});
