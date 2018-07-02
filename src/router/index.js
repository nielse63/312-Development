
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Experience from '@/views/Experience';
import Portfolio from '@/views/Portfolio';
import Contact from '@/views/Contact';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      name:      'home',
      path:      '/',
      component: Home,
    },
    {
      name:      'about-me',
      path:      '/about-me',
      component: About,
    },
    {
      name:      'experience',
      path:      '/experience',
      component: Experience,
    },
    {
      name:      'portfolio',
      path:      '/portfolio',
      component: Portfolio,
    },
    {
      name:      'contact',
      path:      '/contact-me',
      component: Contact,
    },
  ],
});

export default router;
