
import Vue from 'vue';
import store from '@/store';
import ProjectsPanel from '@/components/Home/ProjectsPanel';
import { isArray } from '../../../helpers';

function createVM() {
  const Constructor = Vue.extend(ProjectsPanel);
  return new Constructor({
    store,
  }).$mount();
}
let vm;

describe('ProjectsPanel.vue', () => {
  beforeEach((done) => {
    window.IN_TESTING = true;
    vm = createVM();

    setTimeout(() => {
      done();
    }, 1000);
  });

  afterEach((done) => {
    vm.$destroy();
    Vue.nextTick(() => {
      done();
    });
  });

  it('should set repos', () => {
    expect(isArray(vm.repos)).to.be.true;
    expect(vm.repos.length).to.be.above(0);
    expect(vm.repos.length).to.be.below(4);
  });

  it('should change on click', () => {
    const buttons = vm.$el.querySelectorAll('.projects__button');
    buttons.item(1).click();
    expect(vm.activeIndex).to.equal(1);
  });

  it('should revert on click', () => {
    const buttons = vm.$el.querySelectorAll('.projects__button');
    buttons.item(0).click();
    expect(vm.activeIndex).to.equal(0);
  });

  it('should prevent index update on same button click', () => {
    const buttons = vm.$el.querySelectorAll('.projects__button');
    buttons.item(0).click();
    expect(vm.activeIndex).to.equal(0);
  });
});
