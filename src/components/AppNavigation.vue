<template>
  <nav class="app-navigation" :class="{ open }">
    <ul>
      <app-navigation-item
        v-for="(item, index) in items"
        :key="index"
        :path="item.path"
        :text="item.text"
        :color="item.color"
        @navclose="$emit('navclose')"
      ></app-navigation-item>
    </ul>
  </nav>
</template>

<script>
import AppNavigationItem from '@/components/AppNavigationItem';

export default {
  name:       'AppNavigation',
  components: {
    AppNavigationItem,
  },
  props: {
    open: {
      type:    Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          path: '/',
          text: 'Home',
        },
        {
          path:  '/#about-me',
          text:  'About Me',
          color: 'purple',
        },
        {
          path:  '/#experience',
          text:  'Experience',
          color: 'blue',
        },
        {
          path:  '/#portfolio',
          text:  'Portfolio',
          color: 'pink',
        },
        {
          path:  '/#skills-and-tools',
          text:  'Skills & Tools',
          color: 'orange',
        },
        {
          path:  '/#contact-me',
          text:  'Contact Me',
          color: 'green',
        },
      ],
    };
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
  width: 90vw;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  transform: translate(100%, 0);
  transition: 0.25s transform ease-in-out;
  white-space: nowrap;
  min-width: 450px;
  overflow: auto;

  @media(min-width: $mobile-width) {
    width: 25vw;
    max-width: 450px;
  }
}

.open {
  transform: translate(0, 0);
}
</style>
