
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Experience from '@/views/Experience';
import Portfolio from '@/views/Portfolio';
import Contact from '@/views/Contact';
import FourOhFour from '@/views/FourOhFour';
import store from '@/store';
import content, { subtitle } from '@/lib/content';

Vue.use(Router);

const router = new Router({
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      name:      'home',
      path:      '/',
      component: Home,
      meta:      {
        description: subtitle,
      },
    },
    {
      name:      'about-me',
      path:      '/about-me',
      component: About,
      meta:      {
        description: content.about.description,
      },
    },
    {
      name:      'experience',
      path:      '/experience',
      component: Experience,
      meta:      {
        description: content.experience.description,
      },
    },
    {
      name:      'portfolio',
      path:      '/portfolio',
      component: Portfolio,
      meta:      {
        description: content.portfolio.description,
      },
    },
    {
      name:      'contact',
      path:      '/contact-me',
      component: Contact,
      meta:      {
        description: content.contact.description,
      },
    },
    {
      name:      'four-oh-four',
      path:      '*',
      component: FourOhFour,
      meta:      {
        description: content.four04.description,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch('nav/close', null, { root: true });
  next();
});

export default router;
