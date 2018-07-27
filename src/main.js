import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from '@/App';
import store from '@/store';

Vue.use(VeeValidate, {
  events: 'blur',
});
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  store,
  el:         '#app',
  template:   '<App/>',
  components: { App },
});
