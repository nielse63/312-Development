import Vue from 'vue';
import store from '@/store';
import ProjectsPanel from '@/components/Home/ProjectsPanel';
import MockRepo from '../../../mocks/repo';

function createVM() {
  const Constructor = Vue.extend(ProjectsPanel);
  return new Constructor({
    store,
  }).$mount();
}

function copyObject(object) {
  return Object.assign({}, object);
}

describe('ProjectsPanel.vue', () => {
  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('panel__pink')).to.be.true;
  });

  describe('watch.repos', () => {
    const watchRepos = ProjectsPanel.watch.repos;

    it('should be a function', () => {
      expect(typeof watchRepos).to.equal('function');
    });

    it('should return for empty array', () => {
      const output = watchRepos([], []);
      expect(output).to.equal(undefined);
    });
  });

  describe('formatRepos', () => {
    const formatRepos = ProjectsPanel.methods.formatRepos;

    it('should be a function', () => {
      expect(typeof formatRepos).to.equal('function');
    });

    it('should output array', () => {
      const output = formatRepos([MockRepo]);
      expect({}.toString.call(output)).to.equal('[object Array]');
    });

    it('should format correctly', () => {
      const output = formatRepos([MockRepo]);
      expect(output[0].title).to.equal(MockRepo.name);
      expect(output[0].content).to.equal(MockRepo.description);
      expect(output[0].stars).to.equal(MockRepo.stargazers_count);
    });

    it('should sort correctly', () => {
      const repos = [
        copyObject(MockRepo),
        copyObject(MockRepo),
      ];
      repos[0].name = 'First Repo';
      repos[0].stargazers_count = 0;
      repos[1].name = 'Second Repo';
      repos[1].stargazers_count = 100;
      const output = formatRepos(repos);
      expect(output[0].title).to.equal(repos[1].name);
      expect(output[1].title).to.equal(repos[0].name);
    });
  });
});
