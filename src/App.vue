<template>
  <div id="main" class="app" :class="appClass">
    <div :class="pageClass" @click="onpageclick">
      <home></home>
      <app-footer></app-footer>
    </div>
    <app-navigation :open="isNavOpen"></app-navigation>
    <app-navigation-button></app-navigation-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppNavigation from '@/components/AppNavigation';
import AppNavigationButton from '@/components/AppNavigationButton';
import AppFooter from '@/components/AppFooter';
import Home from '@/views/Home';

export default {
  name:       'app',
  components: {
    AppNavigation,
    AppNavigationButton,
    AppFooter,
    Home,
  },
  computed: {
    ...mapState('nav', {
      isNavOpen: 'open',
    }),
    appClass() {
      const object = {
        'nav-open': this.isNavOpen,
      };
      return object;
    },
    pageClass() {
      return {
        open: this.isNavOpen,
        page: true,
      };
    },
  },
  methods: {
    ...mapActions('nav', {
      closeNav: 'close',
    }),
    onpageclick() {
      if (this.isNavOpen) {
        this.closeNav();
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

.page {
  &-content {
    min-height: 100vh;
  }

  > * {
    transition: 0.25s opacity ease-in-out;
    will-change: opacity;
  }

  &.open {
    > * {
      opacity: 0.35;
    }
  }
}
</style>
