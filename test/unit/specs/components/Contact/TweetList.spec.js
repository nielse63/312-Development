
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import TweetList from '@/components/Contact/TweetList';

let vm;

function createVM() {
  const Constructor = Vue.extend(TweetList);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('TweetList.vue', () => {
  describe('get tweets', () => {
    before(() => {
      window.IN_TESTING = true;
    });

    beforeEach((done) => {
      vm = createVM();
      setTimeout(() => {
        done();
      }, 1000);
    });

    afterEach((done) => {
      vm.$destroy();
      Vue.nextTick(() => {
        done();
      });
    });

    it('should fetch tweets', () => {
      expect(vm.tweets.length).to.equal(3);
    });
  });
});
