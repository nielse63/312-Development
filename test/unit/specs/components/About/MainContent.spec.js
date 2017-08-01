import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import MainContent from '@/components/About/MainContent';

function createVM() {
  const Constructor = Vue.extend(MainContent);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('MainContent.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
