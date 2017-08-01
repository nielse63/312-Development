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
  // console.log(route)
  const title = route.props.default.title;
  window.document.title = `312 Development | ${title}`;
  const { protocol, hostname } = window.location;
  const path = route.path;
  const canonicalUrl = `${protocol}//${hostname}${path}`;
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = canonicalUrl;
  const existingLink = document.head.querySelector('link[rel="canonical"]');
  if (existingLink) {
    existingLink.remove();
  }
  document.head.appendChild(link);
  // <link rel="canonical" href="https://blog.example.com/dresses/green-dresses-are-awesome" />
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
