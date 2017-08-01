import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import FooterPattern from '@/components/FooterPattern';

function createVM() {
  const Constructor = Vue.extend(FooterPattern);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('FooterPattern.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
