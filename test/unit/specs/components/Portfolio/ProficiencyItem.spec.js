import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import ProficiencyItem from '@/components/Portfolio/ProficiencyItem';
import image from '@/assets/images/clean/angular';

function createVM() {
  const Constructor = Vue.extend(ProficiencyItem);
  return new Constructor({
    store,
    router,
    propsData: {
      name: 'Angular',
      image,
    },
  }).$mount();
}

describe('ProficiencyItem.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
