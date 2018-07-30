<template>
  <div id="main" class="app" :class="appClass">
    <div :class="pageClass" @click="onpageclick">
      <home></home>
      <app-footer></app-footer>
    </div>
    <app-navigation :open="isNavOpen"></app-navigation>
    <app-navigation-button></app-navigation-button>
    <app-loading v-if="loading"></app-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppNavigation from '@/components/AppNavigation';
import AppNavigationButton from '@/components/AppNavigationButton';
import AppFooter from '@/components/AppFooter';
import Home from '@/views/Home';
import AppLoading from '@/components/AppLoading';

export default {
  name:       'app',
  components: {
    AppNavigation,
    AppNavigationButton,
    AppFooter,
    Home,
    AppLoading,
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('nav', {
      isNavOpen: 'open',
    }),
    appClass() {
      return {
        'nav-open': this.isNavOpen,
        loading:    this.loading,
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
    ...mapActions('nav', {
      closeNav: 'close',
    }),
    ...mapActions(['setLoading']),
    onpageclick() {
      if (this.isNavOpen) {
        this.closeNav();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setLoading(false);
    });
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
