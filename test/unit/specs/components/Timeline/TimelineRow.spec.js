import Vue from 'vue';
import TimelineRow from '@/components/Timeline/TimelineRow';

function createVM() {
  const Constructor = Vue.extend(TimelineRow);
  return new Constructor({
    propsData: {
      height: 0.5,
      item: {
        title: 'Timeline Item',
        content: 'Lorem ipsum dolor sit amet.',
        date: new Date(),
      },
      index: 0,
    },
  }).$mount();
}

describe('TimelineRow.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
