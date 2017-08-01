import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import #NAME# from '@/#PATH#';

function createVM() {
  const Constructor = Vue.extend(#NAME#);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('#NAME#.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
