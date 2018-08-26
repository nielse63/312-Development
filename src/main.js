import Vue from 'vue';
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

// setup custom directives
inView();


/* eslint-disable no-new */
new Vue({
  store,
  el:         '#app',
  template:   '<App/>',
  components: { App },
});
