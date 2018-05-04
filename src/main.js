import Vue from 'vue';
import App from '@/App';
import store from '@/store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el:         '#app',
  template:   '<App/>',
  components: { App },
});
