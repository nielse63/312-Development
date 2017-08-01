import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import Tweet from '@/components/Contact/Tweet';

function createVM() {
  const Constructor = Vue.extend(Tweet);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('Tweet.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
