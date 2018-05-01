
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import TweetList from '@/components/Contact/TweetList';

function createVM(tweets) {
  if (tweets) {
    store.commit('saveTweets', tweets);
  }

  const Constructor = Vue.extend(TweetList);
  return new Constructor({
    store,
    router,
  }).$mount();
}

let vm;

describe('TweetList.vue', () => {
  describe('exists', () => {
    before((done) => {
      vm = createVM();
      Vue.nextTick(() => { done(); });
    });

    after((done) => {
      vm.$destroy();
      Vue.nextTick(() => { done(); });
    });

    it('should render correct contents', () => {
      expect(vm.$el).to.not.be.null;
    });
  });

  describe('gets existing tweets', () => {
    before((done) => {
      const tweets = [{
        date: 'Today @ 3:47 pm',
        text: 'Animating Progress https://t.co/BtMooIjCcm',
        time: 'Mon Apr 30 20:47:30 +0000 2018',
        url: 'https://twitter.com/ErikKyleNielsen/status/991056471117967400',
      }, {
        date: 'Today @ 12:26 pm',
        text: 'Go Time 78: Hacking drones with Go with Ron Evans https://t.co/Bj6PRsqWtd',
        time: 'Mon Apr 30 17:26:11 +0000 2018',
        url: 'https://twitter.com/ErikKyleNielsen/status/991005807553720300',
      }];
      vm = createVM(tweets);
      Vue.nextTick(() => { done(); });
    });

    after((done) => {
      vm.$destroy();
      Vue.nextTick(() => { done(); });
    });

    it('should render existing tweets', () => {
      expect(vm.tweets.length).to.equal(2);
    });
  });
});
