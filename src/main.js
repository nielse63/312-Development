// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import '@/lib/service-worker';
import '@/lib/prototypes';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

router.afterEach((to) => {
  // scroll to top
  window.scrollTo(0, 0);
  store.dispatch('closeMenu');
  const route = to.matched[0];
  const title = route.props.default.title;
  window.document.title = `Chicago JavaScript Engineer | ${title}`;
});

// router.linkActiveClass = 'active';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
