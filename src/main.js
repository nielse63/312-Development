import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import App from '@/App';
import store from '@/store';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import inView from '@/directives/in-view';

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}

// create global event bus
Vue.prototype.$dispatcher = new Vue();
Vue.config.productionTip = false;

// setup vue analytics
Vue.use(VueAnalytics, {
  id: 'UA-33505945-1',
});

// setup custom directives
inView();


/* eslint-disable no-new */
new Vue({
  store,
  el:         '#app',
  template:   '<App/>',
  components: { App },
});
