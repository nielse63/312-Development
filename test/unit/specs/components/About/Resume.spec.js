import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import Resume from '@/components/About/Resume';

function createVM() {
  const Constructor = Vue.extend(Resume);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('Resume.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
