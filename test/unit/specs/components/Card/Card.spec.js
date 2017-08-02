import Vue from 'vue';
import Card from '@/components/Card/Card';

function createVM() {
  const Constructor = Vue.extend(Card);
  return new Constructor({
    propsData: {
      title: 'Card Title',
      image: 'https://images.unsplash.com/photo-1480318931062-06a1fef0a31b?dpr=2&auto=format&fit=crop&w=600&q=80&cs=tinysrgb&crop=',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, velit...',
      url: 'https://google.com',
      readmore: 'Learn More',
    },
  }).$mount();
}

describe('Card.vue', () => {
  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('card')).to.be.true;
  });

  it('should print title', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.card__title').textContent).to.equal('Card Title');
  });

  it('should render content', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.card__content').textContent).to.equal('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, velit...');
  });

  it('should render footer text', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.card__footer').textContent).to.equal('Learn More');
  });
});
