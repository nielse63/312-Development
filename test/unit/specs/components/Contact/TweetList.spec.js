import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import TweetList from '@/components/Contact/TweetList';

function createVM() {
  const Constructor = Vue.extend(TweetList);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('TweetList.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
