<template>
  <div id="main" class="app" :class="appClass">
    <div :class="pageClass" @click="onpageclick">
      <home></home>
      <app-footer></app-footer>
    </div>
    <app-navigation :open="isNavOpen" @navclose="onnavclose"></app-navigation>
    <app-navigation-button :open="isNavOpen" @navtoggle="onnavtoggle"></app-navigation-button>
  </div>
</template>

<script>
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
  data() {
    return {
      isNavOpen: false,
    };
  },
  computed: {
    appClass() {
      return {
        'nav-open': this.isNavOpen,
      };
    },
    pageClass() {
      return {
        open: this.isNavOpen,
        page: true,
      };
    },
  },
  methods: {
    onpageclick() {
      this.onnavclose();
    },
    onnavtoggle() {
      this.isNavOpen = !this.isNavOpen;
    },
    onnavclose() {
      this.isNavOpen = false;
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
  background-color: $color-white;
  overflow-x: hidden;
}

.page {
  contain: content;

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

.loading {
  .page,
  .app-navigation-button {
    filter: blur(7.5px);
  }
}
</style>
