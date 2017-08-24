import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import ProjectsPanel from '@/components/Portfolio/ProjectsPanel';

function createVM() {
  const Constructor = Vue.extend(ProjectsPanel);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('ProjectsPanel.vue', () => {
  it('load highcharts', (done) => {
    ProjectsPanel.methods.loadChart().then(() => {
      expect(window.Highcharts).to.not.be.null;
      done();
    });
  });

  it('prevent loading highcharts', (done) => {
    ProjectsPanel.methods.loadChart().then(() => {
      expect(window.Highcharts).to.not.be.null;
      done();
    });
  });

  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('panel')).to.be.true;
  });
});
