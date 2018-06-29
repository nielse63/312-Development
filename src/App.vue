<template>
  <div id="main" class="app" :class="appClass">
    <app-navigation :open="isNavOpen"></app-navigation>
    <app-navigation-button @toggle="ontoggle" :isNavOpen="isNavOpen"></app-navigation-button>
    <div class="page" @click="onclick">
      <transition>
        <router-view :class="{ open: isNavOpen, 'page-content': true }"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import AppNavigationButton from '@/components/AppNavigationButton';

export default {
  name:       'app',
  components: {
    AppNavigation,
    AppNavigationButton,
  },
  data() {
    return {
      isNavOpen: false,
      navClass:  'app-navigation',
    };
  },
  computed: {
    appClass() {
      const object = {
        'nav-open': this.isNavOpen,
      };
      const routeClassName = `view-${this.$route.name}`;
      object[routeClassName] = true;
      return object;
    },
  },
  methods: {
    ontoggle(isNavOpen) {
      this.isNavOpen = isNavOpen;
    },
    onclick() {
      if (this.isNavOpen) {
        this.isNavOpen = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/global";
</style>

<style lang="scss" scoped>
@import "assets/styles/lib/vars";

.app {
  background-color: $color-black;
}

.view {
  &-home,
  &-about-me,
  &-contact-me {
    background-color: #000;
  }

  &-experience {
    background-color: #191919;
  }

  &-portfolio {
    background-color: #59c384;
  }
}

.page {
  perspective: 100vw;

  &-content {
    min-height: 100vh;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
    transition-property: opacity, transform;
    will-change: opacity, transform;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);

    &.open {
      transform: translate3d(0, 5vh, -5vw);
      opacity: 0.35;
    }
  }
}
</style>
