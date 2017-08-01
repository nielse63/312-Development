import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import OpenSource from '@/components/About/OpenSource';

function createVM() {
  const Constructor = Vue.extend(OpenSource);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('OpenSource.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
