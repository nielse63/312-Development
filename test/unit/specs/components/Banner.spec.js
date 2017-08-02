import Vue from 'vue';
import Banner from '@/components/Banner';

function getRenderedText(Component, propsData) {
  const Ctor = Vue.extend(Component);
  const vm = new Ctor({ propsData }).$mount();
  return vm.$el.textContent.trim();
}

describe('Banner.vue', () => {
  it('has a mounted hook', () => {
    expect(typeof Banner.mounted).to.equal('function');
  });

  it('renders title correctly', () => {
    ['Howdy', 'Something Else'].forEach((word) => {
      expect(getRenderedText(Banner, {
        title: word,
      })).to.equal(word);
    });
  });

  it('renders subtitle correctly', () => {
    expect(getRenderedText(Banner, {
      title: 'Title',
      subtitle: 'Subtitle',
    })).to.equal('Title Subtitle');
  });

  it('should render correctly', () => {
    const Ctor = Vue.extend(Banner);
    const vm = new Ctor({
      propsData: {
        title: 'Banner Title',
      },
    }).$mount();
    expect(vm.$el.classList.contains('banner')).to.be.true;
  });
});
