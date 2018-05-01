import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Portfolio from '@/pages/Portfolio';
import ThankYou from '@/pages/ThankYou';
import FourOhFour from '@/pages/404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: {
        icon: 'fa-home',
        title: 'Chicago JavaScript Engineer',
      },
    }, {
      path: '/about',
      name: 'About',
      component: About,
      props: {
        icon: 'fa-user-circle-o',
        title: 'About Me',
      },
    }, {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio,
      props: {
        icon: 'fa-briefcase',
        title: 'My Latest Work',
      },
    }, {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      props: {
        icon: 'fa-comment-o',
        title: 'Contact Me',
      },
    }, {
      path: '/thank-you',
      name: 'ThankYou',
      component: ThankYou,
      props: {
        'hidden-from-nav': true,
        title: 'Thank You!',
      },
    }, {
      path: '*',
      name: '404',
      component: FourOhFour,
      props: {
        'hidden-from-nav': true,
        title: 'Page Not Found',
      },
    },
  ],
  linkExactActiveClass: 'active',
});
