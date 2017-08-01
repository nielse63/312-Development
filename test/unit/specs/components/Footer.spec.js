import Vue from 'vue';
import router from '@/router';
import Footer from '@/components/Footer';

describe('Footer.vue', () => {
  it('should render correctly', () => {
    const Constructor = Vue.extend(Footer);
    const vm = new Constructor({
      router,
    }).$mount();
    expect(vm.$el.classList.contains('footer')).to.be.true;
    expect(vm.$el.querySelector('.footer__menu')).to.not.be.null;
  });

  it('should render navigation correctly', () => {
    const Constructor = Vue.extend(Footer);
    const vm = new Constructor({
      router,
    }).$mount();
    const visibleLinks = router.options.routes.filter(route => !route.props.hidden);
    expect(
      vm.$el.querySelectorAll('.footer__menu li').length,
    ).to.equal(visibleLinks.length);
  });
});
