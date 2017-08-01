import Vue from 'vue';
import Banner from '@/components/Home/Banner';

describe('Banner.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Banner);
    const vm = new Constructor().$mount();
    expect(vm.$el).to.not.be.null;
  });
});
