
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import OpenSource from '@/components/About/OpenSource';
import MockRepo from '../../../mocks/repo';

let vm;

function createVM() {
  const Constructor = Vue.extend(OpenSource);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('OpenSource.vue', () => {
  beforeEach(() => {
    window.IN_TESTING = true;
  });

  it('should format repos', () => {
    const output = OpenSource.methods.formatRepos([MockRepo]);
    const repo = output[0];
    expect(repo).to.have.any.keys('image', 'url');
    expect(repo.url).to.equal(repo.html_url);
  });

  describe('happy path', () => {
    before((done) => {
      vm = createVM();
      setTimeout(() => {
        done();
      }, 1000);
    });

    it('should get github data', (done) => {
      setTimeout(() => {
        expect(vm.$el.querySelector('.card')).to.not.be.null;
        done();
      }, 1000);
    });
  });
});
