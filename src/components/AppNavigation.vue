<template>
  <nav class="app-navigation" :class="{ open }">
    <ul>
      <app-navigation-item
        v-for="(item, index) in items"
        :key="index"
        :path="item.path"
        :text="item.text"
        :color="item.color"
      ></app-navigation-item>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import AppNavigationItem from '@/components/AppNavigationItem';

export default {
  name:       'AppNavigation',
  components: {
    AppNavigationItem,
  },
  data() {
    return {
      items: [
        {
          path:  '/',
          text:  'Home',
          color: 'pink',
        },
        {
          path:  '/about-me',
          text:  'About Me',
          color: 'green',
        },
        {
          path:  '/experience',
          text:  'Experience',
          color: 'purple',
        },
        {
          path:  '/portfolio',
          text:  'Portfolio',
          color: 'blue',
        },
        {
          path: '/contact-me',
          text: 'Contact Me',
        },
      ],
    };
  },
  computed: {
    ...mapState('nav', ['open']),
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.app-navigation {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 1rem;
  background-color: $color-white;
  z-index: 1;
  width: 25vw;
  max-width: 350px;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 2px;
  transform: translate(100%, 0);
  transition: 0.25s transform ease-in-out;
}

.open {
  transform: translate(0, 0);
}
</style>
