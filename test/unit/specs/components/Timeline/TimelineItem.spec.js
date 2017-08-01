import Vue from 'vue';
import TimelineItem from '@/components/Timeline/TimelineItem';

function createVM() {
  const Constructor = Vue.extend(TimelineItem);
  return new Constructor({
    propsData: {
      title: 'Timeline Item',
      content: 'Lorem ipsum dolor sit amet.',
      date: new Date(),
      even: false,
    },
  }).$mount();
}

describe('TimelineItem.vue', () => {
  it('should render correct contents', () => {
    const vm = createVM();
    expect(vm.$el).to.not.be.null;
  });
});
