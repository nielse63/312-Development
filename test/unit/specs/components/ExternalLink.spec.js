import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import ExternalLink from '@/components/ExternalLink';

function createVM() {
  const Constructor = Vue.extend(ExternalLink);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('ExternalLink.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
