import Vue from 'vue';
import Timeline from '@/components/Timeline/Timeline';

describe('Timeline.vue', () => {
  it('should render correctly', () => {
    const Constructor = Vue.extend(Timeline);
    const vm = new Constructor().$mount();
    expect(vm.$el.classList.contains('timeline')).to.be.true;
  });
});
