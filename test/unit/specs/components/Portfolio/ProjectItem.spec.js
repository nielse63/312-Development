import Vue from 'vue';
import store from '@/store';
import ProjectItem from '@/components/Portfolio/ProjectItem';

function createVM() {
  const Constructor = Vue.extend(ProjectItem);
  return new Constructor({
    propsData: {
      title: 'expand-hex-code',
    },
    store,
  }).$mount();
}

describe('ProjectItem.vue', () => {
  it('should render correctly', () => {
    const vm = createVM();
    expect(vm.$el.classList.contains('project')).to.be.true;
    expect(vm.$el.querySelector('.project__title').textContent).to.equal('expand-hex-code');
  });

  it('should contain downloads and stars', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.downloads')).to.not.be.null;
    expect(vm.$el.querySelector('.stars')).to.not.be.null;
  });

  it('should create a trend graph', () => {
    const vm = createVM();
    expect(vm.$el.querySelector('.trend__graph')).to.not.be.null;
  });

  it('should render the correct url', () => {
    const vm = createVM();
    expect(vm.url).to.equal('https://npmjs.com/expand-hex-code');
  });
});
