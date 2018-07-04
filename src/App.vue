<template>
  <div id="main" class="app" :class="appClass">
    <div :class="pageClass" @click="onpageclick">
      <router-view class="page-content"></router-view>
      <app-footer></app-footer>
    </div>
    <app-navigation :open="isNavOpen"></app-navigation>
    <app-navigation-button></app-navigation-button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AppNavigation from '@/components/AppNavigation';
import AppNavigationButton from '@/components/AppNavigationButton';
import AppFooter from '@/components/AppFooter';

export default {
  name:       'app',
  components: {
    AppNavigation,
    AppNavigationButton,
    AppFooter,
  },
  data() {
    return {
      isBelowCanvas: false,
      headerBottom:  0,
    };
  },
  computed: {
    ...mapState('nav', {
      isNavOpen: 'open',
    }),
    ...mapState('canvas', {
      isCanvasRunning: 'running',
    }),
    appClass() {
      const object = {
        'nav-open': this.isNavOpen,
      };
      const routeClassName = `view-${this.$route.name}`;
      object[routeClassName] = true;
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
    ...mapMutations('canvas', {
      pauseCanvas:  'pause',
      resumeCanvas: 'start',
    }),
    ...mapActions('nav', {
      closeNav:   'close',
      darkenNav:  'darken',
      lightenNav: 'lighten',
    }),
    onpageclick() {
      if (this.isNavOpen) {
        this.closeNav();
      }
    },
    onscroll() {
      if (this.isCanvasRunning && window.scrollY > this.headerBottom) {
        this.pauseCanvas();
        this.darkenNav();
      } else if (!this.isCanvasRunning && window.scrollY <= this.headerBottom) {
        this.resumeCanvas();
        this.lightenNav();
      }
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.onscroll, false);
  },
  mounted() {
    this.headerBottom = document.querySelector('.canvas').offsetHeight;
    this.onscroll();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onscroll, false);
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
