import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import PanelHeader from '@/components/Panels/PanelHeader';

function createVM() {
  const Constructor = Vue.extend(PanelHeader);
  return new Constructor({
    store,
    router,
  }).$mount();
}

describe('PanelHeader.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
