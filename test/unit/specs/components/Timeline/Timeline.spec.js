import Vue from 'vue';
import Timeline from '@/components/Timeline/Timeline';

describe('Timeline.vue', () => {
  it('should render correctly', () => {
    const Constructor = Vue.extend(Timeline);
    const vm = new Constructor().$mount();
    expect(vm.$el.classList.contains('timeline')).to.be.true;
  });

  // it('should render timeline objects', () => {
  //   const Constructor = Vue.extend(Timeline);
  //   const vm = new Constructor().$mount();
  //   const data = Timeline.data();
  //   expect(vm.$el.querySelectorAll('.timeline__item').length).to.equal(data.points.length);
  // });
});
