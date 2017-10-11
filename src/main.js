// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/lib/prototypes';
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

router.afterEach((to) => {
  // scroll to top
  window.scrollTo(0, 0);

  // close the menu
  store.dispatch('closeMenu');

  // update the document title
  const route = to.matched[0];
  const { title } = route.props.default;
  window.document.title = `312 Development | ${title}`;

  // create a canonical link
  const { protocol, hostname } = window.location;
  const { path } = route;
  const canonicalUrl = `${protocol}//${hostname}${path}`;
  const link = document.createElement('link');
  link.rel = 'canonical';
  link.href = canonicalUrl;
  const existingLink = document.head.querySelector('link[rel="canonical"]');
  if (existingLink) {
    existingLink.remove();
  }
  document.head.appendChild(link);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
