
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import TweetList from '@/components/Contact/TweetList';
import MockTweet from '../../../mocks/tweet';

let tweets = [];
let vm;

function createVM() {
  const Constructor = Vue.extend(TweetList);
  return new Constructor({
    store,
    router,
  }).$mount();
}

function resetTweetsArray() {
  const output = [];
  let i = 0;
  while (i < 10) {
    output.push(
      Object.assign({}, MockTweet)
    );
    i += 1;
  }
  return output;
}

describe('TweetList.vue', () => {
  describe('get tweets', () => {
    before(() => {
      window.IN_TESTING = true;
      tweets = resetTweetsArray();
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

  describe('formatTweets', () => {
    let output = [];

    beforeEach(() => {
      output = TweetList.methods.formatTweets(tweets);
    });

    it('should return 3 objects', () => {
      expect(output.length).to.equal(3);
    });

    it('should have specified keys', () => {
      output.forEach((object) => {
        expect(object).to.have.all.keys('href', 'time', 'text');
      });
    });
  });
});
