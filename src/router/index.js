
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Experience from '@/views/Experience';
import Contact from '@/views/Contact';

Vue.use(Router);

export default new Router({
  mode:   'history',
  routes: [
    {
      name:      'home',
      path:      '/home',
      component: Home,
    },
    {
      name:      'about',
      path:      '/about',
      component: About,
    },
    {
      name:      'experience',
      path:      '/experience',
      component: Experience,
    },
    {
      name:      'contact',
      path:      '/contact',
      component: Contact,
    },
  ],
});
