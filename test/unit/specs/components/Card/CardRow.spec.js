import Vue from 'vue';
import CardRow from '@/components/Card/CardRow';

const card = {
  title: 'Card Title',
  image: 'https://images.unsplash.com/photo-1480318931062-06a1fef0a31b?dpr=2&auto=format&fit=crop&w=600&q=80&cs=tinysrgb&crop=',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, velit...',
  url: 'https://google.com',
  readmore: 'Learn More',
};
const items = [];
let i = 0;
while (i < 3) {
  items.push(card);
  i += 1;
}

function createVM() {
  const Constructor = Vue.extend(CardRow);
  return new Constructor({
    propsData: {
      items,
    },
  }).$mount();
}

describe('CardRow.vue', () => {
  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('card-row')).to.be.true;
  });

  it('should create cards', () => {
    const vm = createVM();
    expect(vm.$el.querySelectorAll('.card').length).to.equal(items.length);
  });
});
