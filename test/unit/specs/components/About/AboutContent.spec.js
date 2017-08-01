import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import AboutContent from '@/components/About/AboutContent';

function createVM() {
  const Constructor = Vue.extend(AboutContent);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('AboutContent.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
